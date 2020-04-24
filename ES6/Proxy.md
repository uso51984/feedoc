# Proxy
## 概述
`Proxy` 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

`Proxy` 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。`Proxy` 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
```js
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
```
对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为

## ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
```js
var proxy = new Proxy(target, handler);
```
`Proxy `对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。其中，`new Proxy()`表示生成一个`Proxy`实例，
`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为。

## Proxy 支持的拦截操作一览，一共 13 种。
1. `get(target, propKey, receiver)`：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
2. `set(target, propKey, value, receiver)`：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
3. `has(target, propKey)`：拦截propKey in proxy的操作，返回一个布尔值。
4. `deleteProperty`(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
5. `ownKeys(target)`：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
7. `getOwnPropertyDescriptor(target, propKey)`：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
8. `defineProperty(target, propKey, propDesc)`：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
9. `preventExtensions(target)`：拦截Object.preventExtensions(proxy)，返回一个布尔值。
10. `getPrototypeOf(target)`：拦截Object.getPrototypeOf(proxy)，返回一个对象。
11. `isExtensible(target)`：拦截Object.isExtensible(proxy)，返回一个布尔值。
12. `setPrototypeOf(target, proto)`：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
13. `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
14. `construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。