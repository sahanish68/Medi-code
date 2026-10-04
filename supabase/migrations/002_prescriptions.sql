-- 002_prescriptions.sql
-- Create prescriptions table for uploaded prescriptions and medical reports
create table if not exists public.prescriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
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

create index if not exists idx_prescriptions_user_id on public.prescriptions(user_id);
create index if not exists idx_prescriptions_status on public.prescriptions(status);
