const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NG_APP_API_URL: JSON.stringify(process.env.NG_APP_API_URL),
      }
    })
  ]
};
