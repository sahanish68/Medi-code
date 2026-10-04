-- 004_schedules.sql
-- Create medication_schedules table for generated and user-edited schedules
create table if not exists public.medication_schedules (
  id uuid primary key default gen_random_uuid(),
  medicine_id uuid not null references public.medicines(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  start_date date not null,
  end_date date,
  schedule_type text not null,
  times jsonb default '[]'::jsonb,
  food_instruction text,
  enabled boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_schedules_medicine_id on public.medication_schedules(medicine_id);
create index if not exists idx_schedules_user_id on public.medication_schedules(user_id);
