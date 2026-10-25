import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORIES, projects } from '../src/data/projects.js';
import { profile } from '../src/data/profile.js';
import { strings } from '../src/i18n/strings.js';

const STATUSES = ['verified', 'partial', 'unverified', 'blocked'];
const TEXT_FIELDS = ['tagline', 'summary', 'purpose', 'features', 'contribution', 'contributionNote', 'challenges', 'run', 'pending'];

test('hay siete proyectos con slugs únicos y un único destacado', () => {
  assert.equal(projects.length, 7);
  assert.equal(new Set(projects.map((p) => p.slug)).size, 7);
  assert.equal(projects.filter((p) => p.featured).length, 1);
  assert.equal(projects.find((p) => p.featured).slug, 'delvefolk');
});

test('cada proyecto pertenece a una categoría existente y tiene estado válido', () => {
  for (const p of projects) {
    assert.ok(CATEGORIES.some((c) => c.id === p.category), p.slug);
    assert.ok(STATUSES.includes(p.verification.status), p.slug);
    for (const c of p.verification.checks) assert.ok(STATUSES.includes(c.status), `${p.slug}: ${c.es}`);
  }
});

test('los textos existen en español e inglés con la misma forma', () => {
  for (const p of projects) {
    for (const f of TEXT_FIELDS) {
      assert.ok(f in p.es && f in p.en, `${p.slug}.${f}`);
      if (Array.isArray(p.es[f])) assert.equal(p.es[f].length, p.en[f].length, `${p.slug}.${f}`);
    }
    for (const c of p.verification.checks) assert.ok(c.es && c.en, p.slug);
  }
});

test('las claves de interfaz coinciden entre idiomas', () => {
  const keys = (o, prefix = '') =>
    Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));
  assert.deepEqual(keys(strings.es).sort(), keys(strings.en).sort());
});

test('todos los enlaces externos son https y las imágenes existen', () => {
  for (const p of projects) {
    for (const url of [p.repo, p.demo, p.video].filter(Boolean)) assert.match(url, /^https:\/\//, p.slug);
    if (p.image) assert.ok(existsSync(join('public', p.image)), p.image);
  }
  assert.match(profile.github, /^https:\/\//);
  assert.match(profile.linkedin, /^https:\/\//);
});

test('no se publican teléfono ni documento de identidad', () => {
  const sources = ['src/data/profile.js', 'src/data/projects.js', 'src/i18n/strings.js', 'index.html'];
  for (const dir of ['src/pages', 'src/components']) for (const f of readdirSync(dir)) sources.push(join(dir, f));
  const phone = /\+?57[\s-]?3\d{2}|\b3\d{2}[\s-]?\d{3}[\s-]?\d{4}\b/;
  for (const file of sources) {
    const text = readFileSync(file, 'utf8');
    assert.ok(!phone.test(text), `posible teléfono en ${file}`);
    assert.ok(!/\b(c[ée]dula|C\.?C\.?\s*\d)/i.test(text), `posible documento en ${file}`);
  }
});
