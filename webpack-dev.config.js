const path = require('path');
const webpack = require('webpack');

// const ReactRefreshPlugin = require('@webhotelier/webpack-fast-refresh');
const ReactRefreshPlugin = require('react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TimeFixPlugin = require('time-fix-plugin');


const clientPath = path.join(__dirname, 'src', 'client');

const config = {
  mode: 'development',

  entry: {
    main: [
      'webpack-hot-middleware/client?name=main&reload=true&timeout=2000',
      'whatwg-fetch',
      path.join(clientPath, 'index.js'),
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
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
              plugins: [
                require.resolve('react-refresh/babel'),
              ],
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
      // {
        // test: /\.svg$/,
        // loader: 'svg-inline-loader',
        // loader: 'react-svg-loader',
        // options: {
        //   jsx: true, // true outputs JSX tags
        //   svgo: {
        //     plugins: [
        //       { removeTitle: false },
        //     ],
        //     floatPrecision: 2,
        //   },
        // },
      // },
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
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
  ],

  optimization: {
    noEmitOnErrors: true,
    chunkIds: "named",
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        },
        // vendors: {
        //   name: 'vendor',
        //   minChunks: ({ resource }) => /node_modules/.test(resource),
        //   // test: /[\\/]node_modules[\\/]/,
        //   // priority: -10
        // },
        // common: {
        //   name: 'common',
        //   chunks: 'all',
        //   minChunks: 2,
        // },
      },
    },
  },
};


module.exports = config;
