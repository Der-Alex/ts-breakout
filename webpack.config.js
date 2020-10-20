const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const sourceFolder = path.join(__dirname, 'src');
const distFolder = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: [
    './src/main.ts',
    './src/styles/main.scss',
  ],
  output: {
    filename: 'index.js',
    path: distFolder,
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.css'],
    plugins: [new TsconfigPathsPlugin()],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
  },
  module: {
    rules:  [
      {
        test: /\.ts?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true,
    inline: true,
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};