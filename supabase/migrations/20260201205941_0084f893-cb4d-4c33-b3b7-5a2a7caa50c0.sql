-- Add device_type column to track mobile/tablet/desktop
ALTER TABLE public.leads 
ADD COLUMN device_type text;

-- Add resource_title column to store the human-readable book title
ALTER TABLE public.leads 
ADD COLUMN resource_title text;

-- Add a comment for documentation
COMMENT ON COLUMN public.leads.device_type IS 'Device type: mobile, tablet, or desktop';
COMMENT ON COLUMN public.leads.resource_title IS 'Human-readable title of the downloaded resource';