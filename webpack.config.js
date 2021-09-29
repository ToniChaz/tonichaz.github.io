const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devServer: {
    static: './dist',
    hot: true
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {test: /\.css$/,  use: ["style-loader", "css-loader"]},
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['dist']}),
    new CopyPlugin({
      patterns: [
        {from: 'src/img', to: 'img'},
        {from: 'src/favicon.ico', to: './'},
        {from: 'src/.htaccess', to: './'},
        {from: 'src/CNAME', to: './'}
      ]
    })
  ]
}