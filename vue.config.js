module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      ['api/mock']: {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
  },
};
