importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

workbox.core.skipWaiting()
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
