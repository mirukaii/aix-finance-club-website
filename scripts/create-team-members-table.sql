-- Create team_members table for team management
create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  role text not null,
  photo_url text,
  linkedin_url text,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table team_members enable row level security;

-- RLS Policies
create policy "Public read team_members" on team_members for select using (true);
create policy "Service role write team_members" on team_members for all using (auth.role() = 'service_role');
