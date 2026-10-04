-- 007_rls.sql
-- Enable Row Level Security (RLS) and create security policies

-- 1. Enable RLS
alter table public.profiles enable row level security;
alter table public.prescriptions enable row level security;
alter table public.medicines enable row level security;
alter table public.medication_schedules enable row level security;
alter table public.reminders enable row level security;
alter table public.medicine_alternatives enable row level security;
alter table public.healthcare_facilities enable row level security;

-- 2. Profiles policies
drop policy if exists "profiles_user_all" on public.profiles;
create policy "profiles_user_all"
  on public.profiles for all
  using (id = auth.uid())
  with check (id = auth.uid());

-- 3. Prescriptions policies (Only owner can read/write)
drop policy if exists "prescriptions_user_all" on public.prescriptions;
create policy "prescriptions_user_all"
  on public.prescriptions for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- 4. Medicines policies (Only owner can read/write)
drop policy if exists "medicines_user_all" on public.medicines;
create policy "medicines_user_all"
  on public.medicines for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- 5. Medication schedules policies (Only owner can read/write)
drop policy if exists "schedules_user_all" on public.medication_schedules;
create policy "schedules_user_all"
  on public.medication_schedules for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- 6. Reminders policies (Only owner can read/write)
drop policy if exists "reminders_user_all" on public.reminders;
create policy "reminders_user_all"
  on public.reminders for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- 7. Medicine alternatives policies (Readable only if user owns the parent medicine)
drop policy if exists "alternatives_user_all" on public.medicine_alternatives;
create policy "alternatives_user_all"
  on public.medicine_alternatives for all
  using (
    exists (
      select 1 from public.medicines m
      where m.id = medicine_alternatives.medicine_id
        and m.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.medicines m
      where m.id = medicine_alternatives.medicine_id
        and m.user_id = auth.uid()
    )
  );

-- 8. Healthcare facilities policies (Public read-only for verified facilities)
drop policy if exists "healthcare_facilities_public_read" on public.healthcare_facilities;
create policy "healthcare_facilities_public_read"
  on public.healthcare_facilities for select
  using (true);

-- 9. Private Storage Bucket Setup for 'prescriptions'
insert into storage.buckets (id, name, public)
values ('prescriptions', 'prescriptions', false)
on conflict (id) do update set public = false;

-- Storage RLS: Users can only upload and read files in their own folder: {user_id}/*
drop policy if exists "prescriptions_storage_select" on storage.objects;
create policy "prescriptions_storage_select"
  on storage.objects for select
  using (
    bucket_id = 'prescriptions'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "prescriptions_storage_insert" on storage.objects;
create policy "prescriptions_storage_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'prescriptions'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "prescriptions_storage_delete" on storage.objects;
create policy "prescriptions_storage_delete"
  on storage.objects for delete
  using (
    bucket_id = 'prescriptions'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
