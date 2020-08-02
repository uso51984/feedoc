# webpack

## webpack简介
`webpack` 是一个 模块打包工具，可以使用 `webpack` 管理模块依赖，并编译输出模块们所需的静态文件。它能 很好地管理、打包 Web 开发中所用到的 `HTML、JS、CSS` 以及各种静态文件（图片、字体等），让开发过程更加高效。对于不同类型的资源， `webpack` 有对应的模块加载器。 `webpack` 模块打包器会分析模块间的依赖关系，最后生成了优化且合并后的静态资源。
特点：

对 `CommonJS、AMD、ES6` 的语法做了兼容对 `js、css`、图片等资源文件都支持打包串联模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如对 `ES6` 的支持可以将代码切割成不同的 chunk，实现按需加载，降低了初始化时间支持 `sourcemap`，易于调试具有强大的 plugin 接口，大多是内部插件，使用起来比较灵活

### 特点：

1. 对`CommonJS`、`AMD`、`ES6` 的语法做了兼容对
2. js、css、图片等资源文件都支持打包
3. 串联模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如对 `ES6` 的支持
4. 可以将代码切割成不同的 `chunk`，实现按需加载，降低了初始化时间支持
5. `sourcemap`，易于调试具有
6. 强大的 `plugin` 接口，大多是内部插件，使用起来比较灵活

## webpack 有什么优劣势

`gulp` 是基于任务和流`（Task、Stream`）的，找到一个（或一类）文件，对齐做一些列链式操作，更新流上的数据，整条链式操作构成了一个任务，多个任务就构成了整个 web 的构建流程
`rollup` 与 `webpack` 类似，但专注于 ES6 的模块打包。它最大的亮点是利用 ES6 模块设计，生成更简洁、更简单的代码。
webpack 是模块化管理工具和打包工具，它是基于入口的。 `webpack` 会自动递归解析入口所需要加载的所有资源文件，然后用不同 `Loader` 来处理不同的文件，用 `Plugin` 来扩展 `webpack` 功能。
虽然现在 `webpack` 相对比较主流，但一些轻量化的任务还是会用 `gulp` 来处理，比如单独打包 CSS 文件；另外一些类库的代码使用 `rollup` 打包。

## 那你再说一说 Loader 和 Plugin 的区别？
### 从功能角度区分：
1. Loader 用于加载待打包的资源，Plugin 用于扩展 webpack 功能。
2. Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果，主要用于加载某些资源文件。因为 webpack 只认识 js，这就需要对应的 loader 将资源转化，加载进来。
3. Plugin 用于扩展 webpack 的功能（loader 也是扩展功能，但只专注于转化文件这一领域），在 webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。
### 从运行时机角度区分：
1. loader 为在模块加载时的预处理文件
2. Plugin 在整个编译周期都起作用。


## webpack 如何解析代码路径的
webpack 依赖 `enhanced-resolve` 来解析代码模块的路径，这个模块像 Node.js 那一套模块路径解析的增强版本，有很多可以自定义的解析配置。
### 模块解析规则分三种：
#### 解析相对路径

查找相对当前模块的路径下是否有对应文件或文件夹，是文件则直接加载如果是文件夹则找到对应文件夹下是否有 package.json 文件有的话就按照文件中的 main 字段的文件名来查找文件没有 package.json 或 main，则查找 index.js 文件
#### 解析绝对路径
直接查找对应路径的文件，不建议使用，因为不同的机器用绝对路径会找不到
#### 解析模块名
查找当前文件目录，父级直至根目录下的 node_modules 文件夹，看是否有对应名称的模块
> 另外：通过设置 `resolve.alias` 、 `resolve.extensions` 、 `resolve.modules` 、 `resolve.mainFields` 、 `resolve.resolveLoader` 等选项来优化路径查找速度。


## webpack打包的原理
webpack 根据 `webpack.config.js` 中的入口文件，在入口文件里识别模块依赖，不管这里的模块依赖是用 CommonJS 写的，还是 `ES6 Module` 规范写的，webpack 会自动进行分析，并通过转换、编译代码，打包成最终的文件。最终文件中的模块实现是基于 webpack 自己实现的 webpack_require（es5 代码），所以打包后的文件可以跑在浏览器上。
同时以上意味着在 webapck 环境下，你可以只使用 ES6 模块语法书写代码（通常我们都是这么做的），也可以使用 CommonJS 模块语法，甚至可以两者混合使用。因为从 webpack2 开始，内置了对 ES6、CommonJS、AMD 模块化语句的支持，webpack 会对各种模块进行语法分析，并做转换编译。
另外，针对异步模块：webpack 实现模块的异步加载有点像 jsonp 的流程。
遇到异步模块时，使用__webpack_require__.e函数去把异步代码加载进来。该函数会在 html 的 head 中动态增加 script 标签，src 指向指定的异步模块存放的文件。
加载的异步模块文件会执行`webpackJsonpCallback`函数，把异步模块加载到主文件中。
所以后续可以像同步模块一样,直接使用`__webpack_require__("./src/async.js")`加载异步模块。

## 文件监听原理呢？
在发现源码发生变化时，自动重新构建出新的输出文件。
缺点：每次需要手动刷新浏览器
原理：轮询判断文件的最后编辑时间是否变化，初次构建时把文件的修改时间储存起来，下次有修改时会和上次修改时间比对，发现不一致的时候，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后，把变化列表一起构建，并生成到 bundle 文件夹。
```js
module.export = {
  // 默认 false，也就是不开启
  watch: true,
  watchOptions: {
    // 默认为空，不监听的文件夹或者文件，支持正则匹配
    ignore: /node_modules/,
    // 监听到变化发生后会等 300ms 再去执行，默认 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒询问 1000 次
    poll: 1000,
  },
};
```
## 说一下 webpack 的热更新原理吧
`Webpack` 的热更新又称为热替换（Hot Module Replacement），缩写为 HMR。这个机制可以做到不用刷新浏览器而将变更的模块替换掉旧的模块。
相对于手动刷新页面，HMR 的优点在于可以保存应用的状态，提高开发效率。

`webpack` 构建的项目，分为 `server` 端和 `client` 端（也就是浏览器），项目启动时，双方会保持一个 `socket` 连接，用于通话。
当本地资源发生变化时，`server` 向浏览器发送新资源的 `hash` 值，浏览器调用 `reloadApp` 方法，检查是否有变化，有差异是会向 `server` 发起 `Ajax`获取更改内容（文件列表、hash），这样浏览器继续借助这些信息向 `server` 端发起请求，通过 `jsonp` 的方式获取 `chunk` 的增量更新。

后续的部分（拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？）由 `HotModulePlugin` 来完成，提供了相关 `API` 以供开发者针对自身场景进行处理，像 `react-hot-loader` 和 `vue-loader` 都是借助这些 API 实现 `HMR。`

## 文件指纹是什么？怎么用？
文件指纹是打包后输出的文件名的后缀。

1. **Hash：**和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
2. **Chunkhash：** 和 Webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash
3. **Contenthash：**根据文件内容来定义 hash，文件内容不变，则 contenthash 不变。

### js 的文件指纹设置：设置 output 的 filename，用 chunkhash
```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name][chunkhash:8].js',
    path: __dirname + '/dist',
  },
};
```
### css 的文件指纹设置：

设置 `MiniCssExtractPlugin` 的 filename，使用 `contenthash`设置 `ExtractTextPlugin` 的 filename
```js
module.exports = {
  // ...
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][contenthash:8].css',
    })
    new ExtractTextPlugin('[name][contenthash].css'),
  ]
}
```

### 图片的文件指纹设置
设置 `file-loader` 或 `url-loader` 的 name， 使用 hash。

## 代码分割的本质是什么？有什么意义？你是如何拆分的？
代码分割的本质其实是在 源代码直接上线 和 打包成唯一脚本 main.bundle.js 这两种极端方案之间的一种更适合实际场景的中间状态。
用可接受的服务器性能压力增加来换取更好的用户体验。
源代码直接上线：虽然过程可控，但是 http 请求多，性能开销大。

### 打包成唯一脚本：
1. 服务器压力小，但是页面空白期长，用户体验不好
2. 大体积文件会增加编译时间，影响开发效率
3. 多页应用，独立访问单个页面时，需要下载大量不相干的资源

### 代码分割（`splitChunk`）的意义：
1. 复用的代码抽离到公共模块中，解决代码冗余
2. 公共模块再按照使用的页面多少（或其他思虑）进一步拆分，用来减小文件体积，顺便优化首屏加载速度

### 拆分原则：
如何拆分因项目而异，普遍适应的拆分原则：
1. 业务代码和第三方库分离打包，实现代码分割
2. 业务代码中的公共业务模块提取打包到一个模块
3. 首屏相关模块单独打包

## webpack 构建流程简单说一下
Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出改模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk， 再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，Webpack 会在特定的事件点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
简单地说：

1. 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
2. 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
3. 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中


## webpack打包性能优化

让打包的速度更快，输出的资源更小。

1. 多线程打包与 `HappyPack` ；
1. 缩小打包作用域；
1. 动态链接库思想与 `DllPlugin` ；
1. 死代码检测与 `tree shaking` 。

### HappyPack

https://github.com/amireh/happypack

### 缩小打包作用域

#### 1.exclude和include(优化 Loader 的文件搜索范围):
配置loader的时对于JS来说，一般要把node_modules目录排除掉，另外当exclude和include规则有重叠的部分时，exclude的优先级更高。

#### 2.noParse

有些库我们是希望Webpack完全不要去进行解析的，即不希望应用任何loader规则，库的内部也不会有对其他模块的依赖，那么这时可以使用noParse对其进行忽略。

``` js
module.exports = { //...
    module: {
        noParse: /lodash/,
    }
};
```

#### 3. IgnorePlugin
它可以完全排除一些模块，被排除的模块即便被引用了也不会被打包进资源文件中。
```js
plugins: [
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/, // 匹配资源文件
     contextRegExp: /moment$/, // 匹配检索目录
  })
],
```

#### 4. Cache
有些loader会有一个cache配置项，用来在编译代码后同时保存一份缓存，在执行下一次编译前会先检查源码文件是否有变化，如果没有就直接采用缓存

#### 5. resolve.extensions：用来表明文件后缀列表，默认查找顺序是 ['.js', '.json']，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
#### 6. resolve.alias：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
#### 7. module.noParse：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助

### 动态链接库与DllPlugin
对于第三方模块或者一些不常变化的模块，可以将它们预先编译和打包，然后在项目实际构建过程中直接取用即可。当然，通过DllPlugin实际生成的还是JS文件而不是动态链接库，取这个名字只是由于方法类似罢了。



### tree shaking
ES6 Module依赖关系的构建是在代码编译时而非运行时。基于这项特性Webpack提供了tree shaking功能，它可以在打包过程中帮助我们检测工程中没有被引用过的模块，这部分代码将永远无法被执行到，因此也被称为“死代码”。Webpack会对这部分代码进行标记，并在资源压缩时将它们从最终的bundle中去掉。


### webpack的劣势在哪里

### webpack针对模块化做的处理

### webpack中loaders作用？plugins和loaders区别？是否写过webpack插件？

## prerender-spa-plugin

## babel 原理