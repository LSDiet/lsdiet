-- Lock down the private "free-resources" bucket.
-- Files are only ever read/written by edge functions using the service role
-- (which bypasses RLS). Clients receive short-lived signed URLs from the
-- get-download-url edge function. Block all direct client access explicitly.

-- SELECT: no direct downloads from anon/authenticated clients.
CREATE POLICY "free-resources: deny client select"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id <> 'free-resources');

-- INSERT: no client uploads.
CREATE POLICY "free-resources: deny client insert"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id <> 'free-resources');

-- UPDATE: no client modifications.
CREATE POLICY "free-resources: deny client update"
ON storage.objects
FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'free-resources')
WITH CHECK (bucket_id <> 'free-resources');

-- DELETE: no client deletes.
CREATE POLICY "free-resources: deny client delete"
ON storage.objects
FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'free-resources');