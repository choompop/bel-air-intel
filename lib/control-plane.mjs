const APPROVAL_BOUNDARIES = {
  default: [
    'No external publishing without John approval.',
    'No DNS, Vercel domain, or production deploy changes without review.',
    'No secrets stored in repo or exposed to interns/operators.',
  ],
  finance: [
    'Finance visibility is read-only until explicitly approved.',
    'No transfers, payouts, refunds, or account-link actions without John approval.',
    'No tax, accounting, investment, payroll, or compliance claims without professional review.',
  ],
  agents: [
    'Agents may draft tasks, specs, and pull requests only inside assigned scopes.',
    'Agents cannot send customer messages, publish externally, or move money without approval.',
  ],
};

export const MODULE_REGISTRY = [
  {
    key: 'operations',
    name: 'Operations',
    ownerBrand: 'Bel Air Intel',
    status: 'static_registry_ready',
    sourceSystem: 'Jukes dashboard, Kanban, Slack/Flo, SOP docs',
    health: 'manual_status_feed',
    description: 'Tasks, calendar, staff handoffs, SOPs, training, and operating checklists.',
    approvalBoundaries: APPROVAL_BOUNDARIES.default,
  },
  {
    key: 'bookings',
    name: 'Bookings',
    ownerBrand: 'Bel Air Intel',
    status: 'static_registry_ready',
    sourceSystem: 'Jukes booking pipeline, Google Calendar, lead forms',
    health: 'manual_status_feed',
    description: 'Event leads, catering requests, menu selection, calendar holds, and booking status.',
    approvalBoundaries: [
      ...APPROVAL_BOUNDARIES.default,
      'No customer confirmations, deposits, refunds, or contract commitments without approval.',
    ],
  },
  {
    key: 'marketing',
    name: 'Marketing',
    ownerBrand: 'Mainframe Studio',
    status: 'static_registry_ready',
    sourceSystem: 'Content calendar, Metricool later, Slack/Flo handoff logs',
    health: 'manual_status_feed',
    description: 'Photos, social drafts, campaign calendar, SEO backlog, and approval queue.',
    approvalBoundaries: [
      ...APPROVAL_BOUNDARIES.default,
      'Draft-only social/content workflow until publishing approval is granted.',
    ],
  },
  {
    key: 'drive-asset-library',
    name: 'Drive / Asset Library',
    ownerBrand: 'Bel Air Intel',
    status: 'static_registry_ready',
    sourceSystem: 'Google Drive folder map and approved asset indexes',
    health: 'manual_status_feed',
    description: 'Menus, photos, contracts, event docs, brand assets, and shared operating files.',
    approvalBoundaries: [
      ...APPROVAL_BOUNDARIES.default,
      'Use folder IDs and labels only in repo; keep private file contents and credentials out of code.',
    ],
  },
  {
    key: 'finance-cain-union',
    name: 'Finance / Cain Union',
    ownerBrand: 'Cain Union',
    status: 'static_registry_ready',
    sourceSystem: 'Manual finance checklist first; Stripe/bank exports later as read-only feeds',
    health: 'manual_status_feed',
    description: 'Profit centers, P&L rhythm, expenses, approval thresholds, and spending controls.',
    approvalBoundaries: APPROVAL_BOUNDARIES.finance,
  },
  {
    key: 'agent-brain',
    name: 'Agent Brain',
    ownerBrand: 'Bel Air Intel',
    status: 'static_registry_ready',
    sourceSystem: 'Hermes/Kanban agents, profile scopes, operator handoffs',
    health: 'manual_status_feed',
    description: "Scoped agents for coding, QA, librarian, social/Flo, finance review, and operator support.",
    approvalBoundaries: APPROVAL_BOUNDARIES.agents,
  },
  {
    key: 'public-site-mainframe-studio',
    name: 'Public Site / Mainframe Studio',
    ownerBrand: 'Mainframe Studio',
    status: 'static_registry_ready',
    sourceSystem: 'Jukes public site, Mainframe Studio site, Vercel-oriented domains',
    health: 'manual_status_feed',
    description: 'Public growth layer, intake pages, case study, SEO pages, and website handoffs.',
    approvalBoundaries: [
      ...APPROVAL_BOUNDARIES.default,
      'No public website publishing or DNS/domain changes without owner approval.',
    ],
  },
];

export const CLIENT_REGISTRY = [
  {
    id: 'client_jukes_diner',
    slug: 'jukes-diner',
    name: "Juke's Diner",
    status: 'beta_internal_proof_client',
    parentControlPlane: 'bel-air-intel',
    ownerUserId: 'john',
    primaryContact: 'John Kyburz',
    domain: 'jukesdiner.com',
    repo: 'choompop/jukes',
    publicSiteRepo: 'choompop/jukes-diner-website',
    enabledModuleKeys: MODULE_REGISTRY.map((module) => module.key),
    operatingNotes: [
      'First client/tenant/proof case for Bel Air Intel.',
      'Keep existing systems linked instead of rewriting stable tools.',
      'Use static/shared status feeds until live adapters are explicitly approved.',
    ],
  },
];

export const JUKES_DINER_SYSTEM_LINKS = [
  {
    key: 'jukes-dashboard',
    label: "Juke's Dashboard",
    href: 'https://dashboard.jukesdiner.com',
    linkType: 'placeholder',
    ownerBrand: 'Bel Air Intel',
    moduleKey: 'operations',
    note: 'Target internal dashboard route; keep as placeholder until deployment/domain ownership is confirmed.',
    approvalRequired: false,
  },
  {
    key: 'booking-pipeline',
    label: 'Booking Pipeline',
    href: '#booking-pipeline',
    linkType: 'placeholder',
    ownerBrand: 'Bel Air Intel',
    moduleKey: 'bookings',
    note: 'Static handoff for event leads, calendar holds, and catering request review.',
    approvalRequired: true,
  },
  {
    key: 'drive-assets',
    label: 'Drive Assets',
    href: '#drive-assets',
    linkType: 'placeholder',
    ownerBrand: 'Bel Air Intel',
    moduleKey: 'drive-asset-library',
    note: 'Use approved folder labels only here; do not hardcode private Drive IDs or credentials.',
    approvalRequired: false,
  },
  {
    key: 'calendar',
    label: 'Calendar',
    href: '#calendar',
    linkType: 'placeholder',
    ownerBrand: 'Bel Air Intel',
    moduleKey: 'bookings',
    note: 'Placeholder for read-only event/calendar visibility before Google Workspace wiring.',
    approvalRequired: false,
  },
  {
    key: 'slack-flo',
    label: 'Slack / Flo',
    href: '#slack-flo',
    linkType: 'placeholder',
    ownerBrand: 'Bel Air Intel',
    moduleKey: 'operations',
    note: 'Placeholder for operator communication and Flo-style handoff feed.',
    approvalRequired: false,
  },
  {
    key: 'public-website',
    label: "Juke's Public Website",
    href: 'https://jukesdiner.com',
    linkType: 'live',
    ownerBrand: "Juke's Diner",
    moduleKey: 'public-site-mainframe-studio',
    note: 'Public domain reference only; publishing and DNS changes remain approval-gated.',
    approvalRequired: true,
  },
  {
    key: 'cain-union-finance',
    label: 'Cain Union Finance Module',
    href: 'https://cainunion.com',
    linkType: 'live',
    ownerBrand: 'Cain Union',
    moduleKey: 'finance-cain-union',
    note: 'Finance control surface is read-only/static first; no money movement from this page.',
    approvalRequired: true,
  },
  {
    key: 'mainframe-studio-growth',
    label: 'Mainframe Studio Growth Module',
    href: 'https://mainframestud.io',
    linkType: 'live',
    ownerBrand: 'Mainframe Studio',
    moduleKey: 'public-site-mainframe-studio',
    note: 'Growth/public site style reference and future content module entry point.',
    approvalRequired: true,
  },
  {
    key: 'kanban-board',
    label: 'Kanban Board',
    href: '#kanban-board',
    linkType: 'placeholder',
    ownerBrand: 'Bel Air Intel',
    moduleKey: 'agent-brain',
    note: 'Internal Hermes Kanban board reference; do not expose board DB paths or credentials.',
    approvalRequired: false,
  },
];

export const ROLE_ACCESS_LEVELS = [
  {
    key: 'intern_research',
    label: 'Intern Research',
    accessLevel: 'draft_read_assigned',
    allowedModules: ['operations', 'marketing', 'drive-asset-library', 'public-site-mainframe-studio'],
    canPublishExternally: false,
    canAccessSecrets: false,
    canMoveMoney: false,
    notes: 'Can read assigned docs and create draft research/tasks only.',
  },
  {
    key: 'intern_content',
    label: 'Intern Content',
    accessLevel: 'draft_content_assigned',
    allowedModules: ['marketing', 'drive-asset-library', 'public-site-mainframe-studio'],
    canPublishExternally: false,
    canAccessSecrets: false,
    canMoveMoney: false,
    notes: 'Can draft copy, SEO, and content plans; no posting without approval.',
  },
  {
    key: 'intern_ops',
    label: 'Intern Ops',
    accessLevel: 'draft_ops_assigned',
    allowedModules: ['operations', 'bookings', 'drive-asset-library'],
    canPublishExternally: false,
    canAccessSecrets: false,
    canMoveMoney: false,
    notes: 'Can update internal SOP drafts, checklists, and triage queues.',
  },
  {
    key: 'intern_engineering',
    label: 'Intern Engineering',
    accessLevel: 'pull_request_only',
    allowedModules: ['operations', 'bookings', 'marketing', 'agent-brain', 'public-site-mainframe-studio'],
    canPublishExternally: false,
    canAccessSecrets: false,
    canMoveMoney: false,
    notes: 'Can open pull requests; no direct production deploys or secret access.',
  },
  {
    key: 'operator',
    label: 'Operator',
    accessLevel: 'operate_assigned',
    allowedModules: ['operations', 'bookings', 'marketing', 'drive-asset-library', 'agent-brain'],
    canPublishExternally: false,
    canAccessSecrets: false,
    canMoveMoney: false,
    notes: 'Can move internal tasks and prepare handoffs within assigned modules.',
  },
  {
    key: 'manager',
    label: 'Manager',
    accessLevel: 'approve_internal',
    allowedModules: MODULE_REGISTRY.map((module) => module.key),
    canPublishExternally: false,
    externalPublishingApproval: 'john_owner_required',
    canAccessSecrets: false,
    canMoveMoney: false,
    notes:
      'Can approve internal content/task promotion and view client dashboards; external publishing still escalates to John/owner approval.',
  },
  {
    key: 'finance_operator',
    label: 'Finance Operator',
    accessLevel: 'finance_read_review',
    allowedModules: ['finance-cain-union'],
    canPublishExternally: false,
    canAccessSecrets: false,
    canMoveMoney: false,
    notes: 'Can view finance module and draft review items; no money movement without explicit approval.',
  },
  {
    key: 'owner',
    label: 'Owner',
    accessLevel: 'owner_approval',
    allowedModules: MODULE_REGISTRY.map((module) => module.key),
    canPublishExternally: true,
    canAccessSecrets: true,
    canMoveMoney: true,
    notes: 'Owner approval boundary for publishing, DNS/domain, production, and money movement actions.',
  },
];

export function getClientBySlug(slug) {
  return CLIENT_REGISTRY.find((client) => client.slug === slug) ?? null;
}

export function getClientModuleStatuses(slug) {
  const client = getClientBySlug(slug);

  if (!client) {
    return [];
  }

  return client.enabledModuleKeys.map((moduleKey) => {
    const module = MODULE_REGISTRY.find((entry) => entry.key === moduleKey);

    return {
      clientSlug: client.slug,
      moduleKey,
      moduleName: module.name,
      ownerBrand: module.ownerBrand,
      status: module.status,
      sourceSystem: module.sourceSystem,
      health: module.health,
      approvalBoundaries: module.approvalBoundaries,
    };
  });
}
