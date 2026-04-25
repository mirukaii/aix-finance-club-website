-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ NOT NULL,
  location TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'Conference',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Publications table
CREATE TABLE IF NOT EXISTS publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT DEFAULT 'Analyse',
  type TEXT NOT NULL DEFAULT 'article' CHECK (type IN ('article', 'carousel')),
  cover_image TEXT,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  read_time TEXT,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Disable RLS for these tables (admin-only access via server-side with password protection)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads for public-facing pages
CREATE POLICY "Allow public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read publications" ON publications FOR SELECT USING (true);

-- Allow service role full access (used by admin via server actions)
CREATE POLICY "Allow service role insert events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role update events" ON events FOR UPDATE USING (true);
CREATE POLICY "Allow service role delete events" ON events FOR DELETE USING (true);

CREATE POLICY "Allow service role insert publications" ON publications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role update publications" ON publications FOR UPDATE USING (true);
CREATE POLICY "Allow service role delete publications" ON publications FOR DELETE USING (true);
