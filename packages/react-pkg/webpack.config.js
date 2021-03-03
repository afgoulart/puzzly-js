const package = require('./package.json');
const CopyPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const output =
  process.env.NODE_ENV === 'production'
    ? { path: __dirname + '/dist', filename: 'bundle.js' }
    : { path: __dirname + '/public', filename: '[name].bundle.js' };

const hotreload =
  process.env.NODE_ENV === 'production'
    ? {}
    : {
        devServer: {
          inline: true,
          contentBase: './public',
          port: 3333,
        },
        devtool: 'inline-source-map',
      };

module.exports = {
  entry: __dirname + '/lib/app.tsx',
  output,
  mode: process.env.NODE_ENV !== 'development' ? 'production' : 'development',
  ...hotreload,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
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
