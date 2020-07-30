# 1. redux-react-hook源码分析
hook方式的React 绑定库。
## 1.1. 入口
export了4个变量. `StoreContext`、`useDispatch`、`useMappedState`、`create`
可以看出三个方法实例可以直接使用，也可以在引用库的是自己调用create生产
```js
import {create} from './create';

export const {StoreContext, useDispatch, useMappedState} = create();

export {create};
```
## 1.2. create file
这里我把ts部分删掉了， 主要看逻辑思路部分

```js
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// react 在server端渲染的时候使用useLayoutEffect会抛出警告，所以这里做了个判断
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

class MissingProviderError extends Error {
  constructor() {
    super(
      'redux-react-hook requires your Redux store to be passed through ' +
        'context via the <StoreContext.Provider>',
    );
  }
}

function memoizeSingleArg(fn) {
  let value;
  let prevArg;
  // state 有变化才重新更新value
  return (arg) => {
    if (prevArg !== arg) {
      prevArg = arg;
      value = fn(arg);
    }
    return value;
  };
}

// 引用比较
function referenceEqual(a, b) {
  return a === b;
}

// defaultEqualityCheck 新旧state是否相等的比较规则，默认是应用比较
export function create({ defaultEqualityCheck = referenceEqual, }){
  // 创建一个context用于获取redux生产的store
  const StoreContext = createContext(null);

  // 定义useMappedState hook
  function useMappedState( mapState, equalityCheck = defaultEqualityCheck, ) {
    // 获取从context获取store,由此可知，react的父组件毕然需要用<StoreContext.Provider value={store}>
    const store = useContext(StoreContext);
    // 如果stroe为空，则抛出错误
    if (!store) {
      throw new MissingProviderError();
    }

    // We don't keep the derived state but call mapState on every render with current state.
    // This approach guarantees that useMappedState returns up-to-date derived state.
    // Since mapState can be expensive and must be a pure function of state we memoize it.

    const memoizedMapState = useMemo(() => memoizeSingleArg(mapState), [
      mapState,
    ]);

    const state = store.getState();
    // 获取需要的state数据
    const derivedState = memoizedMapState(state);

    // 当dispatch action state改变时需要触发 render
    const [, forceUpdate] = useState(0);

    // Keep previously commited derived state in a ref. Compare it to the new
    // one when an action is dispatched and call forceUpdate if they are different.
    const lastStateRef = useRef(derivedState);

    const memoizedMapStateRef = useRef(memoizedMapState);

    // We use useLayoutEffect to render once if we have multiple useMappedState.
    // We need to update lastStateRef synchronously after rendering component,
    // With useEffect we would have:
    // 1) dispatch action
    // 2) call subscription cb in useMappedState1, call forceUpdate
    // 3) rerender component
    // 4) call useMappedState1 and useMappedState2 code
    // 5) calc new derivedState in useMappedState2, schedule updating lastStateRef, return new state, render component
    // 6) call subscription cb in useMappedState2, check if lastStateRef !== newDerivedState, call forceUpdate, rerender.
    // 7) update lastStateRef - it's too late, we already made one unnecessary render
    useIsomorphicLayoutEffect(() => {
      lastStateRef.current = derivedState;
      memoizedMapStateRef.current = memoizedMapState;
    });

    useIsomorphicLayoutEffect(() => {
      let didUnsubscribe = false;

      // Run the mapState callback and if the result has changed, make the
      // component re-render with the new state.
      const checkForUpdates = () => {
        if (didUnsubscribe) {
          // Don't run stale listeners.
          // Redux doesn't guarantee unsubscriptions happen until next dispatch.
          return;
        }

        const newDerivedState = memoizedMapStateRef.current(store.getState());

        if (!equalityCheck(newDerivedState, lastStateRef.current)) {
          forceUpdate(increment);
        }
      };

      // 第一次render的时候获取state。
      checkForUpdates();

      // 订阅redux dispatch action state更新后调用checkForUpdates
      const unsubscribe = store.subscribe(checkForUpdates);

      // The return value of useEffect will be called when unmounting, so
      // we use it to unsubscribe from the store.
      return () => {
        didUnsubscribe = true;
        unsubscribe();
      };
    }, [store]);

    return derivedState;
  }

  // 暴露store.dispatch
  function useDispatch() {
    const store = useContext(StoreContext);
    if (!store) {
      throw new MissingProviderError();
    }
    return store.dispatch;
  }

  return {
    StoreContext,
    useDispatch,
    useMappedState,
  };
}

function increment(x) {
  return x + 1;
}

```