// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/wx': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/wx': '/wx'
        }
      },
      '/residence': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/residence': '/residence'
        }
      },
      '/region': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/region': '/region'
        }
      },
      '/listByParent': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/listByParent': '/listByParent'
        }
      },
      '/school': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/school': '/school'
        }
      },
      '/info': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/info': '/info'
        }
      },
      '/sso': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/sso': '/sso'
        }
      },
      '/sms': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/sms': '/sms'
        }
      },
      '/question': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/question': '/question'
        }
      },
      '/baike': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/baike': '/baike'
        }
      },
      '/banner': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/banner': '/banner'
        }
      },
      '/user': {
        target: 'http://116.62.23.82:80',
        changeOrigin: true,
        pathRewrite: {
          '^/user': '/user'
        }
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
