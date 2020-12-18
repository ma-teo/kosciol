module.exports = {
  globDirectory: 'build/public/',
  globPatterns: [
    'css/**.css',
    'js/**.js',
    'media/**.*',
  ],
  dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
  swSrc: 'src/service-worker.js',
  swDest: 'build/public/service-worker.js',
}
