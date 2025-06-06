const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3621',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '' //remove /api
      }
    })
  );
};