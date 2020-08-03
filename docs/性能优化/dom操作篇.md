<div class="title">dom操作篇</div>

## 1. 插入list dom时

将数组 ` ['Firefox', 'Chrome', 'Opera', 'Safari', 'Internet Explorer']` 展示到页面 `<div class='list-box'></div>` ;

* 最慢做法

``` js
const listData = ['Firefox', 'Chrome', 'Opera', 'Safari', 'Internet Explorer'];
listData.forEach((value) => {
    const pNode = document.createElement("p");
    pNode.innerText = value;
    document.querySelector('.list-box').appendChild(liNode);
})
```
### 1.1. 优化

1. 缓存dom对象

解决缺点： 每一次循环都会去查找为list-box的元素，效率自然非常低，所以我们需要将元素在循环前查询完毕，在循环中仅仅是引用就行了：

``` js
const listData = ['Firefox', 'Chrome', 'Opera', 'Safari', 'Internet Explorer'];
const listBoxEle = document.querySelector('.list-box');
listData.forEach((value) => {
    const pNode = document.createElement("p");
    pNode.textContent = value;
    listBoxEle.appendChild(liNode);
})
```

在一般情况下，我们会根据需要，将一些频繁被查找的元素缓存起来，在查找它或查找它的子孙元素时，以它为起点进行查找，就能提高查找效率了。

2. 一次性DOM节点生成

```js
const listData = ['Firefox', 'Chrome', 'Opera', 'Safari', 'Internet Explorer'];
const listBoxEle = document.querySelector('.list-box');
const listNode = []
listData.forEach((value)=>{
  listNode.push( `<p>${value}</p>` )
})
listBoxEle.innerHTML = listNode;
```

3. 在内存中操作元素(文档片段 `DocumentFragment` )

```js
const listBoxEle = document.querySelector('.list-box');
const fragment = document.createDocumentFragment();
const listData = ['Firefox', 'Chrome', 'Opera',
    'Safari', 'Internet Explorer'];

listData.forEach(function(value) {
    const pNode = document.createElement('p');
    pNode.textContent = value;
    fragment.appendChild(pNode);
});

listBoxEle.appendChild(fragment);
```

因为文档片段存在于**内存中**，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面[回流](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

## 2. 需要通过JavaScript给元素增加样式
比如如下代码：

```js
element.style.fontSize = '24px';
element.style.color = 'white';
```

这样效率很低，每次修改style属性后都会触发元素的重绘，如果修改了的属性涉及大小和位置，将会导致回流。所以我们应当尽量避免多次为一个元素设置style属性，应当通过给其添加新的CSS类，来修改其CSS

### 2.1. 优化： 通过类修改样式

```
.element {
    font-size: 24px;
    color: #fff;
}
element.className += " element";
```

## 3. 事件监听优化

通过事件代理批量操作事件

