import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Parse User-Agent to detect device type
function getDeviceType(userAgent: string): string {
  if (!userAgent) return "unknown";
  
  const ua = userAgent.toLowerCase();
  
  // Check for tablets first (before mobile, as some tablets include "mobile" in UA)
  if (
    ua.includes("ipad") ||
    ua.includes("tablet") ||
    (ua.includes("android") && !ua.includes("mobile")) ||
    ua.includes("kindle") ||
    ua.includes("silk")
  ) {
    return "tablet";
  }
  
  // Check for mobile devices
  if (
    ua.includes("mobile") ||
    ua.includes("iphone") ||
    ua.includes("ipod") ||
    ua.includes("android") ||
    ua.includes("blackberry") ||
    ua.includes("windows phone") ||
    ua.includes("opera mini") ||
    ua.includes("iemobile")
  ) {
    return "mobile";
  }
  
  // Default to desktop
  return "desktop";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source, filePath, isReturningUser, resourceTitle } = await req.json();

    if (!email || !source || !filePath) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format and length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || email.length > 255 || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Strict file path validation: folder/filename.pdf, max 200 chars
    const pathRegex = /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\.pdf$/;
    if (typeof filePath !== "string" || filePath.length > 200 || !pathRegex.test(filePath)) {
      return new Response(
        JSON.stringify({ error: "Invalid file path" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate source and resourceTitle lengths
    if (typeof source !== "string" || source.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid source" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (resourceTitle != null && (typeof resourceTitle !== "string" || resourceTitle.length > 200)) {
      return new Response(
        JSON.stringify({ error: "Invalid resourceTitle" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const normalizedEmail = email.toLowerCase().trim();
    const consentText = "I agree to receive free resources and educational updates from What About Weight. I can unsubscribe at any time.";
    
    // Get device type from User-Agent header
    const userAgent = req.headers.get("user-agent") || "";
    const deviceType = getDeviceType(userAgent);

    if (isReturningUser) {
      // Get current download count and increment
      const { data: leadData } = await supabase
        .from("leads")
        .select("download_count")
        .eq("email", normalizedEmail)
        .single();

      await supabase
        .from("leads")
        .update({
          download_count: (leadData?.download_count || 0) + 1,
          last_download_at: new Date().toISOString(),
          device_type: deviceType,
          resource_title: resourceTitle || null,
        })
        .eq("email", normalizedEmail);
    } else {
      // New user - upsert with consent data
      const { error: upsertError } = await supabase
        .from("leads")
        .upsert(
          {
            email: normalizedEmail,
            source,
            consent_given: true,
            consent_timestamp: new Date().toISOString(),
            consent_text: consentText,
            download_count: 1,
            last_download_at: new Date().toISOString(),
            device_type: deviceType,
            resource_title: resourceTitle || null,
          },
          { onConflict: "email" }
        );

      if (upsertError) {
        console.error("Lead upsert error:", upsertError);
        return new Response(
          JSON.stringify({ error: "Failed to save lead information" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Generate signed URL for download
    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from("free-resources")
      .createSignedUrl(filePath, 300); // 5 minutes

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error("Signed URL error:", signedUrlError);
      return new Response(
        JSON.stringify({ error: "Failed to generate download URL" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ signedUrl: signedUrlData.signedUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
