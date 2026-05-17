import {
  JUKES_DINER_SYSTEM_LINKS,
  MODULE_REGISTRY,
  getClientBySlug,
  getClientModuleStatuses,
} from '../../../lib/control-plane.mjs';

const shellStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at 8% 0%, rgba(139,211,255,0.20), transparent 30%), radial-gradient(circle at 85% 10%, rgba(167,139,250,0.16), transparent 28%), #070812',
  color: '#eef2ff',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  padding: '48px 24px 64px',
};

const cardStyle = {
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 22,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035))',
  boxShadow: '0 24px 70px rgba(0,0,0,0.30)',
  padding: 22,
};

const eyebrowStyle = {
  color: '#8bd3ff',
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  margin: '0 0 10px',
};

const mutedTextStyle = {
  color: '#aeb8d4',
  lineHeight: 1.65,
};

const linkStyle = {
  color: '#eef2ff',
  textDecoration: 'none',
};

function badgeStyle(type) {
  const isLive = type === 'live';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    border: `1px solid ${isLive ? 'rgba(52,211,153,0.45)' : 'rgba(251,191,36,0.48)'}`,
    background: isLive ? 'rgba(52,211,153,0.10)' : 'rgba(251,191,36,0.10)',
    color: isLive ? '#7dd3a8' : '#f8d36f',
    borderRadius: 999,
    padding: '6px 10px',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  };
}

export const metadata = {
  title: "Juke's Diner Client OS | Bel Air Intel",
  description: "Barebones Bel Air Intel control-plane page for Juke's Diner modules and operating links.",
};

export default function JukesDinerClientPage() {
  const client = getClientBySlug('jukes-diner');
  const moduleStatuses = getClientModuleStatuses(client.slug);

  return (
    <main style={shellStyle}>
      <section style={{ maxWidth: 1180, margin: '0 auto' }}>
        <nav style={{ marginBottom: 28 }}>
          <a href="/" style={{ ...linkStyle, color: '#8bd3ff', fontSize: 14 }}>
            ← Bel Air Intel home
          </a>
        </nav>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.45fr) minmax(280px, 0.75fr)',
            gap: 22,
            alignItems: 'stretch',
          }}
        >
          <div style={{ ...cardStyle, padding: 30 }}>
            <p style={eyebrowStyle}>Client OS / First tenant</p>
            <h1 style={{ fontSize: 'clamp(42px, 7vw, 84px)', lineHeight: 0.92, margin: '0 0 18px' }}>
              Juke&apos;s Diner control plane.
            </h1>
            <p style={{ ...mutedTextStyle, fontSize: 19, maxWidth: 780 }}>
              Barebones operating surface for the Juke&apos;s Diner proof client: keep existing systems linked,
              expose static/shared status feeds, and preserve approval boundaries before live adapters or risky automation.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
              <span style={badgeStyle('live')}>Live links</span>
              <span style={badgeStyle('placeholder')}>Placeholder links</span>
              <span style={{ ...badgeStyle('placeholder'), borderColor: 'rgba(139,211,255,0.35)', color: '#8bd3ff' }}>
                No money movement
              </span>
            </div>
          </div>

          <aside style={cardStyle}>
            <p style={eyebrowStyle}>Client record</p>
            <h2 style={{ margin: '0 0 12px', fontSize: 30 }}>{client.name}</h2>
            <dl style={{ display: 'grid', gap: 12, margin: 0 }}>
              <div>
                <dt style={{ color: '#7f8aa3', fontSize: 12 }}>Status</dt>
                <dd style={{ margin: 0 }}>{client.status.replaceAll('_', ' ')}</dd>
              </div>
              <div>
                <dt style={{ color: '#7f8aa3', fontSize: 12 }}>Domain</dt>
                <dd style={{ margin: 0 }}>{client.domain}</dd>
              </div>
              <div>
                <dt style={{ color: '#7f8aa3', fontSize: 12 }}>Internal app repo</dt>
                <dd style={{ margin: 0 }}>{client.repo}</dd>
              </div>
              <div>
                <dt style={{ color: '#7f8aa3', fontSize: 12 }}>Public site repo</dt>
                <dd style={{ margin: 0 }}>{client.publicSiteRepo}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section style={{ marginTop: 34 }}>
          <p style={eyebrowStyle}>System links</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))', gap: 16 }}>
            {JUKES_DINER_SYSTEM_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                style={{ ...cardStyle, ...linkStyle, display: 'grid', gap: 12 }}
                aria-label={`${link.label} ${link.linkType === 'live' ? 'live link' : 'placeholder link'}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                  <p style={{ ...eyebrowStyle, color: '#a78bfa', margin: 0 }}>{link.ownerBrand}</p>
                  <span style={badgeStyle(link.linkType)}>{link.linkType}</span>
                </div>
                <h2 style={{ margin: 0, fontSize: 23 }}>{link.label}</h2>
                <p style={{ ...mutedTextStyle, margin: 0 }}>{link.note}</p>
                {link.approvalRequired ? (
                  <p style={{ color: '#f8d36f', margin: 0, fontSize: 13 }}>Approval-gated before changes or external action.</p>
                ) : null}
              </a>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 34 }}>
          <p style={eyebrowStyle}>Module cards</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {moduleStatuses.map((module) => {
              const moduleRecord = MODULE_REGISTRY.find((entry) => entry.key === module.moduleKey);

              return (
                <article key={module.moduleKey} style={cardStyle}>
                  <p style={{ ...eyebrowStyle, color: '#8bd3ff' }}>{module.ownerBrand}</p>
                  <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>{module.moduleName}</h2>
                  <p style={{ ...mutedTextStyle, marginTop: 0 }}>{moduleRecord.description}</p>
                  <p style={{ color: '#7f8aa3', fontSize: 13 }}>Source: {module.sourceSystem}</p>
                  <span style={badgeStyle('placeholder')}>{module.health.replaceAll('_', ' ')}</span>
                </article>
              );
            })}
          </div>
        </section>

        <section style={{ ...cardStyle, marginTop: 34 }}>
          <p style={eyebrowStyle}>Approval boundaries</p>
          <h2 style={{ marginTop: 0 }}>Operational visibility only until John approves escalation.</h2>
          <ul style={{ ...mutedTextStyle, marginBottom: 0, paddingLeft: 20 }}>
            <li>Placeholder links are intentionally static and safe until account ownership, credentials, and deployment routes are confirmed.</li>
            <li>No public publishing, DNS/domain change, production deploy, customer commitment, or money movement from this page.</li>
            <li>Finance/Cain Union remains read-only/static first: no transfers, payouts, refunds, account links, or onboarding emails.</li>
          </ul>
        </section>
      </section>
    </main>
  );
}
