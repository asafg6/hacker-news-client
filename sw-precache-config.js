module.exports = {
    stripPrefix: 'build/',
    staticFileGlobs: [
      'build/*.html',
      'build/manifest.json',
      'build/static/**/!(*map*)',
      'build/css/style.css',
      'build/css/bootstrap.min.css',   
      'build/css/bootstrap.min.css.map',
      'build/favicon.ico',
      'build/big.ico',
    ],
    runtimeCaching: [{
        urlPattern: /\//,
        handler: 'networkFirst'
      }, {
        urlPattern: /.*.woff/,
        handler: 'networkFirst'
      }
    ],
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    swFilePath: 'build/service-worker.js'
};