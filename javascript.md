# js篇

## 作用域， 作用域链
### 1.作用域：
代码的执行环境，全局执行环境就是全局作用域，函数的执行环境就是私有作用域，它们都是栈内存
* 私有作用域 ----> 函数执行都会形成一个私有作用域
* 全局作用域 ----> 页面一打开就会形成一个全局的作用域

### 2.作用域链
代码在一个环境中执行时，会创建变量对象的一个作用域链（作用域形成的链条）
* 作用域链的前端，始终都是当前执行的代码所在环境的变量对象
* 作用域链中的下一个对象来自于外部环境，而在下一个变量对象则来自下一个外部环境，一直到全局执行环境
* 全局执行环境的变量对象始终都是作用域链上的最后一个对象

ES5 只有全局作用域和函数作用域，没有块级作用域，es6 块级作用域

## 箭头函数与普通函数的不同点
* 1.函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

* 2.不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

* 3.不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

* 4.不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

## prototype 属性的作用
原型对象的所有属性和方法，都能被实例对象共享。也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享. 好处，1. 节省了内存 2. 体现了实例对象之间的联系。
> 每个函数都有一个`prototype`属性，指向一个对象。对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型

```js
function f() {}
typeof f.prototype // "object"

function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'
```

## constructor 属性
### 1.简述
`prototype对象`有一个`constructor`属性，默认指向`prototype对象`所在的`构造函数`。
```js
function P() {}
P.prototype.constructor === P // true
```
constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承。
```js
function P() {}
var p = new P();

p.constructor === P // true
p.constructor === P.prototype.constructor // true
p.hasOwnProperty('constructor') // false
```
### 2. 作用
#### (1). 可以得知某个实例对象，到底是哪一个构造函数产生的。
```js
function F() {};
var f = new F();

f.constructor === F // true
f.constructor === RegExp // false
```
#### (2). 可以从一个实例对象新建另一个实例。
```js
function Constr() {}
var x = new Constr();

var y = new x.constructor();
y instanceof Constr // true
```
> instanceof: 运算符返回一个布尔值，表示对象是否为某个构造函数的实例。

## 原型、原型链
对象都有自己的原型对象(`prototype`)。任何一个对象，都可以充当其他对象的原型，而原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（`prototype chain`）：对象到原型，再到原型的原型，如果一层层地上溯，所有对象的原型最终都可以上溯到`Object.prototype`，即`Object`构造函数的`prototype`属性。也就是说，所有对象都继承了`Object.prototype`的属性。这就是所有对象都有`valueOf和toString`方法的原因，因为这是从`Object.prototype`继承的。`Object.prototype`的原型是`null`
> `Object.getPrototypeOf`方法返回参数对象的原型

## this
### 1.this简述
`this` 在构造函数之中，表示实例对象. this就是属性或方法“当前”所在的对象
```js
this.property
```
> this就代表property属性当前所在的对象。

```js
var person = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};
```
> this就代表person所在的对象。

### 2.辨别函数内部this的指向
#### (1). 非严格模式: 根据调用环境上下文确定
```html
<html lang="en">
<body>
  <p>hello word</p>
</body>
<script type="text/javascript">
    function getName(){
        console.log('this', this);
    }

    getName() // window

    const a = {
                name: 'xxx'
        getName
    }
    a.b() // object a
</script>
</html>
```
#### (2). 严格模式: 在严格模式下，未指定环境对象而调用函数，则this值不会转型为window。除非明确把函数添加到某个对象或者调用apply(),call(), bind，否则this值将是undefined。
```html
<!DOCTYPE html>
<html lang="en">
<body>
  <p>hello word</p>
</body>
<script type="text/javascript">
    'use strict'
    // 验证第一条剪头函数this指向
    const getName = () => { console.log(this) }
    getName() // window

    function getAge(){
        console.log('this', this);
    }
    getAge() // undefined
    const obj = {
                name: 'xxx',
                age: 32,
                getAge,
                getName
               }
    obj.getAge() // object a
    obj.getName() // window
</script>
</html>
```
#### (3). apply(), call(), bind 指定

## new 命令的原理
1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的prototype属性。
3. 将这个空对象赋值给函数内部的this关键字。
4. 开始执行构造函数内部的代码。

## 闭包
闭包的定义：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。
```js
function A() {
  let a = 1
  window.B = function () {
      console.log(a)
  }
}
A()
B() // 1
```

>意义: 1.就是让我们可以间接访问函数内部的变量。2.让这些变量的值始终保持在内存中

## setTimeout 经典问题
```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
// 输出结果：输出一堆 6。
```
#### 输出1,2,3,4,5方法
* 方法1, 闭包
```js
for (var i = 1; i <= 5; i++) {
  ;(function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```
* 方法2，setTimeout第三个参数
```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```
* 方法3， let方法
```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

## js引擎执行队列、微任务、宏任务(并发模型与事件循环)
### 并发（concurrency）和并行（parallelism）区别
* **并发是宏观概念**，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。

* **并行是微观概念**，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。

JavaScript 的并发模型基于“事件循环”。
### 1.运行时概念
![可视化描述](./img/img3.webp)

Javascript执行引擎的主线程运行的时候，产生`堆（heap`）和`栈（stack）`，程序中代码依次进入栈中等待执行，若执行时遇到异步方法，该异步方法会被添加到用于回调的队列（queue）中【即JavaScript执行引擎的主线程拥有一个执行栈/堆和一个任务队列

* **栈：** 函数调用形成了一个栈帧
```
function foo(b) {
  var a = 10;
  return a + b + 11;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(7)); // 返回 42
```
当调用 bar 时，创建了第一个帧 ，帧中包含了 bar 的参数和局部变量。当 bar 调用 foo 时，第二个帧就被创建，并被压到第一个帧之上，帧中包含了 foo 的参数和局部变量。当 foo 返回时，最上层的帧就被弹出栈（剩下 bar 函数的调用帧 ）。当 bar 返回的时候，栈就空了。
* **堆：** 对象被分配在一个堆中，即用以表示一大块非结构化的内存区域。
* **队列：** 一个 JavaScript 运行时包含了一个待处理的消息队列。每一个消息都关联着一个用以处理这个消息的函数。
在[事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop#Event_loop)期间的某个时刻，运行时从最先进入队列的消息开始处理队列中的消息。为此，这个消息会被移出队列，并作为输入参数调用与之关联的函数。正如前面所提到的，调用一个函数总是会为其创造一个新的栈帧。
函数的处理会一直进行到执行栈再次为空为止；然后事件循环将会处理队列中的下一个消息（如果还有的话）。

### 2.事件循环（Event Loop）
![Event Loop](./img/img4.webp)

* **queue :**  如上文的解释，值得注意的是，除了IO设备的事件(如load)会被添加到queue中，用户操作产生 的事件（如click,touchmove）同样也会被添加到queue中。队列中的这些事件会在主线程的执行栈被清空时被依次读取（**队列先进先出，即先被压入队列中的事件会被先执行**）。
* **callback:** 被主线程挂起来的代码，等主线程执行队列中的事件时，事件对应的callback代码就会被执行
>【注：因为主线程从”任务队列”中读取事件的过程是循环不断的，因此这种运行机制又称为`Event Loop（事件循环）`】

```
console.log(1);
setTimeout(function() {
    console.log(2);
},5000);
console.log(3);
//输出结果：
//1
//3
//2
```
###### 解释：
* 1. JavaScript执行引擎主线程运行，产生heap和stack
* 2. 从上往下执行同步代码,log(1)被压入执行栈，因为log是webkit内核支持的普通方法而非WebAPIs的方法，因此立即出栈被引擎执行，输出1
* 3. JavaScript执行引擎继续往下，遇到setTimeout()t异步方法（如图，setTimeout属于WebAPIs），将setTimeout(callback,5000)添加到执行栈
* 4. 因为setTimeout()属于WebAPIs中的方法，JavaScript执行引擎在将setTimeout()出栈执行时，注册setTimeout()延时方法交由浏览器内核其他模块（以webkit为例，是webcore模块）处理
* 5. 继续运行setTimeout()下面的log(3)代码，原理同步骤2
* 6. 当延时方法到达触发条件，即到达设置的延时时间时（5秒后），该延时方法就会被添加至任务队列里。这一过程由浏览器内核其他模块处理，与执行引擎主线程独立
* 7. JavaScript执行引擎在主线程方法执行完毕，到达空闲状态时，会从任务队列中顺序获取任务来执行。
* 8. 将队列的第一个回调函数重新压入执行栈，执行回调函数中的代码log(2)，原理同步骤2，回调函数的代码执行完毕，清空执行栈
* 9. JavaScript执行引擎继续轮循队列，直到队列为空
* 10. 执行完毕

### 3.微任务(Macrotask) 和 宏任务(Microtask)
![Event Loop 2](./img/img5.webp)
不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 `微任务（microtask）` 和 `宏任务（macrotask）`。在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task。


##### Event Loop 执行顺序如下所示：

* 1. 首先执行同步代码，这属于宏任务
* 2. 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
* 3. 执行所有微任务
* 4. 当执行完所有微任务后，如有必要会渲染页面
* 5. 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数
##### 实例代码
```js
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
// script start
// async2 end
// Promise
// script end
// promise1
// promise2
// async1 end
// setTimeout
```

###### 微任务包括: `promise` ，`MutationObserver`。
###### 宏任务包括: `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`。
这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。

### 4.永不阻塞
事件循环模型的一个非常有趣的特性是，与许多其他语言不同，JavaScript 永不阻塞。 处理 I/O 通常通过事件和回调来执行，所以当一个应用正等待一个 [`IndexedDB`](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API "IndexedDB 是一种低级API，用于客户端存储大量结构化数据(包括, 文件/ blobs)。该API使用索引来实现对该数据的高性能搜索。虽然 Web Storage 对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。IndexedDB提供了一个解决方案。") 查询返回或者一个 [`XHR`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest "使用XMLHttpRequest (XHR)对象可以与服务器交互。您可以从URL获取数据，而无需让整个的页面刷新。这使得Web页面可以只更新页面的局部，而不影响用户的操作。XMLHttpRequest在 Ajax 编程中被大量使用。")请求返回时，它仍然可以处理其它事情，比如用户输入。

遗留的例外是存在的，如 `alert` 或者同步 XHR，但应该尽量避免使用它们。

## js垃圾回收的方法有哪些

## 前端缓存，etag、expires、cache-control

## js延迟加载的方式有哪些， defer和async的区别

## 事件委托

## bind, call, apply解释

## CMD、AMD、CommonJS、ES Modules说明

## spread, rest用法

## Promise中 .then的第二个参数与.catch有什么区别

## const 定义的 Array/Object 中间元素能否被修改? 如果能被修改，const 的意义何在？然后 怎么能防止修改？ 可以；意义在保证变量类型不变；freeze()

## 什么是跨域请求? 如何允许跨域? 如何允许所有域名跨域（不能通过代理转发）？

## 高阶函数说明

## 浅比较or深比较

## es6(promise)

## 常见的web安全问题及防护原理(xss，CSRF)

## 函数节流，防抖

## 事件机制

## 浏览器的事件循环和nodejs事件循环的区别

## dom渲染（回流和重绘）load、DOMContentLoaded等等事件的触发顺序

## 数组常用方法， 数组怎么去重

## let var const 的区别

## const a = [] a.push('sadf') 不报错的原因

## ul li li li  调换第一个和最后一个dom的位置

## 图片懒加载如何实现

## js的sort方法内部使用的什么排序

## 用JavaScript的异步实现sleep函数

## 如何实现深拷贝

## 检测数组的方式
```js
value instanceof Array

Array.isArray() (es5)

Object.prototype.toString.call()
```


## iframe的优缺点
> iframe的缺点
* 1、页面样式调试麻烦，出现多个滚动条；
* 2、浏览器的后退按钮失效；
* 3、过多会增加服务器的HTTP请求；
* 4、小型的移动设备无法完全显示框架；
* 5、产生多个页面，不易管理；
* 6、不容易打印；
* 7、代码复杂，无法被一些搜索引擎解读。

> iframe的优点：
* 1.iframe能够原封不动的把嵌入的网页展现出来。
* 2.如果有多个网页引用iframe，那么你只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
* 3.网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用。
* 4.如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决。
* 5.重载页面时不需要重载整个页面，只需要重载页面中的一个框架页(减少了数据的传输，增加了网页下载速度)
