var V="emordes-v1";
var A=["./","index.html","style.css","app.js","manifest.webmanifest","icons/emordes_logo_black.svg","icons/icon-192.png","icons/icon-512.png"];
["011","022","014","026","012","024","021","015","023","010","025","016","009","013","027","028","036","038","039","183"].forEach(function(n){A.push("img/t/"+n+".webp","img/f/"+n+".webp")});
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(A)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request).catch(function(){return caches.match("index.html")})}))});