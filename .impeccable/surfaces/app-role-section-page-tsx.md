---
version: 1
slug: "app-role-section-page-tsx"
primary_target: "app/[role]/[section]/page.tsx"
related_targets: ["app/page.tsx","components/PlayTestApp.tsx"]
---

# PlayTest ID platform surfaces

Scope and mode: public landing page (Persuade) plus responsive Developer, Tester, and Admin workspaces (Operate).

Audience and task: developers configure Android test cycles and monitor cohorts; testers complete eligible daily missions and submit evidence; admins manage exceptions, payments, reports, rewards, and audit. The PRD's listed product KPIs are the success measures; production targets and business values remain configurable and undecided.

Content and constraints: Indonesian product terminology; all displayed operational values and accounts are explicitly labeled demo. No real authentication, upload, payment, payout, or backend behavior is in this frontend scope. Protect role boundaries in the UI and expose loading, empty, error, blocked, and success states. Desktop-first developer/admin, mobile-first tester.

Chosen direction: PlayTest ID Purple/Pink SaaS Dashboard, from the user-provided 2026 Design System. White sidebar and topbar sit over Gray 50; white cards, soft shadows, rounded corners, Inter typography, and a semantic purple/pink/blue/orange/green palette keep the application friendly and data-forward.

## Direction contract

THESIS: A reliable, modern, simple, transparent platform makes Android test cycles clear across Developer, Tester, and Admin workspaces.

OWN-WORLD: Use white surfaces, Gray 50 page backgrounds, Gray 200 borders, Purple 600 for primary actions and active states, pink for reward emphasis, blue for information, and orange for attention. Use semantic status colors with text/icons, 8px control corners, 12px cards, and quiet shadows. Inter is the requested face, with system sans fallback where it is unavailable.

STORY: Developers prepare tests and monitor feedback; testers discover applications and complete missions; admins resolve platform exceptions. Use demo-local interactions only and identify illustrative figures.

FIRST VIEWPORT: The public landing hero fills at least 100svh and introduces the product with one primary workspace action and a coherent interface preview. Workspace pages retain the white role sidebar, 64px topbar, clear page title, relevant action, and prioritized dashboard data. On mobile, collapse navigation and preserve the Tester task and bottom navigation.

FORM: Follow the supplied design-system tokens and role-specific layout guidance. Keep responsive behavior aligned to the 640px, 768px, and 1024px breakpoints, with an optional compact-phone refinement.

FINISH: preserve accessibility, avoid presenting demo values as business facts, and document deviations from the supplied system.
