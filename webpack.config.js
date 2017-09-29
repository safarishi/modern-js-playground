const path = require('path')
const webpack = require('webpack')
const Dashboard = require('webpack-dashboard')
// require webpack dashboard plugin
const DashboardPlugin = require('webpack-dashboard/plugin')

const TARGET = process.env.npm_lifecycle_event
process.env.BABEL_ENV = TARGET

const dashboard = new Dashboard

module.exports = {
  entry: [
    'babel-polyfill',
    './src/app.js',
  ],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 9211,
  },
  resolve: {
    extensions: ['', '.web.js', '.js', '.json'],
    alias: {
      component: path.join(__dirname, 'src/components'),
      '@': path.join(__dirname, 'src')
    },
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ]
  },
}