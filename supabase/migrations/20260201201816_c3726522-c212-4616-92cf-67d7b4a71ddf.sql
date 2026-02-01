-- Remove overly permissive RLS policies
DROP POLICY IF EXISTS "Allow select for upsert conflict detection" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous update for returning users" ON public.leads;

-- Keep insert policy but make it restrictive (only needed fields, no SELECT back)
DROP POLICY IF EXISTS "Allow anonymous insert for lead capture" ON public.leads;

-- Recreate insert-only policy (edge function with service role bypasses this anyway)
CREATE POLICY "Allow anonymous insert for lead capture" 
ON public.leads 
FOR INSERT 
TO anon
WITH CHECK (true);