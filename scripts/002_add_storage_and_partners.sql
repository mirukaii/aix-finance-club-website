-- Add ticket_url column to events
ALTER TABLE events ADD COLUMN IF NOT EXISTS ticket_url text;

-- Add type column to publications (carousel or article)
ALTER TABLE publications ADD COLUMN IF NOT EXISTS type text DEFAULT 'carousel';

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  description text,
  website_url text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on partners
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Public read policy for partners
CREATE POLICY "Public read partners" ON partners FOR SELECT USING (true);

-- Service role policies for partners
CREATE POLICY "Service role insert partners" ON partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role update partners" ON partners FOR UPDATE USING (true);
CREATE POLICY "Service role delete partners" ON partners FOR DELETE USING (true);

-- Create storage bucket for media (if not exists, handled by Supabase)
-- Note: Storage bucket creation is done via the API route
