/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

// set the base url in case we want to deploy
// the assets in cdn instead of our local web server
// const baseUrl = process.env.CDN_BASE_URL;
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'scripts.[chunkhash].js',
    // publicPath: `${baseUrl}/`,
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    // Extract css from the bundle into a separate file.
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.[name].[hash].css',
      chunkFilename: 'styles.[id].[hash].css',
    }),
  ],
});
