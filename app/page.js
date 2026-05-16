import {
  CLIENT_REGISTRY,
  MODULE_REGISTRY,
  ROLE_ACCESS_LEVELS,
  getClientModuleStatuses,
} from '../lib/control-plane.mjs';

const cardStyle = {
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 18,
  background: 'rgba(255,255,255,0.045)',
  padding: 20,
  boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
};

const eyebrowStyle = {
  color: '#8bd3ff',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  margin: '0 0 8px',
};

export default function Home() {
  const [client] = CLIENT_REGISTRY;
  const moduleStatuses = getClientModuleStatuses(client.slug);
  const internRoles = ROLE_ACCESS_LEVELS.filter((role) => role.key.startsWith('intern_'));

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(56,139,253,0.18), transparent 34%), #080912',
        color: '#eef2ff',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '56px 24px',
      }}
    >
      <section style={{ maxWidth: 1120, margin: '0 auto' }}>
        <p style={eyebrowStyle}>Bel Air Intel Control Plane</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(260px, 0.8fr)', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(40px, 7vw, 82px)', lineHeight: 0.95, margin: '0 0 20px' }}>
              Parent dashboard for client operating systems.
            </h1>
            <p style={{ color: '#b7c0d8', fontSize: 19, lineHeight: 1.65, maxWidth: 760 }}>
              Static-first registry for Bel Air Intel as the parent onboarding, permissions,
              module, and agent control plane. Juke&apos;s Diner is registered as the first client tenant.
            </p>
          </div>
          <div style={cardStyle}>
            <p style={eyebrowStyle}>First client</p>
            <h2 style={{ margin: '0 0 8px', fontSize: 30 }}>{client.name}</h2>
            <p style={{ margin: '0 0 14px', color: '#b7c0d8' }}>{client.status.replaceAll('_', ' ')}</p>
            <dl style={{ display: 'grid', gap: 10, margin: 0 }}>
              <div>
                <dt style={{ color: '#7f8aa3', fontSize: 12 }}>Domain</dt>
                <dd style={{ margin: 0 }}>{client.domain}</dd>
              </div>
              <div>
                <dt style={{ color: '#7f8aa3', fontSize: 12 }}>App repo</dt>
                <dd style={{ margin: 0 }}>{client.repo}</dd>
              </div>
              <div>
                <dt style={{ color: '#7f8aa3', fontSize: 12 }}>Public site repo</dt>
                <dd style={{ margin: 0 }}>{client.publicSiteRepo}</dd>
              </div>
            </dl>
          </div>
        </div>

        <section style={{ marginTop: 44 }}>
          <p style={eyebrowStyle}>Module registry</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {moduleStatuses.map((module) => (
              <article key={module.moduleKey} style={cardStyle}>
                <p style={{ ...eyebrowStyle, color: '#a78bfa' }}>{module.ownerBrand}</p>
                <h3 style={{ margin: '0 0 10px', fontSize: 22 }}>{module.moduleName}</h3>
                <p style={{ color: '#b7c0d8', lineHeight: 1.55 }}>{MODULE_REGISTRY.find((entry) => entry.key === module.moduleKey).description}</p>
                <p style={{ color: '#7f8aa3', fontSize: 13 }}>Source: {module.sourceSystem}</p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: 8,
                    border: '1px solid rgba(139,211,255,0.35)',
                    borderRadius: 999,
                    padding: '6px 10px',
                    color: '#8bd3ff',
                    fontSize: 12,
                  }}
                >
                  {module.health.replaceAll('_', ' ')}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 44, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 18 }}>
          <div style={cardStyle}>
            <p style={eyebrowStyle}>Intern/operator access model</p>
            <h2 style={{ marginTop: 0 }}>Draft-first roles, scoped by module.</h2>
            <ul style={{ color: '#c8d1e8', lineHeight: 1.8, paddingLeft: 20 }}>
              {internRoles.map((role) => (
                <li key={role.key}>
                  <strong>{role.label}:</strong> {role.notes}
                </li>
              ))}
            </ul>
          </div>
          <div style={cardStyle}>
            <p style={eyebrowStyle}>Approval boundaries</p>
            <h2 style={{ marginTop: 0 }}>No risky external actions.</h2>
            <ul style={{ color: '#c8d1e8', lineHeight: 1.8, paddingLeft: 20 }}>
              <li>No secrets in repo or exposed to interns/operators.</li>
              <li>No public publishing, DNS/domain, or production deploy without review.</li>
              <li>No transfers, payouts, refunds, account links, or money movement without John approval.</li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
