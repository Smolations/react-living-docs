const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// verify that staging/prod build boxes set this
const devMode = process.env.NODE_ENV !== 'production';


const config = {
  entry: {
    storybook: './src/storybook',
    components: './src/components',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/@babel\/.*standalone)/,
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
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: '@import "noop";',
              sassOptions: {
                includePaths: [
                  path.join(__dirname, 'src', 'sass-noop'),
                ],
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      // chunkFilename: "[id].css"
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new HtmlWebpackPlugin({
      title: 'Recurly-App Storybook',
      template: './src/index.ejs',
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
