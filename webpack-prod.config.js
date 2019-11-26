const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const clientPath = path.join(__dirname, 'src', 'client');

const config = {
  mode: 'production',

  entry: {
    main: path.join(clientPath, 'index.js'),
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
          MiniCssExtractPlugin.loader,
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
            options: { minimize: true },
          },
        ],
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Recurly-App Storybook',
      template: path.join(clientPath, 'index.ejs'),
      excludeChunks: 'server',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};


module.exports = config;
