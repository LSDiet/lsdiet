CREATE POLICY "No public update on leads"
ON public.leads
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No public delete on leads"
ON public.leads
FOR DELETE
TO anon, authenticated
USING (false);