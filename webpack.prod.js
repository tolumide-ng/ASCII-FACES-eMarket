const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

// const PATHS = {
//   src: path.join(__dirname, 'public'),
// };

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: './index.css',
      chunkFilename: '[id].css',
    }),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.public}/*`),
    // }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin(),
      // new HtmlWebpackPlugin({
      //   template: './public/index.html',
      //   minify: {
      //     removeAttributeQuotes: true,
      //     collapseWhitespace: true,
      //     removeComments: true,
      //   },
      // }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          'postcss-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
});
