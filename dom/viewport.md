## meta viewport
```js
<meta name="viewport" content="width=500, initial-scale=1">
```
这里只指定了两个属性，宽度和缩放，实际上 viewport 能控制的更多，它能表示的全部属性如下：

1. `width`：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。
1. `height`：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。
1. `initial-scale`：初始缩放比例。
1. `minimum-scale`：最小缩放比例。
1. `maximum-scale`：最大缩放比例。
1. `user-scalable`：是否允许用户缩放。

## 开启GPU加速的方法
开启后，会将 dom 元素提升为独立的渲染层，它的变化不会再影响文档流中的布局。

1. `transform: translateZ(0)`
1. `opacity`
1. `filters`
1. `Will-change`


## CORB 发生时浏览器表现
CORB 是一种判断是否要在跨站资源数据到达页面之前阻断其到达当前站点进程中的算法，降低了敏感数据暴露的风险。