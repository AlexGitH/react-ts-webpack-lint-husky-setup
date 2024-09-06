const webpack = require('webpack');

module.exports = {
  mode: 'development', // set  process.env.NODE_ENV to development
  devtool: 'cheap-module-source-map',
  plugins: [
    // new variable in environment
    new webpack.DefinePlugin({
      // must be JSON.stringify to process string properly
      'process.env.name': JSON.stringify('My Dev'),
      'process.env.TEMP': JSON.stringify(process.env.TEMP)
    })
  ]
}
