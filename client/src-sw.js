const { offlineFallback, warmStrategyCache } = require('workbox-recipes'); //JRM: NEED TO BUILD OUT.
const { CacheFirst } = require('workbox-strategies'); //JRM: ACCOUNTED FOR--GOOD.
const { registerRoute } = require('workbox-routing'); //JRM: NEED TO BUILD OUT.
const { CacheableResponsePlugin } = require('workbox-cacheable-response'); //JRM: ACCOUNTED FOR--GOOD.
const { ExpirationPlugin } = require('workbox-expiration'); //JRM: ACCOUNTED FOR--GOOD.
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute'); //JRM: ACCOUNTED FOR--GOOD.

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
//JRM: may need fixing!
registerRoute(

  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),

  offlineFallback()
  
);
