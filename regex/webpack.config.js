module.exports = {
  context: __dirname + '/src',
  entry: './main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  }
};
