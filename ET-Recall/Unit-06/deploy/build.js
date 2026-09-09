const fs = require('node:fs/promises');
const path = require('node:path');

const SOURCE = process.env.UNIT06_SOURCE_ORIGIN || 'https://et-recall-unit-06.vercel.app';
const OVERLAY_COMMIT = process.env.UNIT06_OVERLAY_COMMIT || 'eef4a9151bd53fd343098b4569f259d6d14d24d3';
const RAW = process.env.UNIT06_RAW_GITHUB || `https://raw.githubusercontent.com/adnimeshakalhara04-create/al_tech_notes/${OVERLAY_COMMIT}/ET-Recall/Unit-06`;
const OUT = path.join(process.cwd(), '.vercel', 'output');
const STATIC = path.join(OUT, 'static');

const SVG_FILES = [
  '01_engine_head.svg','02_engine_block.svg','03_oil_sump.svg','04_piston.svg',
  '05_piston_rod.svg','06_crankshaft.svg','07_inlet_valve.svg','08_exhaust_valve.svg',
  '09_four_stroke_cycle.svg','10_two_stroke_cycle.svg','11_fuel_system.svg','12_carburetor.svg',
  '13_fuel_injector.svg','14_ignition_coil.svg','15_spark_plug.svg','16_lubrication_system.svg',
  '17_oil_pump.svg','18_oil_filter.svg','19_brake_system.svg','20_radiator_cooling_system.svg',
  '21_water_pump.svg','22_battery.svg','23_alternator.svg','24_starter_motor.svg',
  '25_clutch.svg','26_gearbox.svg','27_differential.svg','28_tyre_construction.svg'
];
const EXTRA_OVERLAYS = ['/assets/complete-lesson.js','/assets/unit06-admin.js'];
const OVERLAY_PATHS = new Set([
  '/assets/unit06-svg.js','/assets/unit06-svg-map.json',...EXTRA_OVERLAYS,
  ...SVG_FILES.map(file => `/assets/svg/${file}`)
]);
const TEXT_EXT = new Set(['.html','.js','.css','.json','.webmanifest','.svg','.txt','.xml']);
const seen = new Set();
const queue = [
  '/', '/app.js', '/data/config.js', '/data/questions.js', '/data/formulas.js',
  '/manifest.webmanifest', '/sw.js', '/icon.svg', '/icons/icon-192.png', '/icons/icon-512.png'
];

function cleanAsset(value) {
  if (!value || typeof value !== 'string') return null;
  let v = value.trim().replace(/&amp;/g, '&');
  if (!v.startsWith('/') || v.startsWith('//')) return null;
  v = v.split('#')[0].split('?')[0];
  if (!v || v === '/' || v.includes('..')) return null;
  return v;
}
function discover(text) {
  const found = new Set();
  const patterns = [
    /(?:src|href)=["']([^"']+)["']/g,
    /["'](\/[A-Za-z0-9_@%+.,~()\-\/]+\.(?:js|css|json|webmanifest|svg|png|jpe?g|webp|gif|ico|woff2?|ttf))["']/gi
  ];
  for (const re of patterns) { let m; while ((m = re.exec(text))) { const p = cleanAsset(m[1]); if (p) found.add(p); } }
  return [...found];
}
async function fetchBytes(url, required = false) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'ET-Unit06-CompleteLesson/4.0' } });
  if (!res.ok) { if (required) throw new Error(`Required fetch failed ${res.status}: ${url}`); console.warn(`skip ${res.status} ${url}`); return null; }
  return Buffer.from(await res.arrayBuffer());
}
async function put(rel, bytes) {
  const file = rel === '/' ? path.join(STATIC, 'index.html') : path.join(STATIC, rel.replace(/^\//, ''));
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, bytes);
}
function injectOverlays(html) {
  const paths = ['/assets/unit06-svg.js','/assets/complete-lesson.js','/assets/unit06-admin.js'];
  let text = html;
  for (const p of paths) text = text.replace(new RegExp(`\\s*<script\\s+src=["']${p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}["']><\\/script>\\s*`, 'g'), '\n');
  const needle = '<script src="/data/questions.js"></script>';
  if (!text.includes(needle)) throw new Error('questions.js script marker not found in production HTML');
  const block = `${needle}\n<script src="/assets/unit06-svg.js"></script>\n<script src="/assets/complete-lesson.js"></script>\n<script src="/assets/unit06-admin.js"></script>`;
  return text.replace(needle, block);
}
async function mirrorProduction() {
  while (queue.length) {
    const rel = queue.shift();
    if (seen.has(rel)) continue;
    seen.add(rel);
    if (OVERLAY_PATHS.has(rel)) continue;
    const required = rel === '/' || rel === '/app.js' || rel === '/data/config.js' || rel === '/data/questions.js';
    const bytes = await fetchBytes(SOURCE + rel, required);
    if (!bytes) continue;
    let out = bytes;
    const ext = rel === '/' ? '.html' : path.extname(rel).toLowerCase();
    if (TEXT_EXT.has(ext)) {
      let text = bytes.toString('utf8');
      if (rel === '/') text = injectOverlays(text);
      for (const asset of discover(text)) if (!seen.has(asset)) queue.push(asset);
      out = Buffer.from(text, 'utf8');
    }
    await put(rel, out);
  }
}
async function installOverlays() {
  const files = ['unit06-svg.js','unit06-svg-map.json','complete-lesson.js','unit06-admin.js'];
  for (const file of files) {
    const bytes = await fetchBytes(`${RAW}/assets/${file}`, true);
    await put(`/assets/${file}`, bytes);
  }
  for (const file of SVG_FILES) {
    const bytes = await fetchBytes(`${RAW}/assets/svg/${file}`, true);
    await put(`/assets/svg/${file}`, bytes);
  }
}
async function verifyOutput() {
  const index = await fs.readFile(path.join(STATIC, 'index.html'), 'utf8');
  const order = ['/data/questions.js','/assets/unit06-svg.js','/assets/complete-lesson.js','/assets/unit06-admin.js','/app.js'];
  for (const p of order) if (!index.includes(p)) throw new Error(`Required script missing: ${p}`);
  for (let i=1;i<order.length;i++) if (index.indexOf(order[i-1]) > index.indexOf(order[i])) throw new Error(`Script order invalid: ${order[i-1]} -> ${order[i]}`);

  const q = await fs.readFile(path.join(STATIC, 'data', 'questions.js'), 'utf8');
  const cfg = await fs.readFile(path.join(STATIC, 'data', 'config.js'), 'utf8');
  if (q.length < 100000) throw new Error(`questions.js looks incomplete (${q.length} chars)`);
  if (!q.includes('6.1') || !q.includes('6.2') || !q.includes('6.3')) throw new Error('questions.js missing expected Unit 06 section markers');
  if (!/(?:expectedQuestionCount|count)\s*:\s*473\b/.test(cfg)) throw new Error('config.js does not confirm 473 questions');

  const resolver = await fs.readFile(path.join(STATIC, 'assets', 'unit06-svg.js'), 'utf8');
  const lesson = await fs.readFile(path.join(STATIC, 'assets', 'complete-lesson.js'), 'utf8');
  const admin = await fs.readFile(path.join(STATIC, 'assets', 'unit06-admin.js'), 'utf8');
  if (!resolver.includes('ET_UNIT06_SVG') || !resolver.includes('ET_U6_QUESTIONS')) throw new Error('SVG resolver integrity check failed');
  if (!lesson.includes('සම්පූර්ණ පාඩම') || !lesson.includes('u6:lesson-ready') || !lesson.includes('ET_U6_QUESTIONS')) throw new Error('Complete Lesson integrity check failed');
  if (!admin.includes('sessionStorage') || !admin.includes('live-images.json') || !admin.includes('u6:lesson-ready')) throw new Error('Admin integrity check failed');
  for (const file of SVG_FILES) { const s = await fs.readFile(path.join(STATIC,'assets','svg',file),'utf8'); if (!s.includes('<svg')) throw new Error(`Invalid SVG: ${file}`); }
}
async function main() {
  await fs.rm(OUT,{recursive:true,force:true});
  await fs.mkdir(STATIC,{recursive:true});
  await mirrorProduction();
  await installOverlays();
  await verifyOutput();
  await fs.writeFile(path.join(OUT,'config.json'),JSON.stringify({version:3},null,2));
  await fs.writeFile(path.join(STATIC,'build-marker.json'),JSON.stringify({
    unit:'06',mode:'complete-lesson-v4',sourceOrigin:SOURCE,questionCount:473,svgAssets:SVG_FILES.length,
    completeLesson:true,globalAdmin:true,overlayCommit:OVERLAY_COMMIT,generatedAt:new Date().toISOString()
  },null,2));
  console.log(`Unit 06 Complete Lesson v4 READY: ${seen.size} mirrored paths + 473 questions + ${SVG_FILES.length} SVGs + global admin`);
}
main().catch(err=>{console.error(err.stack||err);process.exit(1)});
