create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  preferred_language text default 'en',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists prescriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_path text not null,
  file_type text,
  original_file_name text,
  status text not null default 'uploaded'
    check (status in ('uploaded','processing','completed','failed','needs_verification')),
  doctor_name text,
  prescription_date date,
  diagnosis text,
  summary text,
  raw_ocr_text text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists medicines (
  id uuid primary key default gen_random_uuid(),
  prescription_id uuid not null references prescriptions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  normalized_name text,
  strength text,
  dosage text,
  frequency text,
  duration text,
  timing text,
  route text,
  instructions text,
  ingredients jsonb default '[]'::jsonb,
  uses text,
  side_effects jsonb default '[]'::jsonb,
  warnings jsonb default '[]'::jsonb,
  confidence_score numeric,
  needs_verification boolean default true,
  created_at timestamptz default now()
);

create table if not exists medication_schedules (
  id uuid primary key default gen_random_uuid(),
  medicine_id uuid not null references medicines(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  start_date date not null,
  end_date date,
  schedule_type text not null,
  times jsonb default '[]'::jsonb,
  food_instruction text,
  enabled boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  medicine_id uuid not null references medicines(id) on delete cascade,
  schedule_id uuid references medication_schedules(id) on delete set null,
  title text not null,
  reminder_time time not null,
  days jsonb default '[]'::jsonb,
  start_date date,
  end_date date,
  enabled boolean default true,
  notification_type text default 'browser',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists medicine_alternatives (
  id uuid primary key default gen_random_uuid(),
  medicine_id uuid not null references medicines(id) on delete cascade,
  alternative_name text not null,
  active_ingredient text,
  strength text,
  dosage_form text,
  manufacturer text,
  source text,
  confidence_score numeric,
  verification_required boolean default true,
  created_at timestamptz default now()
);

create table if not exists healthcare_facilities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  facility_type text,
  ownership_type text,
  address text,
  latitude double precision,
  longitude double precision,
  phone text,
  source text,
  external_place_id text,
  created_at timestamptz default now()
);
