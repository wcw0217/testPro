// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
// 基础路径 注意发布之前要先修改这里
// let publicPath = process.env.NODE_ENV === 'production' ? '/chjb-h5/' : '/'

module.exports = {
  // publicPath, // 根据你的实际情况更改这里
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: {
    // publicPath, // 和 publicPath 保持一致
    proxy: {
      '/': {
        target: process.env.VUE_APP_UAT,
        changeOrigin: true,
        port: 8080,
      }
    },
    disableHostCheck: true,
    host: 'localhost',
    port: 10000,
  },
  // chainWebpack: config => {
  //   // 重新设置 alias
  //   config.resolve.alias
  //     .set('@api', resolve('src/api'))
  // }
  transpileDependencies: ['webpack-dev-server/client'],
  chainWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js'];
  }
}