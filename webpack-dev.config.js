const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack-base.config.js');
const devPort = 3030;


const devConfig = {
  mode: 'development',

  // devtool: 'eval',

  devServer: {
    host: '0.0.0.0',
    port: devPort,
    disableHostCheck: true,
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // }
  },

  entry: {
    webpack: [`webpack-dev-server/client?http://0.0.0.0:${devPort}`],
  },

  output: {
    publicPath: `http://static-dev.lvh.me:${devPort}/`,
    chunkFilename: '[id].bundle.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
  ],
};


module.exports = webpackMerge(baseConfig, devConfig);
