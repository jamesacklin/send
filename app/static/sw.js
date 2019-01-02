importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/3cbb195e5e3d894bcc04.js",
    "revision": "ebbc6a7df29106d19510c701da7b12b3"
  },
  {
    "url": "/_nuxt/47268a6031a43f10b585.js",
    "revision": "e992dca4c570848f80b47e0c134201e6"
  },
  {
    "url": "/_nuxt/a26cd5287eeb9841b6ac.js",
    "revision": "0b3dd8f14cdbb94a985de864c0b057da"
  },
  {
    "url": "/_nuxt/a57950c12184baaf6d47.js",
    "revision": "b0d443084304e0938236d8178845ce8b"
  },
  {
    "url": "/_nuxt/bbed7b782dac20f79b2f.js",
    "revision": "b57229aea18e0b46c57ad88d05b5afca"
  },
  {
    "url": "/_nuxt/d59c2eaca5a5fab11173.js",
    "revision": "a6b4e2ed057dc9f103032b003c8b35fa"
  },
  {
    "url": "/_nuxt/d8054522d4d413e5effc.js",
    "revision": "06a25acccbe95c8be2f6f59dd46dd785"
  },
  {
    "url": "/_nuxt/defd8f3e8617efe03122.js",
    "revision": "1d0e30f8467e392e5082508494d5e12f"
  },
  {
    "url": "/_nuxt/f5a52955731335264507.js",
    "revision": "bdec951326e90ff901d29c8718a24a1a"
  }
], {
  "cacheId": "send",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
