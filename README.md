# MediDecode — Modular Next.js Architecture

This project reorganizes the MediDecode specification into a scalable feature-based architecture.

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Supabase Auth / PostgreSQL / Storage
- Zod validation
- Vercel-ready API routes
- Google OAuth integration
- Server-side AI/OCR integration points
- Server-side Google Maps/Places integration point

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Architecture

```text
src/
├── app/
│   ├── api/
│   │   ├── healthcare/nearby/
│   │   └── prescriptions/
│   │       ├── process/
│   │       └── upload/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   └── ui/
│
├── constants/
├── lib/
│   ├── ai/
│   ├── supabase/
│   └── utils/
│
├── types/
│
└── features/
    ├── app/
    ├── authentication/
    ├── dashboard/
    ├── healthcare-locator/
    ├── medicine-alternatives/
    ├── medication-schedule/
    ├── medicines/
    ├── prescriptions/
    ├── reminders/
    └── settings/
```

## Dependency direction

```text
UI
 ↓
Feature Components
 ↓
Feature Hooks / Actions
 ↓
Feature Services
 ↓
Infrastructure
 ↓
Supabase / AI / Maps
```

Components should not directly perform database queries.

## Production TODO

1. Run Supabase migrations.
2. Configure Google OAuth redirect URLs.
3. Implement private prescription Storage upload.
4. Implement OCR/Vision processing on the server.
5. Validate AI output with Zod.
6. Add a verified medicine knowledge source.
7. Implement verified medicine alternatives.
8. Connect Google Places API server-side.
9. Add persistent Supabase schedule/reminder CRUD.
10. Add background processing for expensive AI work.
11. Add tests for parsing, scheduling and authorization.
12. Deploy to Vercel.

## Medical safety

The app must never guess unclear handwriting or invent dosage, duration, diagnosis, alternatives or interactions.

MediDecode is informational assistance and does not replace advice from a qualified doctor or pharmacist.
