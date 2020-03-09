# webpack

## webpack打包的原理

## webpack打包性能优化

让打包的速度更快，输出的资源更小。

1. 多线程打包与 `HappyPack` ；
1. 缩小打包作用域；
1. 动态链接库思想与 `DllPlugin` ；
1. 死代码检测与 `tree shaking` 。

### HappyPack

https://github.com/amireh/happypack

### 缩小打包作用域

#### 1.exclude和include:
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

### 动态链接库与DllPlugin
对于第三方模块或者一些不常变化的模块，可以将它们预先编译和打包，然后在项目实际构建过程中直接取用即可。当然，通过DllPlugin实际生成的还是JS文件而不是动态链接库，取这个名字只是由于方法类似罢了。

### tree shaking
ES6 Module依赖关系的构建是在代码编译时而非运行时。基于这项特性Webpack提供了tree shaking功能，它可以在打包过程中帮助我们检测工程中没有被引用过的模块，这部分代码将永远无法被执行到，因此也被称为“死代码”。Webpack会对这部分代码进行标记，并在资源压缩时将它们从最终的bundle中去掉。

### webpack的劣势在哪里

### webpack针对模块化做的处理

###