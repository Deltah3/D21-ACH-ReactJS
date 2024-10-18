const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.thecocktaildb.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
};
