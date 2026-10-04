-- 006_alternatives.sql
-- Create medicine_alternatives table and healthcare_facilities table
create table if not exists public.medicine_alternatives (
  id uuid primary key default gen_random_uuid(),
  medicine_id uuid not null references public.medicines(id) on delete cascade,
  alternative_name text not null,
  active_ingredient text,
  strength text,
  dosage_form text,
  manufacturer text,
  source text,
  confidence_score numeric default 0.9,
  verification_required boolean default true,
  created_at timestamptz default now()
);

create index if not exists idx_alternatives_medicine_id on public.medicine_alternatives(medicine_id);

create table if not exists public.healthcare_facilities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  facility_type text not null check (facility_type in ('pharmacy', 'hospital', 'clinic', 'medical_centre')),
  ownership_type text not null default 'unknown' check (ownership_type in ('government', 'private', 'unknown')),
  address text,
  latitude double precision,
  longitude double precision,
  phone text,
  source text,
  external_place_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_healthcare_facilities_coords on public.healthcare_facilities(latitude, longitude);
create index if not exists idx_healthcare_facilities_ownership on public.healthcare_facilities(ownership_type);
