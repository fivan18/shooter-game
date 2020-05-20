const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');// eslint-disable-line import/no-extraneous-dependencies import/no-unresolved
const HtmlWebpackPlugin = require('html-webpack-plugin');// eslint-desable-line import/no-unresolved

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
});