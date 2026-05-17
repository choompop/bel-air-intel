import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CLIENT_REGISTRY,
  JUKES_DINER_SYSTEM_LINKS,
  MODULE_REGISTRY,
  ROLE_ACCESS_LEVELS,
  getClientBySlug,
  getClientModuleStatuses,
} from '../lib/control-plane.mjs';

test('Jukes Diner is registered as the first beta client tenant', () => {
  assert.equal(CLIENT_REGISTRY.length, 1);

  const jukes = getClientBySlug('jukes-diner');

  assert.equal(jukes.name, "Juke's Diner");
  assert.equal(jukes.status, 'beta_internal_proof_client');
  assert.equal(jukes.parentControlPlane, 'bel-air-intel');
  assert.deepEqual(jukes.enabledModuleKeys, [
    'operations',
    'bookings',
    'marketing',
    'drive-asset-library',
    'finance-cain-union',
    'agent-brain',
    'public-site-mainframe-studio',
  ]);
});

test('module registry exposes all required Bel Air Intel control-plane modules', () => {
  assert.deepEqual(
    MODULE_REGISTRY.map((module) => module.key),
    [
      'operations',
      'bookings',
      'marketing',
      'drive-asset-library',
      'finance-cain-union',
      'agent-brain',
      'public-site-mainframe-studio',
    ],
  );

  for (const module of MODULE_REGISTRY) {
    assert.ok(module.name);
    assert.ok(module.ownerBrand);
    assert.ok(module.status);
    assert.ok(module.sourceSystem);
    assert.ok(Array.isArray(module.approvalBoundaries));
  }
});

test('module status feed keeps integrations static and approval-safe', () => {
  const statuses = getClientModuleStatuses('jukes-diner');

  assert.equal(statuses.length, 7);
  assert.ok(statuses.every((status) => status.clientSlug === 'jukes-diner'));
  assert.ok(statuses.every((status) => status.health !== 'live_money_movement'));
  assert.ok(statuses.some((status) => status.moduleKey === 'finance-cain-union'));
  assert.ok(
    statuses
      .find((status) => status.moduleKey === 'finance-cain-union')
      .approvalBoundaries.includes('No transfers, payouts, refunds, or account-link actions without John approval.'),
  );
});

test('Jukes client links label live systems separately from placeholders', () => {
  assert.deepEqual(
    JUKES_DINER_SYSTEM_LINKS.map((link) => link.key),
    [
      'jukes-dashboard',
      'booking-pipeline',
      'drive-assets',
      'calendar',
      'slack-flo',
      'public-website',
      'cain-union-finance',
      'mainframe-studio-growth',
      'kanban-board',
    ],
  );

  const liveLinks = JUKES_DINER_SYSTEM_LINKS.filter((link) => link.linkType === 'live');
  const placeholderLinks = JUKES_DINER_SYSTEM_LINKS.filter((link) => link.linkType === 'placeholder');

  assert.ok(liveLinks.length >= 2);
  assert.ok(placeholderLinks.length >= 1);
  assert.ok(JUKES_DINER_SYSTEM_LINKS.every((link) => link.label && link.href && link.linkType));
  assert.ok(JUKES_DINER_SYSTEM_LINKS.every((link) => ['live', 'placeholder'].includes(link.linkType)));
  assert.equal(
    JUKES_DINER_SYSTEM_LINKS.find((link) => link.key === 'cain-union-finance').approvalRequired,
    true,
  );
});

test('role access levels define intern, manager, and owner approval boundaries', () => {
  assert.deepEqual(
    ROLE_ACCESS_LEVELS.map((role) => role.key),
    [
      'intern_research',
      'intern_content',
      'intern_ops',
      'intern_engineering',
      'operator',
      'manager',
      'finance_operator',
      'owner',
    ],
  );

  for (const internRole of ROLE_ACCESS_LEVELS.filter((role) => role.key.startsWith('intern_'))) {
    assert.equal(internRole.canPublishExternally, false);
    assert.equal(internRole.canAccessSecrets, false);
    assert.equal(internRole.canMoveMoney, false);
  }

  const manager = ROLE_ACCESS_LEVELS.find((role) => role.key === 'manager');
  assert.equal(manager.canPublishExternally, false);
  assert.equal(manager.canAccessSecrets, false);
  assert.equal(manager.canMoveMoney, false);
  assert.equal(manager.externalPublishingApproval, 'john_owner_required');
  assert.match(manager.notes, /approve internal/i);
  assert.match(manager.notes, /John/i);
  assert.match(manager.notes, /external publishing/i);

  const owner = ROLE_ACCESS_LEVELS.find((role) => role.key === 'owner');
  assert.equal(owner.canPublishExternally, true);
  assert.equal(owner.canAccessSecrets, true);
  assert.equal(owner.canMoveMoney, true);

  const unconditionalCapabilityRoles = ROLE_ACCESS_LEVELS.filter(
    (role) => role.canPublishExternally || role.canAccessSecrets || role.canMoveMoney,
  );
  assert.deepEqual(
    unconditionalCapabilityRoles.map((role) => role.key),
    ['owner'],
  );

  assert.equal(
    ROLE_ACCESS_LEVELS.find((role) => role.key === 'finance_operator').canMoveMoney,
    false,
  );
});
