const CACHE='et-unit-01-v39';
const CORE=['/','/manifest.webmanifest?v=39','/icon.svg?v=39','/enhance.js?v=39'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put('/',c));return r}).catch(()=>caches.match('/')));return}if(new URL(e.request.url).origin===self.location.origin)e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
