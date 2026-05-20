-- Replace permissive bucket-scoped policies with RESTRICTIVE policies.
-- Restrictive policies combine with AND and don't grant access on their own,
-- so they only block the free-resources bucket without implying access to
-- any other bucket.

DROP POLICY IF EXISTS "free-resources: deny client select" ON storage.objects;
DROP POLICY IF EXISTS "free-resources: deny client insert" ON storage.objects;
DROP POLICY IF EXISTS "free-resources: deny client update" ON storage.objects;
DROP POLICY IF EXISTS "free-resources: deny client delete" ON storage.objects;

CREATE POLICY "free-resources: block client select"
ON storage.objects
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (bucket_id <> 'free-resources');

CREATE POLICY "free-resources: block client insert"
ON storage.objects
AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id <> 'free-resources');

CREATE POLICY "free-resources: block client update"
ON storage.objects
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'free-resources')
WITH CHECK (bucket_id <> 'free-resources');

CREATE POLICY "free-resources: block client delete"
ON storage.objects
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'free-resources');