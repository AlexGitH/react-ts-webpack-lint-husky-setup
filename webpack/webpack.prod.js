const webpack = require('webpack');

module.exports = {
  mode: 'production', // set  process.env.NODE_ENV to development
  devtool: 'source-map',
  plugins: [
    // new variable in environment
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('My Prod'),
      'process.env.TEMP': JSON.stringify(process.env.TEMP)
    })
  ]
}
