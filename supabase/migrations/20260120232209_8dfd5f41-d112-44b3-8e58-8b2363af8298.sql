-- Drop admin-only policies on groups
DROP POLICY IF EXISTS "Admin only insert on groups" ON public.groups;
DROP POLICY IF EXISTS "Admin only update on groups" ON public.groups;
DROP POLICY IF EXISTS "Admin only delete on groups" ON public.groups;

-- Drop admin-only policies on matches
DROP POLICY IF EXISTS "Admin only insert on matches" ON public.matches;
DROP POLICY IF EXISTS "Admin only update on matches" ON public.matches;
DROP POLICY IF EXISTS "Admin only delete on matches" ON public.matches;

-- Drop admin-only policies on sports
DROP POLICY IF EXISTS "Admin only insert on sports" ON public.sports;
DROP POLICY IF EXISTS "Admin only update on sports" ON public.sports;
DROP POLICY IF EXISTS "Admin only delete on sports" ON public.sports;

-- Drop admin-only policies on teams
DROP POLICY IF EXISTS "Admin only insert on teams" ON public.teams;
DROP POLICY IF EXISTS "Admin only update on teams" ON public.teams;
DROP POLICY IF EXISTS "Admin only delete on teams" ON public.teams;

-- Drop admin-only policies on settings
DROP POLICY IF EXISTS "Admin only insert on settings" ON public.settings;
DROP POLICY IF EXISTS "Admin only update on settings" ON public.settings;

-- Drop existing public policies (in case they exist)
DROP POLICY IF EXISTS "Allow public read on groups" ON public.groups;
DROP POLICY IF EXISTS "Allow public read on matches" ON public.matches;
DROP POLICY IF EXISTS "Allow public read on sports" ON public.sports;
DROP POLICY IF EXISTS "Allow public read on teams" ON public.teams;
DROP POLICY IF EXISTS "Allow public read on settings" ON public.settings;

-- Disable RLS on all tables (makes them fully public)
ALTER TABLE public.groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages DISABLE ROW LEVEL SECURITY;