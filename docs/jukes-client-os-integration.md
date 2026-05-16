# Bel Air Intel ↔ Juke's Diner Client OS Integration

## Strategic framing

Bel Air Intel should become the parent operating dashboard: the place where John, internal operators, interns, and specialist agents can see every client/venture as a tenant with clear modules, permissions, and operating loops.

Juke's Diner becomes the first proof client. It should not be treated as a one-off dashboard forever. It should be structured as `client: jukes-diner` inside the Bel Air Intel operating system.

Mainframe Studio and Cain Union are modules that plug into the client OS:

- **Bel Air Intel** — onboarding, architecture, agent brain, permissions, central dashboard, client workspace.
- **Mainframe Studio** — public site, intake, content, SEO, bookings, growth operations.
- **Cain Union** — finance layer, profit centers, expense controls, P&L rhythm, dashboards, incentive structures.

## Recommended architecture

### 1. Bel Air Intel as the parent control plane

Bel Air Intel should own:

- client registry
- user/access registry
- agent registry
- module registry
- task/Kanban routing
- operating memory
- intern onboarding/training access
- global dashboard shell
- cross-client reporting

Suggested top-level entities:

```txt
clients
  id
  name
  slug
  status
  owner_user_id
  primary_contact
  modules_enabled
  created_at

client_modules
  id
  client_id
  module_key
  module_owner_brand
  status
  source_url
  health_status

profit_centers
  id
  client_id
  name
  slug
  entity_or_operator
  bank_or_stripe_ref
  status

users
  id
  name
  email
  role
  access_level

client_user_access
  client_id
  user_id
  role
  allowed_modules
  permission_level

agent_profiles
  id
  client_id
  agent_name
  profile_key
  allowed_actions
  approval_required_for
```

### 2. Juke's as the first client tenant

Create a client record:

```txt
client: Juke's Diner
slug: jukes-diner
status: beta / internal proof client
```

Enable modules:

- **Operations** — tasks, calendar, staff handoffs, training, SOPs.
- **Bookings** — event leads, catering, menus, calendar holds, booking pipeline.
- **Marketing** — photos, social posts, content calendar, Metricool later.
- **Drive / Asset Library** — menus, photos, contracts, event docs, brand assets.
- **Finance / Cain Union** — profit centers, P&L, expenses, spending controls.
- **Agent Brain** — Flo/Juke's social agent, librarian, coding agent, finance agent, QA agent.

### 3. Cain Union module for Juke's profit centers

Juke's should have multiple profit centers under Cain Union, not one blended mess.

Initial placeholders:

```txt
profit_center: Events / Catering
profit_center: Food truck / trailer operations
profit_center: Brick & mortar
profit_center: Merch / packaged / other
```

Each profit center should eventually track:

- gross sales
- direct labor
- food cost / COGS
- Stripe / payment fees
- allocated overhead
- equipment purchases
- owner draws / contractor payments
- net profit
- profit-share pool
- approval thresholds

Guardrail: Cain Union can show financial visibility and structure internal dashboards, but no external accounting/tax/investment claims without professional/compliance review.

### 4. Mainframe Studio module for Juke's growth layer

Mainframe Studio should manage:

- public site/reskin
- booking intake forms
- catering/event landing pages
- SEO pages
- content asset library usage
- social/content calendar
- conversion tracking
- client-facing proof case study

The public story becomes:

> Bel Air Intel installed the operating system behind Juke's. Mainframe Studio powered the public growth layer. Cain Union powered the financial control layer.

## Data-feed pattern

Do not make the Bel Air Intel dashboard scrape random UI pages from Juke's. Feed structured data into a shared registry/API.

Recommended flow:

```txt
Juke's source systems
  ↓
Juke's dashboard adapters / APIs
  ↓
Bel Air Intel client registry + module registry
  ↓
Bel Air Intel dashboard views
  ↓
Agents / interns / operators with scoped permissions
```

Data sources by module:

- Bookings: Juke's dashboard booking tables/API, Google Calendar, lead forms.
- Drive: Google Drive folder IDs, approved asset indexes, content library sheets.
- Marketing: content calendar, Metricool later, Slack/Flo handoff logs.
- Finance: Stripe read-only, bank/accounting exports later, manual expense approvals first.
- Operations: Kanban board, Slack/Flo, SOP/training docs.

## Access model for interns

Interns should get access through Bel Air Intel, not direct owner-level access to everything.

Suggested roles:

- `intern_research` — can read client docs and create draft tasks; no external publishing.
- `intern_content` — can draft copy/social/SEO/content plans; no posting without approval.
- `intern_ops` — can update internal SOPs/checklists and triage tasks; no money movement.
- `intern_engineering` — can open PRs against repos; no direct production deploy without review.
- `manager` — can approve content, promote tasks, and view client dashboards.
- `finance_operator` — can view Cain Union module; no money movement unless explicitly approved.

Default intern permissions:

- Can read assigned client module docs.
- Can create draft Kanban tasks.
- Can draft website/content/ops changes.
- Can submit PRs.
- Cannot publish externally.
- Cannot change DNS, Vercel domains, Stripe, bank, payroll, or live money flows.
- Cannot access secrets.

## Repo strategy

Keep Juke's production code separate, but make Bel Air Intel the control plane.

Recommended repos:

- `bel-air-intel` — parent dashboard/control plane app.
- `bel-air-intel-website` — public marketing website.
- `jukes` — Juke's internal app/dashboard/client implementation.
- `jukes-diner-website` — public Juke's website, if separate from internal app.
- `cain-union` — finance module/product surface.
- `mainframe-studio` — growth/site/client-facing offer surface.

Short term: Bel Air Intel links to Juke's modules and ingests summaries/status.

Medium term: Bel Air Intel owns a shared module registry and Juke's dashboard posts module health/status/data to it.

Long term: Juke's dashboard becomes one tenant/module inside the Bel Air Intel app shell, while the public Juke's site remains its own public property.

## Build phases

### Phase 0 — Name the architecture

Output:

- client registry model
- Juke's tenant record
- module list
- intern roles
- approval boundaries

### Phase 1 — Link, don't merge

Bel Air Intel dashboard should show a Juke's client page with cards linking to:

- Juke's dashboard
- Juke's Drive asset library
- booking pipeline
- calendar
- public website
- Slack/Flo handoff
- Cain Union finance module
- Mainframe Studio growth module
- relevant Kanban board

This creates immediate operational clarity without risky rewrites.

### Phase 2 — Shared status feed

Add a small JSON/API status feed from Juke's dashboard that Bel Air Intel can read:

```json
{
  "client": "jukes-diner",
  "modules": {
    "bookings": { "status": "active", "open_items": 0, "needs_attention": [] },
    "marketing": { "status": "active", "open_items": 0, "needs_attention": [] },
    "finance": { "status": "setup", "open_items": 0, "needs_attention": [] }
  }
}
```

### Phase 3 — Cain Union financial model

Create a finance data model for Juke's profit centers.

Start read-only/manual:

- manually entered profit center targets
- expense approval thresholds
- Stripe read-only visibility
- event P&L template
- monthly finance review page

Only later add bank/accounting integrations.

### Phase 4 — Intern operating workspace

Give interns access to Bel Air Intel as a training/control surface.

Create:

- intern onboarding page
- role-based modules
- task queue by module
- PR/review workflow
- approval checklist
- client context library

### Phase 5 — Productize

Turn Juke's into a case study and repeatable template:

- client onboarding checklist
- foundation setup checklist
- dashboard module template
- Drive folder template
- Slack/Flo workflow template
- Cain Union finance template
- Mainframe Studio site/content template

## Immediate Kanban task graph

Create these first-wave cards on `jukes-dashboard` / Bel Air Intel workstream:

1. **Spec: Bel Air Intel parent dashboard client registry**
   - Assignee: `jukes-coding-agent` or dashboard/frontend agent
   - Output: data model, routes, pages, permissions, status-feed contract.

2. **Implement: Bel Air Intel Juke's client page v1**
   - Assignee: `jukes-coding-agent`
   - Output: `/clients/jukes-diner` page with module cards and links.

3. **Spec: Juke's status feed for Bel Air Intel**
   - Assignee: `jukes-coding-agent`
   - Output: JSON/API contract and first static feed.

4. **Spec: Cain Union Juke's profit center model**
   - Assignee: `jukes-finance-agent`
   - Output: profit center list, fields, approval thresholds, event P&L template.

5. **Spec: Intern access + approval boundaries**
   - Assignee: `jukes-librarian` or ops/PM profile
   - Output: roles, permissions, onboarding checklist, what interns can/cannot touch.

6. **QA: tenant isolation and permission review**
   - Assignee: `jukes-qa-agent`
   - Output: review of access boundaries before interns get real access.

## John's decision needed

Before implementation, decide the canonical parent app repo:

- Option A: build parent dashboard in `bel-air-intel`.
- Option B: use `bel-air-intel-website` and add authenticated dashboard routes there.

Recommendation: use `bel-air-intel` as the parent dashboard/control plane and keep `bel-air-intel-website` as the public marketing site.
