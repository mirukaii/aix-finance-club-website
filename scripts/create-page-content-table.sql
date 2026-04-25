-- Create page_content table for static page management
create table if not exists public.page_content (
  id uuid default gen_random_uuid() primary key,
  page_slug text unique not null,
  content jsonb not null,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Enable RLS
alter table page_content enable row level security;

-- RLS Policies
create policy "Public read page_content" on page_content for select using (true);
create policy "Service role write page_content" on page_content for all using (auth.role() = 'service_role');
