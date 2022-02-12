# 为什么使用webpack

TODO

# webpack

为现代 JavaScript 应用提供静态模块打包

-  打包：可以将不同类型资源按模块打包
- 静态：打包后最终产出静态资源
- 模块：支持不同规范的模块化开发（TODO 几种模块化开发规范）

# Webpack 上手

不使用配置文件时，运行 `npx webpack` 时的默认入口为 `src/index.js`

打包文件的默认输出路径为 `dist/main.js`

# 配置文件

默认的配置文件为 `webpack.config.js`

```js
let path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    // path: "./dist/main.js", // 错误的写法
    // 打包输出的文件路径必须是绝对路径才可以
    path: path.resolve(__dirname, "dist"),
  },
};
```

也可以使用自己的配置文件 打包的时候命令行添加命令:

```js
npx webpack --config dev.config.js
```

这行命令较长，我们可以在 package.json 中配置 scripts 脚本:

```js
"build": "webpack --config dev.config.js"
```

配置完成之后，再打包就可以使用如下命令：

```js
npm run build
```

# loader

执行顺序：先定义的后执行。先右后左，从下往上。

## 处理 css

- css-loader  会对 `@import` 和 `url()` 进行处理

  - 注意事项：通过 @import 引入的文件 不会被 postcss-loader 处理

  - 要使用 `importLoaders` 属性进行处理 

  - 配置在 `css-loader` 之前有多少 loader 应用于 `@import` 的资源

  - ```js
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
    ```

- style-loader 把 CSS 插入到 DOM 中

## 处理 less

- less 
- less-loader

## 处理图片

file-loader  将资源拷贝至指定的目录

url-loader  默认将图片转换为 base64 打包在文件当中，减少请求

url-loader 内部包含了 file-loader，何时将图片打包在文件当中，使用 `limit` 参数控制即可 

```js
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
      }
```



# browserslist 工作流程

平常项目中我们需要做兼容，但是具体兼容到哪些平台呢？就需要使用 browserslist

- `can i use` 网站提供了一些浏览器的市场占有率
- webpack 依赖安装时也会安装 browserslist 依赖。browserslist 中有一个 `caniuse-lite`，它会根据我们项目的配置，去网站请求出最终的需要兼容的平台

## 使用

在 package.json 中使用 （推荐）

```js
  "browserslist": [
    ">1%",
    "last 4 version"
  ]
```

运行 `npx browserslist ` 可以查看兼容的平台



使用单独的配置文件 .browserslistrc

```js
>1%
last 3 version
```

项目中使用的配置

```js
  "browserslist": [
    "iOS >= 5",
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```

# postcss

postcss 是一个通过 js 插件来转换 css 的工具。与上面的 browserslist 结合，就可以处理浏览器前缀等问题。

它只是一个工具，通过插件实现功能，autoprefixer 是其中的一个插件（自动补全浏览器前缀）

- 使用下一代 css 语法
- 自动补全浏览器前缀
- 自动将 px 转化为 rem
- css 代码压缩等

## 使用

在 webpack 配置文件中使用

```js
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
```

使用的 `postcss-preset-env` 。预设是几个插件的集合，比较常用的插件都已经集成进去了

使用单独的配置文件 postcss.config.js

```js
module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        // 其他选项
      },
    ],
  ],
};
```

此时 webpack 中只需要使用 postcss-loader 即可。

```js
["style-loader", "css-loader", "postcss-loader", "less-loader"],
```

需要安装的依赖：

`postcss-loader postcss postcss-preset-env  ` 

