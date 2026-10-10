-- Initial schema for Dadapeer K Portfolio

-- Create tables
CREATE TABLE public.admin_roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'admin',
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text,
  description text,
  problem_statement text,
  features jsonb,
  technologies jsonb,
  github_url text,
  demo_url text,
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text,
  content text,
  seo_description text,
  is_published boolean DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.milky_mirchi_reels (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  url text NOT NULL,
  location text,
  category text,
  caption_hook text,
  caption_body text,
  caption_location text,
  caption_keywords text,
  caption_hashtags text,
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.alona_label_designs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  theme text,
  description text,
  colors text,
  price numeric,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milky_mirchi_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alona_label_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create Policies (Admin only for write, public for read where published)
CREATE POLICY "Public profiles are viewable by everyone." ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public blogs are viewable by everyone." ON public.blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Public reels are viewable by everyone." ON public.milky_mirchi_reels FOR SELECT USING (is_published = true);
CREATE POLICY "Public designs are viewable by everyone." ON public.alona_label_designs FOR SELECT USING (is_published = true);
CREATE POLICY "Settings are viewable by everyone." ON public.site_settings FOR SELECT USING (true);

-- Anyone can insert a contact message
CREATE POLICY "Anyone can insert contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Assuming auth.uid() checks for admin would be implemented here for mutations
