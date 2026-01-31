-- Create leads table for email capture with CASL compliance
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  download_count INTEGER NOT NULL DEFAULT 1,
  last_download_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  consent_given BOOLEAN NOT NULL,
  consent_timestamp TIMESTAMPTZ NOT NULL,
  consent_text TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert for lead capture (no auth required)
CREATE POLICY "Allow anonymous insert for lead capture"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anonymous update for returning users (increment download count)
CREATE POLICY "Allow anonymous update for returning users"
ON public.leads
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- Create private storage bucket for PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('free-resources', 'free-resources', false);