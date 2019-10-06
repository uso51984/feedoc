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
### 简述
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
### 作用
#### 1. 可以得知某个实例对象，到底是哪一个构造函数产生的。
```js
function F() {};
var f = new F();

f.constructor === F // true
f.constructor === RegExp // false
```
#### 2. 可以从一个实例对象新建另一个实例。
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

## 函数的this

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

>意义: 就是让我们可以间接访问函数内部的变量。

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

## js引擎执行队列、微任务、宏任务

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
