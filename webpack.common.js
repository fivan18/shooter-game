module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      },
      {
        test: /\.(mp3|wav)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "sounds"
          }
        }
      },
    ],
  },
};