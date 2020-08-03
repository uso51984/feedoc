# node 模块

## 包管理，版本锁定解释

## 搭建内部npm; 本地包开发 流程说明(npm link)
`https://github.com/verdaccio/verdaccio` 私有npm web项目

## node path 模块常用方法说明 join, resolve, dirname, relative

1. `join` : 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。

``` js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
```

2. `resolve` : 方法将路径或路径片段的序列解析为绝对路径。

给定的路径序列从右到左进行处理，每个后续的 path 前置，直到构造出一个绝对路径。 例如，给定的路径片段序列：/foo、 /bar、 baz，调用 path.resolve('/foo', '/bar', 'baz') 将返回 /bar/baz。
如果没有传入 `path` 片段，则 `path.resolve()` 将返回当前工作目录的绝对路径。

``` js
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

3. `dirname` : 返回 path 的目录名

``` js
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
```

4. `relative` : 当前工作目录返回 from 到 to 的相对路径

``` js
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// 返回: '../../impl/bbb'
```

## express框架的设计思想

## nodejs的eventEmitter的实现

## express的中间件系统是如何设计

