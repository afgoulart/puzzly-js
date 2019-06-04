const package = require('./package.json')
const CopyPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const AssetsPluginConfig = new AssetsPlugin({
  filename: 'assets.json',
  fullPath: false,
  entrypoints: false,
  processOutput: function (assets) {
    console.log(assets);
    const keys = Object.keys(assets);
    const output = keys.reduce((acc, k) => {
      const ks = Object.keys(k);
      const o = ks.reduce((a, v) => {
        return a.concat(k[j])
      }, []);
      return acc.concat(o)
    }, [])
    return output
  }
})
const CopyPluginConfig = new CopyPlugin([
  'assets.json'
])

module.exports = {
  entry: './lib/app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "react-web-component-style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}