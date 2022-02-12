let path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    // path: "./dist/main.js", // 错误的写法
    // 打包输出的文件路径必须是绝对路径才可以
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 原名称.hash 6位.原后缀
              name: "[name].[hash:6].[ext]",
              // 小于 10k 的会被转换为 base64
              limit: 10 * 1024,
            },
          },
        ],
      },
    ],
  },
};
