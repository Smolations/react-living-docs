const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');

const baseConfig = require('./webpack-base.config.js');


const prodConfig = {
  mode: 'production',

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new WebpackShellPlugin({
      safe: true,
      onBuildEnd: [
        'mkdir -p ../public/spa-images',
        'cp ./dist/spa-images/* ../public/spa-images/',
      ],
    }),
  ],
};


module.exports = webpackMerge(baseConfig, prodConfig);
