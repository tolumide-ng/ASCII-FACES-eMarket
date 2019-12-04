const path = require('path');

module.exports = () => ({
  node: {
    fs: 'empty',
  },
  entry: { main: './src/index' },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss|sass)/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          'postcss-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|mp3|svg|ico)$/,
        use: {
          loader: 'file-loader',
          options: {},
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
  },
});
