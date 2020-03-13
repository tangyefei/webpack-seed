const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
