// The template shop's card pictures (RMD-crm BUILD_PLAN 11.13, SF-D3), taken
// from each template's live demo so a new template needs one command:
//
//   node scripts/template-shots.mjs            templates without pictures yet
//   node scripts/template-shots.mjs corbel     just these (by slug)
//   node scripts/template-shots.mjs --all      every template again
//
// For each: <slug>-hero.webp (the top of the home page, 1200×750) and
// <slug>-full.webp (the whole home page, 960 wide) in
// src/assets/images/web/templates. Headless Chrome through its DevTools
// protocol, with reduced motion so every section is drawn at rest; needs
// google-chrome and ffmpeg with libwebp. SITES_CATALOG_URL as for the build.

import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const OUT = new URL('../src/assets/images/web/templates/', import.meta.url).pathname;
const source = process.env.SITES_CATALOG_URL || 'https://app.iconik.site/shop/catalog.json';
const catalog = /^https?:\/\//.test(source) ? await fetch(source).then((r) => r.json()) : JSON.parse(readFileSync(source, 'utf8'));

const args = process.argv.slice(2);
const all = args.includes('--all');
const named = args.filter((a) => !a.startsWith('--'));
const templates = catalog.templates.filter((t) => /^[a-z0-9-]+$/.test(t.slug) && /^https:\/\/[a-z0-9-]+\.iconik\.site$/.test(t.demo)).filter((t) =>
  named.length ? named.includes(t.slug) : all || !existsSync(`${OUT}${t.slug}-hero.webp`) || !existsSync(`${OUT}${t.slug}-full.webp`),
);
if (!templates.length) {
  console.log('Every template already has its pictures (use --all to take them again).');
  process.exit(0);
}

const profile = mkdtempSync(join(tmpdir(), 'template-shots-'));
const chrome = spawn('google-chrome', ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=9335', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  target = await fetch('http://127.0.0.1:9335/json').then((r) => r.json()).then((l) => l.find((t) => t.type === 'page')).catch(() => null);
}
if (!target) throw new Error('Chrome did not start.');
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
const send = (method, params = {}) => new Promise((r) => (pending.set(++id, r), ws.send(JSON.stringify({ id, method, params }))));
const run = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;

async function save(name, width, height, full) {
  const { result } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full, clip: { x: 0, y: 0, width, height, scale: 1 } });
  const png = join(profile, `${name}.png`);
  writeFileSync(png, Buffer.from(result.data, 'base64'));
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-c:v', 'libwebp', '-quality', full ? '72' : '80', `${OUT}${name}.webp`]);
}

/** Opens the demo's home page at this width and waits for its fonts and photos. */
async function open(url, width, height) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url });
  for (let i = 0; i < 100 && (await run('document.readyState')) !== 'complete'; i++) await sleep(150);
  await run('document.fonts.ready.then(() => true)');
  // Lazy photos load once scrolled near, so walk down the page and back.
  await run(`(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); })()`);
  // Hidden photos (a slider's other side, say) never load lazily, so load every one now, and give up waiting after 15s.
  await run(`Promise.race([
    Promise.all([...document.images].map((img) => { img.loading = 'eager'; return img.complete ? 0 : new Promise((r) => { img.onload = img.onerror = r; }); })),
    new Promise((r) => setTimeout(r, 15000)),
  ])`);
  await sleep(500);
}

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: 'light' }] });
  for (const t of templates) {
    await open(t.demo, 1200, 750);
    await save(`${t.slug}-hero`, 1200, 750, false);
    await open(t.demo, 960, 900);
    const height = await run('document.documentElement.scrollHeight');
    await send('Emulation.setDeviceMetricsOverride', { width: 960, height, deviceScaleFactor: 1, mobile: false });
    await sleep(800);
    await save(`${t.slug}-full`, 960, height, true);
    console.log(`  ${t.slug}: hero and full page (${height}px tall)`);
  }
} finally {
  ws.close();
  // Chrome writes to its profile until it has exited.
  await new Promise((r) => (chrome.once('exit', r), chrome.kill()));
  rmSync(profile, { recursive: true, force: true, maxRetries: 5 });
}
console.log('Pictures saved in src/assets/images/web/templates.');
