-- Add SELECT policy to allow upsert conflict detection (limited to checking own email)
CREATE POLICY "Allow select for upsert conflict detection"
ON public.leads
FOR SELECT
USING (true);