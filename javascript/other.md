```js
const a = { b ：3}

function foo(obj) {
  obj.b = 5

  return obj
}

const aa = foo(a)

console.log(a.b)

console.log(aa.b)
```

```js
function Ofo() {}

function Bick() {
	this.name = 'mybick'
}

var myBick = new Ofo()

Ofo.prototype = new Bick()

var youbick = new Bick()

console.log(myBick.name)

console.log(youbick.name)
```

### 4. 实现一个 fill 函数，不能用循环。
### 5. 手写 Promise.all
### 6. 算法题，怎么判断单链表相交。
### 7. 算法题，怎么找到第一个相交的节点。
### 8. FiberNode 有哪些属性
### 9. flex: 0 1 auto; 是什么意思？
### 10. 算法题：求最大公共前缀，如 ['aaafsd', 'aawwewer', 'aaddfff'] => 'aa'
### 11. ssr
### 12. class 组件与函数式组件的区别
### 13. 避免 css 全局污染
### 14. equire 有什么性能问题
### 15. React.lazy 的原理是啥
### 17. 写一个 promise 重试函数，可以设置时间间隔和次数
### 19. 算法题:https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/

## 1.23. 找出数组中和为给定值的两个元素，如：[1, 2, 3, 4, 5]中找出和为6的两个元素。


