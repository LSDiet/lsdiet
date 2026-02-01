-- Create a restrictive SELECT policy that prevents any public/anon access
-- Edge functions using service_role key will bypass RLS and still work
CREATE POLICY "No public read access to leads"
ON public.leads
FOR SELECT
TO anon, authenticated
USING (false);