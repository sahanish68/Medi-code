-- 003_medicines.sql
-- Create medicines table for extracted medicines from prescriptions
create table if not exists public.medicines (
  id uuid primary key default gen_random_uuid(),
  prescription_id uuid not null references public.prescriptions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
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
  confidence_score numeric default 0.85,
  needs_verification boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_medicines_prescription_id on public.medicines(prescription_id);
create index if not exists idx_medicines_user_id on public.medicines(user_id);
