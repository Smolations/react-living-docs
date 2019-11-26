const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TimeFixPlugin = require('time-fix-plugin');


const clientPath = path.join(__dirname, 'src', 'client');

const config = {
  mode: 'development',

  entry: {
    main: path.join(clientPath, 'index.js'),
    // main: [
      // path.join(clientPath, 'index.js'),
      // './src/client/index.js',
      // 'webpack-hot-middleware/main?path=/__webpack_hmr&timeout=20000',
    // ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },

  target: 'web',

  devtool: 'source-map',

  resolve: {
    modules: [
      clientPath,
      'node_modules',
    ],
    extensions: ['.js', '.scss'],
  },

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
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: '@import "noop";',
              sassOptions: {
                includePaths: [
                  path.join(clientPath, 'sass-noop'),
                ],
              },
            },
          },
        ],
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      }
    ],
  },

  plugins: [
    new TimeFixPlugin(),
    new HtmlWebpackPlugin({
      title: 'Recurly-App Storybook',
      template: path.join(clientPath, 'index.ejs'),
      excludeChunks: 'server',
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],

  optimization: {
    noEmitOnErrors: true,
  },
};


module.exports = config;
