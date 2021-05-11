module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/User': {
        target: 'http://115.28.106.108:8991/User',
        changeOrigin: true,
        pathRewrite:{
          '^/User': ''
        }
      },
      '/SaleCar': {
        target: 'http://115.28.106.108:8991/SaleCar',
        changeOrigin: true,
        pathRewrite:{
          '^/SaleCar': ''
        }
      }
    }
  }
}