importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js')

workbox.core.skipWaiting()
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

workbox.routing.registerRoute(new workbox.routing.NavigationRoute(workbox.precaching.createHandlerBoundToURL('200.html'), {
  denylist: [/\/[^/?]+\.[^/]+$/],
}))
