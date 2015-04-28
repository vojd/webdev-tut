var path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname,
    filename: './bundle.js' // Let gulpfile define the output dir
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};