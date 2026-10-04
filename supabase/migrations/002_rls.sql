alter table profiles enable row level security;
alter table prescriptions enable row level security;
alter table medicines enable row level security;
alter table medication_schedules enable row level security;
alter table reminders enable row level security;
alter table medicine_alternatives enable row level security;
alter table healthcare_facilities enable row level security;

create policy "profiles own rows"
on profiles for all
using (id = auth.uid())
with check (id = auth.uid());

create policy "prescriptions own rows"
on prescriptions for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "medicines own rows"
on medicines for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "schedules own rows"
on medication_schedules for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "reminders own rows"
on reminders for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "alternatives through owned medicine"
on medicine_alternatives for all
using (
  exists (
    select 1 from medicines m
    where m.id = medicine_alternatives.medicine_id
      and m.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from medicines m
    where m.id = medicine_alternatives.medicine_id
      and m.user_id = auth.uid()
  )
);

create policy "healthcare public read"
on healthcare_facilities for select
using (true);
