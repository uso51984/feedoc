<div class="title">redux 源码分析</div>


首先redux暴露的接口
```js
export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose
}
```
1. **createStore:** redux开始的入口，创建一个 `Redux store` 来以存放应用中所有的 `state。`
2. **combineReducers:** 把一个由多个不同 `reducer` 函数作为 `value` 的 `object`，合并成一个最终的 `reducer` 函数，然后就可以对这个 `reducer` 调用 `createStore` 方法。
3. **bindActionCreators:** 把一个 `value` 为不同 `action creator` 的对象，转成拥有同名 `key` 的对象。同时使用 `dispatch` 对每个 `action creator` 进行包装，以便可以直接调用它们。
4. **applyMiddleware:**使用包含自定义功能的 middleware 来扩展 Redux 是一种推荐的方式.
5. **compose:** 从右到左来组合多个函数。 这是函数式编程中的方法，为了方便，被放到了 Redux 里。

## 1. createStore
这是redux的入口函数， 在使用redux之前都会调用该函数创建一个store对象。
根据 createStore.js 代码结构可以看出使用的设计模式是`Revealing Module (揭示模块) 模式 `

```js
import isPlainObject from 'lodash/isPlainObject'
import $$observable from 'symbol-observable'

export const ActionTypes = {
  INIT: '@@redux/INIT'
}
export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = currentListeners = nextListeners
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }

  function observable() {
    const outerSubscribe = subscribe
    return {
      subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.')
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      }
    }
  }

  // 初始化state
  dispatch({ type: ActionTypes.INIT })
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}

```
### 1.1. createStore返回的store对象有哪些属性
```js
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
```
1. `dispatch`: 分发 `action`。这是触发 `state` 变化的惟一途径。
2. `subscribe`: 添加一个变化监听器。每当 `dispatch action` `的时候就会执行，state` 树中的一部分可能已经变化。你可以在回调函数里调用 `getState()` 来拿到当前 `state。`
3. `replaceReducer:` 替换 store 当前用来计算 state 的 reducer
4. `observable`： https://github.com/reduxjs/redux/issues/303#issuecomment-125184409

### 1.2. createStore function 参数分析
从以下代码可以看出`createStore`接受三个参数：
1. **reducer:** 必须是function类型
2. **preloadedState:** 如果是function类型等价于第三个参数enhancer
3. **enhancer:** 必须是function类型, 一个组合 `store creator` 的高阶函数，返回一个新的强化过的 `store creator`

定义了 5个私有变量
1. **currentReducer:** 存放reducer函数
2. **currentState:** 存放唯一的state函数
3. **currentListeners/nextListeners:** 存放变化监听器函数数组
4. **isDispatching:** 标记action是否发送成功

```js
export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    // 一个组合 `store creator` 的高阶函数，返回一个新的强化过的 `store creator`
    return enhancer(createStore)(reducer, preloadedState)
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false
```

### 1.3. getState
返回 当前的state
```js
  function getState() {
    return currentState
  }
```

### 1.4. subscribe
往nextListeners数组注册listener函数
```js
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }
```

### 1.5. dispatch
从整个createStore的代码可以看出以下结论
1. 调用dispatch函数是改变currentState的唯一途径
2. 所有的数据都是放到currentState上的
3. action必须是PlainObject
4. action的type属性必须有值
5. newState是调用currentReducer函数返回的，所以
6. 只要调用了dispatch函数都会执行currentListeners数组里面的所有监听函数
7. 单从dispatch函数看， 无论currentListeners函数返回任何数据都会更新currentState

```js
function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = currentListeners = nextListeners
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }
```

## 2. combineReducers
combineReducers是一个闭包函数： 它把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。
### 2.1. 各类异常参数检测函数
`getUndefinedStateErrorMessage`, `getUnexpectedStateShapeWarningMessage`, `assertReducerShape`

```js
function getUndefinedStateErrorMessage(key, action) {
  const actionType = action && action.type
  const actionName = (actionType && `"${actionType.toString()}"`) || 'an action'

  return (
    `Given action ${actionName}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  )
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  const reducerKeys = Object.keys(reducers)
  const argumentName = action && action.type === ActionTypes.INIT ?
    'preloadedState argument passed to createStore' :
    'previous state received by the reducer'

  if (reducerKeys.length === 0) {
    return (
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    )
  }

  if (!isPlainObject(inputState)) {
    return (
      `The ${argumentName} has unexpected type of "` +
      ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
      `". Expected argument to be an object with the following ` +
      `keys: "${reducerKeys.join('", "')}"`
    )
  }

  const unexpectedKeys = Object.keys(inputState).filter(key =>
    !reducers.hasOwnProperty(key) &&
    !unexpectedKeyCache[key]
  )

  unexpectedKeys.forEach(key => {
    unexpectedKeyCache[key] = true
  })

  if (unexpectedKeys.length > 0) {
    return (
      `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
      `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
    )
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(key => {
    const reducer = reducers[key]
    const initialState = reducer(undefined, { type: ActionTypes.INIT })

    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
        `If the state passed to the reducer is undefined, you must ` +
        `explicitly return the initial state. The initial state may ` +
        `not be undefined. If you don't want to set a value for this reducer, ` +
        `you can use null instead of undefined.`
      )
    }

    const type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.')
    if (typeof reducer(undefined, { type }) === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
        `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
        `namespace. They are considered private. Instead, you must return the ` +
        `current state for any unknown actions, unless it is undefined, ` +
        `in which case you must return the initial state, regardless of the ` +
        `action type. The initial state may not be undefined, but can be null.`
      )
    }
  })
}
```

### 2.2. combineReducers function
从代码可以看出`combineReducers` 传入一个`object`,并且定义了两个用于下一步的变量
1. **finalReducers:** 存放所有key为函数的object
2. **finalReducerKeys:** 存放所有key为函数的key的数组
3. **return combination 函数:** 看代码注释

```js
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)

  let unexpectedKeyCache
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }

  let shapeAssertionError
  try {
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }

    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache)
      if (warningMessage) {
        warning(warningMessage)
      }
    }


    let hasChanged = false // 声明state是否改变，默认为false
    const nextState = {} // 声明新state为空对象
    // 遍历有效的ReducerKeys
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i] // reducer 函数对应的key
      const reducer = finalReducers[key] // reducer函数
      const previousStateForKey = state[key] // 上一次的state
      const nextStateForKey = reducer(previousStateForKey, action) // 新的state
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey

      // 把上一次和新的state做引用比较判断是否有改变
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // 有改变返回新的state，没有改变返回上一次的state， 这就是为啥reduer里面必须返回新的一个对象的原因
    return hasChanged ? nextState : state
  }
}
```

## 3. bindActionCreators
把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象。同时使用 dispatch 对每个 action creator 进行包装，以便可以直接调用它们。
1. **actionCreators (Function or Object):** 一个 `action creator`，或者一个 value 是 `action creator` 的对象。
2. **dispatch (Function):** 一个由 `Store` 实例提供的 `dispatch` 函数。

```js
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}

export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
```

## 4. applyMiddleware
Middleware 可以让你包装 store 的 dispatch 方法
* **(arguments):** 每个 `middleware` 接受 `Store` 的 `dispatch` 和 `getState` 函数作为命名参数，并返回一个函数。该函数会被传入 被称为 `next` 的下一个 `middleware` 的 `dispatch` 方法，并返回一个接收 `action` 的新函数，这个函数可以直接调用` next(action)`，或者在其他需要的时刻调用，甚至根本不去调用它。调用链中最后一个 `middleware` 会接受真实的 `store` 的 `dispatch` 方法作为 `next` 参数，并借此结束调用链。所以，`middleware` 的函数签名是 `({ getState, dispatch }) => next => action。`
* **返回值:** `(Function)` 一个应用了 `middleware` 后的 `store enhancer`。这个 `store` `enhancer` 的签名是 `createStore => createStore`，但是最简单的使用方法就是直接作为最后一个 `enhancer` 参数传递给 `createStore()` 函数。

```js
import compose from './compose'
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    // 生成默认store
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))

    /*
    函数组合(compose)
    `compose`接受函数作为参数，从右向左执行，返回类型函数
    `fn()`全部参数传给最右边的函数，得到结果后传给倒数第二个，依次传递
    */
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

```
### 4.1. middleware example
```js
function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
}
```