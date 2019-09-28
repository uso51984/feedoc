# react 篇

## react的setState是同步还是异步的

答： setState在react自身合成事件和生命周期函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。

异步的时候可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

React合成事件和原生事件区别
React合成事件一套机制：React并不是将click事件直接绑定在dom上面，而是采用事件冒泡的形式冒泡到document上面，然后React将事件封装给正式的函数处理运行和处理

## react的生命周期
答： 总体分为三个主要阶段：挂载阶段、 更新阶段、卸载阶段，16.3版本之前与之后版本有所不同
16.3版本之前：

挂载阶段依次：constructor, componentWillMount, render, componentDidMount

更新阶段：componentWillReceiveProps,
shouldComponentUpdate,
componentWillUpdate,
render,
componentDidUpdate,

卸载阶段： componentWillUnmount

16.3版本及之后：
挂载： constructor()
static getDerivedStateFromProps()
render()
componentDidMount()

更新： static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()

卸载： componentWillUnmount()


## HOC

## 受控组件or非受控组件

## 单页测试jest

## 怎么避免props一级一级传递

## github资料
https://github.com/semlinker/reactjs-interview-questions