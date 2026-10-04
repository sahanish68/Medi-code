-- seed.sql
-- Initial seed data for Indian healthcare facilities (Government & Private) and generic medicine alternatives

insert into public.healthcare_facilities (id, name, facility_type, ownership_type, address, latitude, longitude, phone, source)
values
  -- Government Facilities
  (
    'a1000000-0000-0000-0000-000000000001',
    'Pradhan Mantri Bhartiya Janaushadhi Kendra (PMBJK)',
    'pharmacy',
    'government',
    'Shop No. 12, Civil Hospital Campus, Near Gate 2, New Delhi 110001',
    28.6139,
    77.2090,
    '+91 11 2338 2000',
    'PMBI Portal'
  ),
  (
    'a1000000-0000-0000-0000-000000000002',
    'All India Institute of Medical Sciences (AIIMS) Pharmacy',
    'pharmacy',
    'government',
    'Ansari Nagar, Sri Aurobindo Marg, New Delhi 110029',
    28.5672,
    77.2100,
    '+91 11 2658 8500',
    'AIIMS Directory'
  ),
  (
    'a1000000-0000-0000-0000-000000000003',
    'District Civil Hospital & 24x7 Emergency',
    'hospital',
    'government',
    'Station Road, Near Collectorate Office, Sector 4',
    28.5355,
    77.3910,
    '+91 120 250 1234',
    'Govt Health Dept'
  ),
  (
    'a1000000-0000-0000-0000-000000000004',
    'Primary Health Centre (PHC) & Maternity Care',
    'clinic',
    'government',
    'Main Village Road, Block B, Rural Health Mission Centre',
    28.4595,
    77.0266,
    '+91 124 232 5500',
    'NRHM'
  ),
  (
    'a1000000-0000-0000-0000-000000000005',
    'Jan Aushadhi Medical Store - Kendra #4521',
    'pharmacy',
    'government',
    'Opposite Bus Stand, Market Yard, Gandhi Chowk',
    19.0760,
    72.8777,
    '+91 22 2415 8899',
    'PMBI Portal'
  ),
  -- Private Facilities
  (
    'a1000000-0000-0000-0000-000000000006',
    'Apollo Pharmacy 24/7',
    'pharmacy',
    'private',
    'Plot 14, Commercial Complex, Sector 18',
    28.5700,
    77.3200,
    '+91 120 456 7890',
    'Apollo Health'
  ),
  (
    'a1000000-0000-0000-0000-000000000007',
    'MedPlus Pharmacy & Diagnostics',
    'pharmacy',
    'private',
    'Shop 5, Ground Floor, Central Avenue',
    28.5800,
    77.3100,
    '+91 120 411 2233',
    'MedPlus'
  ),
  (
    'a1000000-0000-0000-0000-000000000008',
    'Fortis Multi-Speciality Clinic',
    'clinic',
    'private',
    'B-Block Medical Enclave, Institutional Area',
    28.5300,
    77.3800,
    '+91 120 600 0000',
    'Fortis Network'
  ),
  (
    'a1000000-0000-0000-0000-000000000009',
    'Max Super Speciality Hospital',
    'hospital',
    'private',
    'W-3, Sector 1, Health Boulevard',
    28.5600,
    77.3400,
    '+91 120 662 9999',
    'Max Healthcare'
  ),
  (
    'a1000000-0000-0000-0000-000000000010',
    'Sanjeevani Day & Night Chemist',
    'pharmacy',
    'private',
    'Shop 2, Railway Road Market',
    28.6000,
    77.2200,
    '+91 98110 54321',
    'Local Chemist Assoc'
  )
on conflict (id) do nothing;
