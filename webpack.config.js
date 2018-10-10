const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'develop',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve('./dev.tsx')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve('dist', 'index.html'),
      template: path.resolve(__dirname, './index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|mp4)$/,
        use: {
          loader: 'url-loader',
          query: {}
        }
      },
      {
        test: /\.woff|\.woff2|\.eot|\.ttf/,
        use: {
          loader: 'url-loader',
          query: {}
        }
      }
    ]
  }
};
