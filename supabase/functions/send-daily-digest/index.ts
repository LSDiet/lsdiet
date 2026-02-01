import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    // Get downloads from the last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const { data: leads, error: fetchError } = await supabase
      .from("leads")
      .select("email, source, resource_title, device_type, last_download_at, created_at")
      .gte("last_download_at", yesterday.toISOString())
      .order("last_download_at", { ascending: false });

    if (fetchError) {
      console.error("Error fetching leads:", fetchError);
      throw new Error("Failed to fetch leads data");
    }

    const totalDownloads = leads?.length || 0;
    
    // Group downloads by book title
    const downloadsByBook: Record<string, number> = {};
    const downloadsByDevice: Record<string, number> = { mobile: 0, tablet: 0, desktop: 0, unknown: 0 };
    
    leads?.forEach((lead) => {
      const title = lead.resource_title || lead.source || "Unknown";
      downloadsByBook[title] = (downloadsByBook[title] || 0) + 1;
      
      const device = lead.device_type || "unknown";
      downloadsByDevice[device] = (downloadsByDevice[device] || 0) + 1;
    });

    // Generate CSV content
    const csvHeaders = ["Email", "Book Title", "Source", "Device Type", "Downloaded At", "First Signup"];
    const csvRows = leads?.map((lead) => [
      lead.email,
      lead.resource_title || "",
      lead.source,
      lead.device_type || "unknown",
      lead.last_download_at,
      lead.created_at,
    ]) || [];
    
    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Convert CSV to base64 for attachment
    const csvBase64 = btoa(unescape(encodeURIComponent(csvContent)));

    // Build summary HTML
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const bookSummaryHtml = Object.entries(downloadsByBook)
      .map(([title, count]) => `<li><strong>${title}</strong>: ${count} download${count !== 1 ? "s" : ""}</li>`)
      .join("");

    const deviceSummaryHtml = `
      <ul>
        <li>📱 Mobile: ${downloadsByDevice.mobile}</li>
        <li>📲 Tablet: ${downloadsByDevice.tablet}</li>
        <li>💻 Desktop: ${downloadsByDevice.desktop}</li>
      </ul>
    `;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .stat-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .big-number { font-size: 48px; font-weight: bold; color: #667eea; }
          h2 { color: #374151; margin-top: 25px; }
          ul { padding-left: 20px; }
          li { margin: 8px 0; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📊 Daily Download Digest</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${today}</p>
          </div>
          <div class="content">
            <div class="stat-box" style="text-align: center;">
              <div class="big-number">${totalDownloads}</div>
              <div style="color: #6b7280;">New Download${totalDownloads !== 1 ? "s" : ""} Today</div>
            </div>
            
            ${totalDownloads > 0 ? `
              <h2>📚 Downloads by Book</h2>
              <div class="stat-box">
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${bookSummaryHtml}
                </ul>
              </div>
              
              <h2>📱 Downloads by Device</h2>
              <div class="stat-box">
                ${deviceSummaryHtml}
              </div>
              
              <p style="background: #dbeafe; padding: 15px; border-radius: 8px; color: #1e40af;">
                📎 <strong>Full data attached</strong> — See the CSV file for complete details including all email addresses.
              </p>
            ` : `
              <p style="text-align: center; color: #6b7280; padding: 20px;">
                No downloads recorded in the last 24 hours.
              </p>
            `}
            
            <div class="footer">
              <p>This is an automated daily digest from What About Weight.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email with CSV attachment
    const emailResponse = await resend.emails.send({
      from: "What About Weight <notifications@lsdiet.com>",
      to: ["oscar@lsdiet.com"],
      subject: `📊 Daily Download Digest: ${totalDownloads} download${totalDownloads !== 1 ? "s" : ""} on ${today}`,
      html: emailHtml,
      attachments: totalDownloads > 0 ? [
        {
          filename: `downloads-${new Date().toISOString().split("T")[0]}.csv`,
          content: csvBase64,
        },
      ] : [],
    });

    console.log("Daily digest email sent:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        totalDownloads,
        emailResponse 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending daily digest:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
