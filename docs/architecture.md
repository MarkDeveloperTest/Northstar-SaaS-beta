# Northstar Architecture

Northstar is structured as a beta-ready SaaS frontend with clear backend seams.

## Product Surfaces

- `/` marketing website with pricing, proof, FAQ, contact, and public CTAs.
- `/auth/login`, `/auth/signup`, `/auth/forgot-password` authentication surfaces.
- `/app` authenticated workspace prototype focused on the Link Hub studio, CRM signal, analytics, AI suggestions, and tasks.
- `/p/alex` public profile page showing the published Link Hub experience.

## Frontend Architecture

- `src/app`: Next.js App Router routes and server component entry points.
- `src/components/ui`: reusable primitives with consistent radius, focus, and typography.
- `src/components/marketing`: landing page composition.
- `src/components/auth`: auth forms, OAuth entry points, validation, and demo fallback.
- `src/components/app`: workspace shell, profile studio, CRM, analytics, AI, tasks, and settings modules.
- `src/data`: realistic seed data used by the prototype and future tests.
- `src/lib/supabase`: SSR-safe Supabase client helpers and Next 16 `proxy.ts` session refresh.

## Backend Boundary

Supabase is wired as the intended production backend. The current build runs in demo mode when public Supabase env vars are absent. The schema blueprint in `supabase/schema.sql` defines tenant-owned entities, RLS policies, and explicit role grants for the current Supabase Data API defaults.
