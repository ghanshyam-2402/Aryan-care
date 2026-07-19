const CACHE='aaryan-care-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./'])))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&e.request.url.startsWith(self.location.origin)){const cl=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));}return r;}).catch(()=>caches.match(e.request)))});