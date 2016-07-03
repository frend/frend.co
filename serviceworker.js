// we'll version our cache (and learn how to delete caches in
// some other post)
const cacheName = 'v1::static';

self.addEventListener('install', e => {
	// once the SW is installed, go ahead and fetch the resources
	// to make this work offline
	e.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				'/',
				'/about/',
				'/css/dist/global.min.css',
				'/js/dist/global.min.js'
			]).then(() => self.skipWaiting());
		})
	);
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(res => res || fetch(event.request))
	);
});







// //  Cache name
// const cacheVersion = '1.0.0';
// const cacheFiles = [
//   '/',
//   '/about/',
//   '/css/dist/global.min.css',
//   '/js/dist/global.min.js'
// ];

// //  Activate
// //-----------------------------------
// self.addEventListener('activate', e => {
//   //  Delete all cache versions that aren't the most current (cacheVersion)
//   e.waitUntil(
//     caches
//       .keys()
//       .then(keyList => {
//         return Promise.all(keyList.map(key => {
//           if ([...cacheVersion].indexOf(key) === -1) return caches.delete(key);
//         }));
//       })
//   );
// });

// //  Install
// //-----------------------------------
// self.addEventListener('install', e => {
//   // once the SW is installed, go ahead and fetch the resources to make this work offline
//   e.waitUntil(
//     caches
//       .open(cacheVersion)
//       .then(cache => {
//         return cache
//           .addAll([
//             '/',
//             '/about/',
//             '/css/dist/global.min.css',
//             '/js/dist/global.min.js'
//           ])
//           .then(() => self.skipWaiting());
//       })
//   );
// });

// //  Fetch
// //-----------------------------------
// self.addEventListener('fetch', e => {
//   // when the browser fetches a url, either response with the cached object or go ahead and fetch the actual url
//   e.respondWith(
//     caches
//       .match(e.request)
//       .then(res => res || fetch(e.request))
//       .catch(err => console.log(err))
//   );
// });