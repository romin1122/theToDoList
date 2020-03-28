const path = require('path');

module.exports = {
  //entry: './src/index.js',
  entry: '../storage/downloads/programming/odin_on_rails/webpack/index.js',
  output: {
    filename: 'main.js',
    //path: path.resolve(__dirname, 'dist'),
    path: path.resolve(__dirname,"../storage/downloads/programming/odin_on_rails/webpack"),
  },
};
