-- 005_reminders.sql
-- Create reminders table for medicine alarm schedules
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  medicine_id uuid not null references public.medicines(id) on delete cascade,
  schedule_id uuid references public.medication_schedules(id) on delete set null,
  title text not null,
  reminder_time time not null,
  days jsonb default '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]'::jsonb,
  start_date date,
  end_date date,
  enabled boolean default true,
  notification_type text default 'browser'
    check (notification_type in ('browser','push','email','whatsapp')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_reminders_user_id on public.reminders(user_id);
create index if not exists idx_reminders_medicine_id on public.reminders(medicine_id);
