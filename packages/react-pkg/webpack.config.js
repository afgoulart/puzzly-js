const package = require('./package.json');
const CopyPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const output =
  process.env.NODE_ENV === 'production'
    ? {
        filename: 'bundle.js',
      }
    : {
        path: __dirname + '/public',
        filename: 'bundle.js',
      };

const hotreload =
  process.env.NODE_ENV === 'production'
    ? {}
    : {
        devServer: {
          inline: true,
          contentBase: './public',
          port: 3333,
        },
      };

module.exports = {
  entry: __dirname + '/lib/app.js',
  output,
  mode: process.env.NODE_ENV || 'development',
  ...hotreload,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'react-web-component-style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
};
