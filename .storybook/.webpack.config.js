const path = require('path')
console.log('======')
console.log(path.dirname(path.resolve(__dirname)))
console.log('======')
module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.dirname(path.resolve(__dirname))
    }
  }
}
