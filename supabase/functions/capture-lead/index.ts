import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source, filePath, isReturningUser } = await req.json();

    if (!email || !source || !filePath) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const normalizedEmail = email.toLowerCase().trim();
    const consentText = "I agree to receive free resources and educational updates from What About Weight. I can unsubscribe at any time.";

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
