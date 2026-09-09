const fs = require('node:fs/promises');
const path = require('node:path');

const SOURCE = process.env.UNIT06_SOURCE_ORIGIN || 'https://et-recall-unit-06.vercel.app';
const RAW = process.env.UNIT06_RAW_GITHUB || 'https://raw.githubusercontent.com/adnimeshakalhara04-create/al_tech_notes/main/ET-Recall/Unit-06';
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

const TEXT_EXT = new Set(['.html','.js','.css','.json','.webmanifest','.svg','.txt','.xml']);
const seen = new Set();
const queue = [
  '/', '/app.js', '/data/config.js', '/data/questions.js', '/data/formulas.js',
  '/manifest.webmanifest', '/sw.js', '/icon.svg', '/icons/icon-192.png', '/icons/icon-512.png'
];

function cleanAsset(value) {
  if (!value || typeof value !== 'string') return null;
  let v = value.trim().replace(/&amp;/g, '&');
  if (!v.startsWith('/')) return null;
  if (v.startsWith('//')) return null;
  v = v.split('#')[0].split('?')[0];
  if (!v || v === '/') return null;
  if (v.includes('..')) return null;
  return v;
}

function discover(text) {
  const found = new Set();
  const patterns = [
    /(?:src|href)=["']([^"']+)["']/g,
    /["'](\/[A-Za-z0-9_@%+.,~()\-\/]+\.(?:js|css|json|webmanifest|svg|png|jpe?g|webp|gif|ico|woff2?|ttf))["']/gi
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      const p = cleanAsset(m[1]);
      if (p) found.add(p);
    }
  }
  return [...found];
}

async function fetchBytes(url, required = false) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'ET-Unit06-SafeOverlay/1.0' } });
  if (!res.ok) {
    if (required) throw new Error(`Required fetch failed ${res.status}: ${url}`);
    console.warn(`skip ${res.status} ${url}`);
    return null;
  }
  return Buffer.from(await res.arrayBuffer());
}

async function put(rel, bytes) {
  const file = rel === '/' ? path.join(STATIC, 'index.html') : path.join(STATIC, rel.replace(/^\//, ''));
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, bytes);
}

async function mirrorProduction() {
  while (queue.length) {
    const rel = queue.shift();
    if (seen.has(rel)) continue;
    seen.add(rel);

    const bytes = await fetchBytes(SOURCE + rel, rel === '/' || rel === '/app.js' || rel === '/data/questions.js');
    if (!bytes) continue;

    let out = bytes;
    const ext = rel === '/' ? '.html' : path.extname(rel).toLowerCase();
    if (TEXT_EXT.has(ext)) {
      let text = bytes.toString('utf8');
      if (rel === '/') {
        const needle = '<script src="/data/questions.js"></script>';
        const injection = needle + '\n<script src="/assets/unit06-svg.js"></script>';
        if (!text.includes('/assets/unit06-svg.js')) {
          if (!text.includes(needle)) throw new Error('questions.js script marker not found in production HTML');
          text = text.replace(needle, injection);
        }
      }
      for (const asset of discover(text)) if (!seen.has(asset)) queue.push(asset);
      out = Buffer.from(text, 'utf8');
    }
    await put(rel, out);
  }
}

async function installSvgOverlay() {
  const resolver = await fetchBytes(`${RAW}/assets/unit06-svg.js`, true);
  const map = await fetchBytes(`${RAW}/assets/unit06-svg-map.json`, true);
  await put('/assets/unit06-svg.js', resolver);
  await put('/assets/unit06-svg-map.json', map);

  for (const file of SVG_FILES) {
    const bytes = await fetchBytes(`${RAW}/assets/svg/${file}`, true);
    await put(`/assets/svg/${file}`, bytes);
  }
}

async function verifyOutput() {
  const index = await fs.readFile(path.join(STATIC, 'index.html'), 'utf8');
  if (!index.includes('/data/questions.js')) throw new Error('questions.js missing from output');
  if (!index.includes('/assets/unit06-svg.js')) throw new Error('SVG resolver script missing from output');
  if (index.indexOf('/assets/unit06-svg.js') < index.indexOf('/data/questions.js')) {
    throw new Error('SVG resolver must load after questions.js');
  }
  if (index.indexOf('/assets/unit06-svg.js') > index.indexOf('/app.js')) {
    throw new Error('SVG resolver must load before app.js');
  }

  const q = await fs.readFile(path.join(STATIC, 'data', 'questions.js'), 'utf8');
  const cfg = await fs.readFile(path.join(STATIC, 'data', 'config.js'), 'utf8');
  if (!q.includes('window.ET6')) throw new Error('ET6 dataset marker missing');
  if (!cfg.includes('473')) console.warn('warning: expected 473 marker not found in config.js');

  for (const file of SVG_FILES) {
    const s = await fs.readFile(path.join(STATIC, 'assets', 'svg', file), 'utf8');
    if (!s.includes('<svg')) throw new Error(`Invalid SVG: ${file}`);
  }
}

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(STATIC, { recursive: true });
  await mirrorProduction();
  await installSvgOverlay();
  await verifyOutput();

  await fs.writeFile(path.join(OUT, 'config.json'), JSON.stringify({ version: 3 }, null, 2));
  await fs.writeFile(path.join(STATIC, 'build-marker.json'), JSON.stringify({
    unit: '06',
    mode: 'safe-svg-overlay',
    sourceOrigin: SOURCE,
    svgAssets: SVG_FILES.length,
    resolver: '/assets/unit06-svg.js',
    generatedAt: new Date().toISOString()
  }, null, 2));

  console.log(`Unit 06 safe overlay READY: mirrored ${seen.size} production paths + ${SVG_FILES.length} SVG assets`);
}

main().catch(err => {
  console.error(err.stack || err);
  process.exit(1);
});
