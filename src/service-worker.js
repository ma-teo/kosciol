importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js')

self.skipWaiting()
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

workbox.routing.registerRoute(new workbox.routing.NavigationRoute(workbox.precaching.createHandlerBoundToURL('200.html'), {
  denylist: [/\/[^/?]+\.[^/]+$/],
}))
