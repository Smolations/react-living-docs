const path = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals')


const serverPath = path.join(__dirname, 'src', 'server');

module.exports = (env, argv) => {
  const SERVER_PATH = (argv.mode === 'production')
    ? path.join(serverPath, 'server-prod.js')
    : path.join(serverPath, 'server-dev.js');


  const config = {
    entry: {
      server: SERVER_PATH,
    },

    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js',
    },

    target: 'node',

    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't specify these, __dirname
      __filename: false,  // and __filename return blank or /
    },

    // Need this to avoid error when working with Express
    externals: [nodeExternals()],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
  };

  return config;
}
