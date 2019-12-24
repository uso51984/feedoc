# react 篇

## react的setState是同步还是异步的

答： `setState` 在 `react` 自身合成事件和生命周期函数中是“异步”的，在原生事件和 `setTimeout` 中都是同步的。

异步的时候可以通过第二个参数 `setState(partialState, callback)` 中的 `callback` 拿到更新后的结果。

如果是同时 `setState` 多个不同的值，在更新时会对其进行合并批量更新。

`React` 合成事件和原生事件区别
`React` 合成事件一套机制： `React` 并不是将 `click` 事件直接绑定在dom上面，而是采用事件冒泡的形式冒泡到 `document` 上面，然后 `React` 将事件封装给正式的函数处理运行和处理

## react合成事件的目的

* 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力
* 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。

## react的生命周期

答： 总体分为三个主要阶段：挂载阶段、 更新阶段、卸载阶段，16.3版本之前与之后版本有所不同
16.3版本之前：

挂载阶段依次： `constructor, componentWillMount, render, componentDidMount`

更新阶段： `componentWillReceiveProps` ,
`shouldComponentUpdate` ,
`componentWillUpdate` ,
`render` ,
`componentDidUpdate` ,

卸载阶段： `componentWillUnmount`

16.3版本及之后：
挂载： `constructor()`
`static getDerivedStateFromProps()`
`render()`
`componentDidMount()`

更新： `static getDerivedStateFromProps()`
`shouldComponentUpdate()`
`render()`
`getSnapshotBeforeUpdate()`
`componentDidUpdate()`

卸载： `componentWillUnmount()`

## HOC

高阶组件是参数为组件，返回值为新组件的函数。
HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

## HOC 有哪些限制?

除了它的好处之外，高阶组件还有一些注意事项。 以下列出的几个注意事项:

1. 不要在渲染方法中使用HOC： 建议不要将 HOC 应用于组件的 render 方法中的组件。

``` jsx
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```

上述代码通过重新装载，将导致该组件及其所有子组件状态丢失，会影响到性能。正确的做法应该是在组件定义之外应用 HOC ，以便仅生成一次生成的组件

2. 静态方法必须复制： 将 HOC 应用于组件时，新组件不具有原始组件的任何静态方法

``` jsx
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

您可以通过在返回之前将方法复制到输入组件上来解决此问题

``` js
function enhance(WrappedComponent) {
    class Enhance extends React.Component {
        /*...*/
    }
    // Must know exactly which method(s) to copy :(
    Enhance.staticMethod = WrappedComponent.staticMethod;
    return Enhance;
}
```

3. Refs 不会被往下传递 对于HOC，您需要将所有属性传递给包装组件，但这对于 refs 不起作用。这是因为 ref 并不是一个类似于 key 的属性。在这种情况下，您需要使用 React.forwardRef API。

## 受控组件or非受控组件

受控组件: 表单数据是由 React 组件来管理的只能通过使用 setState()来更新。
非受控组件: 这时表单数据将交由 DOM 节点来处理

## 单页测试jest

## 怎么避免props一级一级传递
Context
状态管理器 redux  mobox

## 什么是 windowing 技术?

Windowing 是一种技术，它在任何给定时间只呈现一小部分行，并且可以显著减少重新呈现组件所需的时间以及创建的 DOM 节点的数量。如果应用程序呈现长的数据列表，则建议使用此技术。react-window 和 react-virtualized 都是常用的 windowing 库，它提供了几个可重用的组件，用于显示列表、网格和表格数据。

## github资料

https://github.com/semlinker/reactjs-interview-questions

