# KaushalVerse

**Bridging Skills. Connecting Academia & Industry.**

A frontend-only prototype built for the Smart India Hackathon problem statement:
*"Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement."*

This is a **conceptual demonstration** — there is no backend, database, or real authentication.
All data is realistic local mock data held in frontend state.

---

## Tech Stack

React · Vite · JavaScript (JSX) · Tailwind CSS · shadcn/ui-style components ·
React Router DOM · Axios (unused placeholder) · TanStack React Query · React Hook Form + Zod ·
Recharts · Lucide React · Sonner · Framer Motion

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

No environment variables or backend are required to run this project.

## Demo Mode — 3 minute evaluator walkthrough

From the landing page, click **Login**, then use one of the three **Continue as ... (Demo)**
buttons — no real credentials needed:

1. **Student Demo** → Dashboard → My Skills → Skill Gap Analysis → Learning Roadmap →
   Opportunities → open an Opportunity → Apply → My Applications
2. **Company Demo** → Dashboard → Candidate Matching → Shortlist a candidate
3. **Institution Admin Demo** → Overview → Placement Analytics

You can also register a new account from `/register` and pick an account type
(Student / Company / Institution) — this also logs you into the matching demo dashboard.

## Project Structure

```
src/
├── components/        # common, ui (shadcn-style), dashboard, opportunities,
│                       skills, applications, charts, layout
├── data/               # mock data modules (students, companies, opportunities,
│                         applications, skills, roadmap, analytics)
├── layouts/            # PublicLayout, StudentLayout, CompanyLayout, AdminLayout
├── pages/              # public, auth, student, company, admin pages
├── routes/             # AppRoutes.jsx, ProtectedRoute.jsx
├── context/            # AuthContext (mock role-based auth)
├── services/           # api.js — placeholder axios client, NOT connected to any backend
├── lib/                # cn() utility
├── App.jsx
└── main.jsx
```

## Notes

- All statistics, testimonials, companies, students and opportunities are **sample/demo data**.
- The government/SIH context section is a conceptual reference only — this is **not**
  an official, approved, or endorsed Government of India product.
- `src/services/api.js` is scaffolded for future backend integration but makes no real
  network calls in this prototype.
- Protected routes use a mock role check (`student` / `company` / `admin`) stored in
  `localStorage` via `AuthContext` — this is not real authentication.

## Remaining Frontend-Only TODOs

- Wire `services/api.js` to a real backend when available.
- Replace mock authentication with real auth (JWT/OAuth).
- Persist skill/profile edits beyond the current session (currently in-memory / localStorage only).
- Add real resume file parsing (currently a simulated upload + static analysis result).
- Add pagination for large tables (students/companies/applications) if datasets grow.
- Add dynamic `import()` code-splitting per route to reduce the initial JS bundle size.
