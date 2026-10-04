insert into storage.buckets (id, name, public)
values ('prescriptions', 'prescriptions', false)
on conflict (id) do nothing;

create policy "users can read own prescription files"
on storage.objects for select
using (
  bucket_id = 'prescriptions'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "users can upload own prescription files"
on storage.objects for insert
with check (
  bucket_id = 'prescriptions'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "users can delete own prescription files"
on storage.objects for delete
using (
  bucket_id = 'prescriptions'
  and auth.uid()::text = (storage.foldername(name))[1]
);
