const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const nodeEnv = process.env.NODE_ENV;

module.exports = {
  entry: {
    app: ['./src/index.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    // Remove your build folder(s) before building
    new CleanWebpackPlugin(),

    // Automatically generate an HTML5 file for you that includes all your webpack bundles
    new HtmlWebpackPlugin({
      title: 'Rest Boilerplate',
      favicon: './src/favicon.ico',
      template: './src/index.html',
    }),

    // Create global constants which can be configured at compile time
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
      'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
      'process.env.ENVIRONMENT': JSON.stringify(process.env.ENVIRONMENT),
      'process.env.LOG_LEVEL': JSON.stringify(process.env.LOG_LEVEL),
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    // Tell webpack what directories should be searched when resolving modules.
    modules: ['node_modules'],
  },
  module: {
    rules: [
      // load image, font
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      // load css file
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.m\.(sc|sa)ss$/,
        use: [
          // extract CSS into separate files
          nodeEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // load scss module file
      {
        test: /\.m\.(sc|sa)ss$/,
        use: [
          nodeEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:5]',
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // load javascript/react components
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
