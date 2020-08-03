# 1. 路由
## 1.1. 后端路由
后端路由又可称之为服务器端路由，因为对于服务器来说，当接收到客户端发来的HTTP请求，就会根据所请求的相应URL，来找到相应的映射函数，然后执行该函数，并将函数的返回值发送给客户端。对于最简单的静态资源服务器，可以认为，所有URL的映射函数就是一个文件读取操作。对于动态资源，映射函数可能是一个数据库读取操作，也可能是进行一些数据的处理，等等。然后根据这些读取的数据，在服务器端就使用相应的模板来对页面进行渲染后，再返回渲染完毕的页面。这种方式在早期的前端开发中非常普遍

> `后端路由优点`是：安全性好，SEO好，`缺点`是：加大服务器的压力，不利于用户体验，代码冗合 ，


## 1.2. 前端路由
* `前端路由优点`是：前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升
`缺点`是：没有合理地利用缓存，同样的不利于seo

## 1.3. 前端路由的实现方式
一般三种：`BrowserRouter`、`HashRouter`、`MemoryRouter:`
### 1.3.1. `HashRoute`
使用 `URL` 的 `hash` 部分（即 `window.location.hash` ）的 <Router> 使您的 UI 与 URL 保持同步
hashchange事件来监听hash的变化。并且通过history.length能看到路由总数
#### 1.3.1.1. 简易实现
```html
//首先我们要有个html
  <ul>
      <li><a href="#luyou1">路由1</a></li>
      <li><a href="#luyou2">路由2</a></li>
      <li><a href="#luyou3">路由3</a></li>
    </ul>
    <div id="luyouid"></div>
```
```js
  class router {
    constructor(hash) {
      //初始化赋值
      this.hashStr = hash;
      //初始化
      this.watchHash();
      //绑定监听改变事件,由于this被换了，必须用bind绑定
      this.watch = this.watchHash.bind(this);
      window.addEventListener("hashchange", this.watch);
    }
    //监听方法
    watchHash() {
      let hash = window.location.hash.slice(1);
      this.hashStr = hash;
      if (hashStr) {
        if (hashStr == "luyou1") {
          document.querySelector("#luyouid").innerHTML = "好好学习天天向上";
        } else if (hashStr == "luyou2") {
          document.querySelector("#luyouid").innerHTML = "天天向上好好学习";
        } else {
          document.querySelector("#luyouid").innerHTML = "学习向上";
        }
      }
    }
  }

```

### 1.3.2. `BrowserRouter:`
使用 HTML5 history API 记录（ pushState，replaceState 和 popstate 事件）的 <Router> 使UI与URL保持同步。
#### 1.3.2.1. history API
1. 向前和向后跳转
```js
// 这和用户点击浏览器回退按钮的效果相同。
window.history.back()
window.history.forward();
```
2. 跳转到 history 中指定的一个点
可以用 go() 方法载入到会话历史中的某一特定页面， 通过与当前页面相对位置来标志 (当前页面的相对位置标志为0).

```js
// 向后移动一个页面 (等同于调用 back()):
window.history.go(-1);
// 向前移动一个页面, 等同于调用了 forward():
window.history.go(1);
// 查看长度属性的值来确定的历史堆栈中页面的数量:
let numberOfEntries = window.history.length;
```

3. 添加和修改历史记录中的条目
HTML5引入了 `history.pushState()` 和 `history.replaceState()` 方法，它们分别可以添加和修改历史记录条目。这些方法通常与window.onpopstate 配合使用。
使用：
* `pushState()` 方法
接口使用说明：https://developer.mozilla.org/zh-CN/docs/Web/API/History_API
* `replaceState` 方法

4. popstate 事件
  每当活动的历史记录项发生变化时， `popstate` 事件都会被传递给window对象。如果当前活动的历史记录项是被 `pushState` 创建的，或者是由 `replaceState` 改变的，那么 `popstate` 事件的状态属性 `state` 会包含一个当前历史记录状态对象的拷贝。

5. 获取当前状态
```js
let currentState = history.state;
```

6. `window.onpopstate是popstate`事件在window对象上的事件处理程序.
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onpopstate
仅仅调用pushState方法或replaceState方法，并不会触发该事件，只有用户点击浏览器后退和前进按钮时，或者使用js调用back、forward、go方法时才会触发。

7. 监听 pushState 和 replaceState 的变化
```js
//创建全局事件
var _wr = function(type) {
   var orig = history[type];
   return function() {
       var rv = orig.apply(this, arguments);
      var e = new Event(type);
       e.arguments = arguments;
       window.dispatchEvent(e);
       return rv;
   };
};
//重写方法
 history.pushState = _wr('pushState');
 history.replaceState = _wr('replaceState');
//实现监听
window.addEventListener('replaceState', function(e) {
  console.log('THEY DID IT AGAIN! replaceState 111111');
});
window.addEventListener('pushState', function(e) {
  console.log('THEY DID IT AGAIN! pushState 2222222');
});

```

#####

* `MemoryRouter:` <Router> 能在内存中保存你的 “URL” 的历史记录(并不会对地址栏进行读写)。很适合在测试环境和非浏览器环境中使用，例如 `React Native`。
