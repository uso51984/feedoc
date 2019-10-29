# redux 部分
## 中间价(middleware)
它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。

Middleware 接收了一个 next() 的 dispatch 函数，并返回一个 dispatch 函数，返回的函数会被作为下一个 middleware 的 next()，以此类推。由于 store 中类似 getState() 的方法依旧非常有用，我们将 store 作为顶层的参数，使得它可以在所有 middleware 中被使用。
#### redux-thunk
```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```

## redux三大原则
1. 单一数据源：整个应用的 `state` 被储存在一棵 `object tree` 中，并且这个 `object tree` 只存在于唯一一个 `store` 中。
2. `State` 是只读的：唯一改变 `state` 的方法就是触发 `action`，`action` 是一个用于描述已发生事件的普通对象。
3. 使用纯函数来执行修改：`reducers`描述 `action` 如何改变 `state tree`
## redux如何处理异步

## 在 reducer 中必须对 state 进行深拷贝吗？拷贝 state 不会很慢吗？
以不可变的方式更新 state 意味着浅拷贝，而非深拷贝。相比于深拷贝，浅拷贝更快，因为只需复制很少的字段和对象，实际的底层实现中也只是移动了若干指针而已。

并且，深拷贝 state 会为每一个层（field）创建新的引用。由于 React-Redux 的 connect 函数是比较引用来判断数据是否变化的，这意味着即使其他数据没有变化，UI 组件也会被迫进行不必要的重新渲染。

因此，你需要创建一个副本，并且更新受影响的各个嵌套的对象层级即可。尽管上述动作代价不会很大，但这也是为什么需要维护范式化及扁平化 state 的又一充分理由。

## 为什么 Redux 需要不变性？
### `Redux` 和 `React-Redux` 都使用了浅比较。具体来说：
* `Redux` 的 `combineReducers` 方法 浅比较 它调用的 `reducer` 的引用是否发生变化。
* `React-Redux` 的 `connect` 方法生成的组件通过 浅比较根 `state` 的引用变化 与 `mapStateToProps` 函数的返回值，来判断包装的组件是否需要重新渲染。 以上浅比较需要不变性才能正常工作
* 不可变数据的管理极大地提升了数据处理的安全性。
* 进行时间旅行调试要求 r`educer` 是一个没有副作用的纯函数，以此在不同 `state` 之间正确的移动。

## Redux 是如何使用浅比较的？
Redux 在 `combineReducers` 函数中使用浅比较来检查根 `state` 对象（`root state object`）是否发生变化，有修改时，返回经过修改的根 `state` 对象的拷贝，没有修改时，返回当前的根 `state` 对象。

### combineReducers 是如何进行浅比较的？
Redux 中 store 推荐的结构 是将 state 对象按键值切分成 “层”（slice） 或者 “域”（domain），并提供独立的 reducer 方法管理各自的数据层。

combineReducers 接受 reducers 参数简化了该模型。reducers 参数是一组键值对组成的哈希表，其中键是每个数据层的名字，而相应的值是响应该数据层的 reducer 函数。

举例说明，如果你的 state 结构是 { todos, counter }，调用 combineReducers 即：
```js
combineReducers({ todos: myTodosReducer, counter: myCounterReducer })
```
其中：

todos 和 counter 两个键各自是不同的 state 层。
myTodosReducer 和 myCounterReducer 两个值是 reducer 函数，各自负责处理它们的键所对应的 state 层。
combineReducers 遍历所有这些键值对，对于每一次循环：

为每一个键代表的当前 state 层创建一个引用；
调用相应的 reducer 并把该数据层传递给它
为 reducer 返回的可能发生了变化的 state 层创建一个引用。

特别来说，在循环的每一阶段，combineReducers 会浅比较当前 state 层与 reducer 返回的 state 层。如果 reducer 返回了新的对象，它们就不是浅相等的，而且 combineReducers 会把 hasChanged 设置为 true。

循环结束后，combineReducers 会检查 hasChanged 的值，如果为 true，就会返回新构建的 state 对象。如果为 false，就会返回当前state 对象。

需要强调的一点是：如果所有 reducer 返回的 state 对象都与传入时一致，那么 combineReducers 将返回当前的根 state 对象，而不是新构建的。

## React-Redux 是如何使用浅比较的？
React-Redux 使用浅比较来决定它包装的组件是否需要重新渲染。

首先 React-Redux 假设包装的组件是一个“纯”（pure）组件，即给定相同的 props 和 state，这个组件会返回相同的结果。

做出这样的假设后，React-Redux 就只需检查根 state 对象或 mapStateToProps 的返回值是否改变。如果没变，包装的组件就无需重新渲染。

为了检测改变是否发生，React-Redux 会保留一个对根 state 对象的引用，还会保留 mapStateToProps 返回的 props 对象的每个值的引用。

最后 React-Redux 会对根 state 对象的引用与传递给它的 state 对象进行浅比较，还会对每个 props 对象的每个值的引用与 mapStateToProps 返回的那些值进行一系列浅比较。

## React-Redux 是如何使用浅比较来决定组件是否需要重新渲染的？

每次调用 React-Redux 提供的 connect 函数时，它储存的根 state 对象的引用，与当前传递给 store 的根 state 对象之间，会进行浅比较。如果相等，说明根 state 对象没有变化，也就无需重新渲染组件，甚至无需调用 mapStateToProps。

如果发现其不相等，说明根 state 对象已经被更新了，这时 connect 会调用 mapStateToProps 来查看传给包装的组件的 props 是否被更新。

它会对该对象的每一个值各自进行浅比较，如果发现其中有不相等的才会触发重新渲染。

在下例中，调用 connect 后，如果 state.todos 以及 getVisibleTodos() 的返回值没有改变，组件就不会重新渲染。
```js
function mapStateToProps(state) {
  return {
    todos: state.todos, // prop value
    visibleTodos: getVisibleTodos(state) // selector
  }
}
```

export default connect(mapStateToProps)(TodoApp)
与之相反，在下例中，组件总是重新渲染，因为不管 todos 的值有没有改变，todos 本身总是一个新的对象。
```js
// AVOID - will always cause a re-render
function mapStateToProps(state) {
  return {
    // todos always references a newly-created object
    todos: {
      all: state.todos,
      visibleTodos: getVisibleTodos(state)
    }
  }
}

export default connect(mapStateToProps)(TodoApp)
```
mapStateToProps 返回的新值，与 React-Redux 保留的旧值的引用如果不是浅层相等的，组件就会被重新渲染。