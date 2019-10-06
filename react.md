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

## HOC 有哪些限制?
除了它的好处之外，高阶组件还有一些注意事项。 以下列出的几个注意事项:

不要在渲染方法中使用HOC： 建议不要将 HOC 应用于组件的 render 方法中的组件。
```jsx
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```
上述代码通过重新装载，将导致该组件及其所有子组件状态丢失，会影响到性能。正确的做法应该是在组件定义之外应用 HOC ，以便仅生成一次生成的组件

静态方法必须复制： 将 HOC 应用于组件时，新组件不具有原始组件的任何静态方法
```jsx
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true
```
您可以通过在返回之前将方法复制到输入组件上来解决此问题
```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```
Refs 不会被往下传递 对于HOC，您需要将所有属性传递给包装组件，但这对于 refs 不起作用。这是因为 ref 并不是一个类似于 key 的属性。在这种情况下，您需要使用 React.forwardRef API。

## 受控组件or非受控组件

## 单页测试jest

## 怎么避免props一级一级传递

## 什么是 windowing 技术?
Windowing 是一种技术，它在任何给定时间只呈现一小部分行，并且可以显著减少重新呈现组件所需的时间以及创建的 DOM 节点的数量。如果应用程序呈现长的数据列表，则建议使用此技术。react-window 和 react-virtualized 都是常用的 windowing 库，它提供了几个可重用的组件，用于显示列表、网格和表格数据。

## github资料
https://github.com/semlinker/reactjs-interview-questions