## 原生dom操作方法

1. `appendChild()` : 将一个节点添加到指定父节点的子节点列表末尾, 如果传入到appendChild()中的节点已经是文档的一部分了，那结果就是将该节点从原来的位置转移到新位置。即使可以将DOM树看成是由一系列指针连接起来的，但任何DOM节点也不能同时出现在文档中的多个位置上。

```
//将一个节点添加到指定父节点的子节点列表末尾。
const child = node.appendChild(child);
// node: 是要插入子节点的父节点.
// child: 即是参数又是这个方法的返回值.
```

2. `insertBefore()` 参考节点之前插入一个节点作为一个指定父节点的子节点

```
const insertedElement = parentElement.insertBefore(newElement, referenceElement);
//1. referenceElement为null则newElement将被插入到子节点的末尾。
//2. 如果newElement已经在DOM树中，newElement首先会从DOM树中移除。
```

> `insertedElement` 是被插入的节点，即 newElement

`parentElement` 是新插入节点的父节点
`newElement` 是被插入的节点
`referenceElement` 在插入newElement之前的那个节点

3. `replaceChild()` : 接受的两个参数是：要插入的节点和要替换的节点

```
replacedNode = parentNode.replaceChild(newChild, oldChild);
// newChild 用来替换 oldChild 的新节点。如果该节点已经存在于DOM树中，则它会被从原始位置删除。
// oldChild  被替换掉的原始节点。
// replacedNode 和 oldChild相等。
// 返回被替换掉的节点
```

4. `removeChild()` 从DOM中删除一个子节点。返回删除的节点

```
let oldChild = node.removeChild(child);
//OR
element.removeChild(child);
// child 是要移除的那个子节点.
// node 是child的父节点.
// oldChild保存对删除的子节点的引用. oldChild === child.
```

5. `cloneNode()` : 接受一个布尔值参数，表示是否执行深复制。在参数为true的情况下，执行深复制，也就是复制节点及其整个子节点树；在参数为false的情况下，执行浅复制，即只复制节点本身。
6. `normalize()`

> cloneNode 和 normalize 所有类型的节点都有

## ul li li li  调换第一个和最后一个dom的位置

``` js
  < ul >
      <
      li > 1 < /li> <
      li > 2 < /li> <
      li > 3 < /li> <
      li > 4 < /li> <
      /ul>
  const ulEl = document.querySelector('ul');
  const liElList = document.querySelectorAll('ul li');
  const liElListLength = liElList.length;
  const lastLi = liElList[liElListLength - 1];
  const firstLi = ulEl.replaceChild(liElList[liElListLength - 1], liElList[0])
  ulEl.appendChild(firstLi);
```
