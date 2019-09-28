# css 篇
## css选择器有哪些， 选择器的权重

## 盒子模型

## 如何实现水平居中和垂直居中

## css清除浮动的几种方法

## BFC

## 块级元素和行内元素
默认情况下，其宽度自动填满其父元素宽度，行内元素不会独占一行，相邻的行内元素会排列在同一行里，直到一行排不下，才会换行，其宽度随元素的内容而变化

* 块级元素可以设置width、height属性。行内元素设置width、height属性无效。
* 块级元素可以设置margin和padding属性。行内元素的margin和padding属性很奇怪，水平方向的padding-left、padding-right、margin-left、margin-right都产生边距效果，但竖直方向的padding-top、padding-bottom、margin-top、margin-bottom却不会产生边距效果。


## 水平居中
##### 一、行内元素
* 1. 给父元素设置`text-align：center`， 此方法对`inline`、`inline-block`、`inline-table`和`inline-flex`元素水平居中都有效。

* 2. table+margin 先将子元素设置为块级表格来显示（类似），再将其设置水平居中
```html
<div class="parent">
  <div class="child">Demo</div>
</div>
<style>
  .parent{
    text-align: center;
  }
  .child {
    display: inline-block;
  }
</style>
```

##### 二、块级元素的水平居中
* 1. 固定宽度的块级元素
```css
.child{
  width: 100px;
  margin: 0 auto;
}
```
* 2. 不确定宽度的块级元素的水平居中

> 方法一，使用`absolute+transform` 先将父元素设置为相对定位，再将子元素设置为绝对定位，向右移动子元素，移动距离为父容器的一半，最后通过向左移动子元素的一半宽度以达到水平居中。

```html
<div class="parent">
  <div class="child">Demo</div>
</div>
<style>
  .child {
    position:absolute;
    left:50%;
    transform:translateX(-50%);
  }
  .parent {
    position:relative;
  }
</style>
```

> 方法二，flex+justify-content (不管是定宽还是不定宽都适用)
**通过CSS3中的布局利器flex中的justify-content属性来达到水平居中。**

```
<div class="parent">
  <div class="child">Demo</div>
</div>
<style>
  .parent {
    display: flex;
    justify-content:center;
  }
</style>
```

* 3. 绝对定位元素水平居中
这种方式非常独特，**通过子元素绝对定位，外加`margin: 0 auto`来实现**。

```html
<div class="parent">
  <div class="child">让绝对定位的元素水平居中对齐。</div>
</div>
<style>
  .parent{
    position:relative;
  }
  .child{
    position: absolute; /*绝对定位*/
    width: 200px;
    height:100px;
    background: yellow;
    margin: 0 auto; /*水平居中*/
    left: 0; /*此处不能省略，且为0*/
    right: 0;/*此处不能省略，且为0*/
  }
</style>
```


## 竖直居中
##### 一、行内元素
* 1.单行内联元素垂直居中
父元素高度和行高设置为相同
```html
<div id="box">
  <span>单行内联元素垂直居中。</span>。
</div>
<style>
 #box {
    height: 120px;
    line-height: 120px;
    border: 2px dashed #f69c55;
    }
</style>
```
* 2.多行内联元素垂直居中
> 方法一、利用flex布局（flex）
**利用flex布局实现垂直居中，其中flex-direction: column定义主轴方向为纵向**。。

```html
<div class="parent">
    <p>Dance like nobody is watching, code like everybody is.
    Dance like nobody is watching, code like everybody is.
    Dance like nobody is watching, code like everybody is.</p>
</div>
<style>
  .parent {
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px dashed #f69c55;
  }
</style>
```
![](https://camo.githubusercontent.com/b288b11fef1c7a1b70f9ab47c277300fc6ea475c/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f31332f313636366431656465363963323763353f773d37323526683d31353826663d706e6726733d3134303934)

> 方法二、利用表布局（table）
**利用表布局的vertical-align: middle可以实现子元素的垂直居中**

```html
<div class="parent">
    <p class="child">The more technology you learn, the more you realize how little you know.
    The more technology you learn, the more you realize how little you know.
    The more technology you learn, the more you realize how little you know.</p>
</div>
 <style>
    .parent {
        display: table;
        height: 140px;
        border: 2px dashed #f69c55;
    }
    .child {
        display: table-cell;
        vertical-align: middle;
    }
</style>
```

###### 块级元素垂直居中
* 1. 使用absolute+负margin(已知高度宽度)
**通过绝对定位元素距离顶部50%，并设置margin-top向上偏移元素高度的一半，就可以实现了**。

```html
<div class="parent">
    <div class="child">固定高度的块级元素垂直居中。</div>
</div>
.parent {
position: relative;
}
.child {
position: absolute;
top: 50%;
height: 100px;
margin-top: -50px;
}
```
* 2. 使用absolute+transform
**当垂直居中的元素的高度和宽度未知时，可以借助CSS3中的transform属性向Y轴反向偏移50%的方法实现垂直居中**。但是部分浏览器存在兼容性的问题。

```
<div class="parent">
    <div class="child">未知高度的块级元素垂直居中。</div>
</div>
.parent {
position: relative;
}
.child {
position: absolute;
top: 50%;
transform: translateY(-50%);
}
```
* 3. 使用flex+align-items
**通过设置flex布局中的属性align-items，使子元素垂直居中**。

```
<div class="parent">
    <div class="child">未知高度的块级元素垂直居中。</div>
</div>
.parent {
    display:flex;
    align-items:center;
}
```
4. 使用table-cell+vertical-align
**通过将父元素转化为一个表格单元格显示（类似 `<td>` 和 `<th>`），再通过设置 `vertical-align`属性，使表格单元格内容垂直居中。**

```
<div class="parent">
  <div class="child">Demo</div>
</div>
<style>
  .parent {
    display: table-cell;
    vertical-align: middle;
  }
</style>
```

##### 1、父元素高度不确定的文本、图片、块级元素的竖直居中
父元素高度不确定的文本、图片、块级元素的竖直居中是通过给父容器设置相同上下边距实现的
##### 2、父元素高度确定的单行文本的竖直居中
父元素高度确定的单行文本的竖直居中，是通过给父元素设置line-height来实现的，line-height值和父元素的高度值相同
##### 3、父元素高度确定的多行文本、图片、块级元素的竖直居中

* 方法一：说到竖直居中，CSS中有一个用于竖直居中的属性vertical-align。 设置display: table-cell
* 不知道自己高度和父容器高度的情况下, 利用绝对定位只需要以下三行：
```
parentElement{
        position:relative;
    }

 childElement{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

 }
```
* 若父容器下只有一个元素，且父元素设置了高度，则只需要使用相对定位即可
```
parentElement{
        height:xxx;
    }

    .childElement {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
```

```
parentElement{
    display:flex;/*Flex布局*/    align-items:center;/*指定垂直居中*/
}
```

```
vw、vh、vmin和vmax是CSS3中的新单位，是一种视窗单位，也是相对单位。它们的大小都是由视窗大小来决定的，单位1，代表类似于1%。具体描述如下：

vw：视窗宽度的百分比
vh：视窗高度的百分比
vmin：当前较小的vw和vh
vmax：当前较大的vw和vh

视窗，指的是浏览器可视区域的宽高，也就是window.innerWidth/window.innerHeight。1vw就是1%的浏览器的宽度。100vw就是整个视窗的宽度。
```

### 清除浮动
#### 方案1
* 直接设置父元素的高度
* 优势：极其简单
* 弊端：必须要知道父元素高度是多少

#### 方案2
* 在父元素中，追加空子元素，并设置其clear属性为both
* clear是css中专用于清除浮动的属性
* 作用：清除当前元素前面的元素浮动所带来的影响
**取值：**
    * 1、`none`:默认值，不做任何清除浮动的操作
    * 2、`left`: 清除前面元素左浮动带来的影响
    * 3、`right`:清除前面元素右浮动带来的影响
    * 4、`both`: 清除前面元素所有浮动带来的影响
* 优势：代码量少 容易掌握 简单易懂
* 弊端：会添加许多无意义的空标签，有违结构与表现的分离，不便于后期的维护

#### 方案3
* 设置父元素浮动
* 优势：简单，代码量少，没有结构和语义化问题
* 弊端：对后续元素会有影响

#### 方案4
* 为父元素设置overflow属性
* 取值：hidden 或 auto
* 优势：简单，代码量少
* 弊端：如果有内容要溢出显示(弹出菜单)，也会被一同隐藏

#### 方案5
* 父元素设置display:table
* 优势：不影响结构与表现的分离，语义化正确，代码量少
* 弊端：盒模型属性已经改变，会造成其他问题

#### 方案6
使用内容生成的方式清除浮动
```
.clearfix:after {
   content:"";
   display: block;
   clear:both;
}
```
* `:after` 选择器向选定的元素之后插入内容
* `content:""`; 生成内容为空
* `display: block`; 生成的元素以块级元素显示,
* `clear:both`; 清除前面元素浮动带来的影响
* 相对于空标签闭合浮动的方法
* 优势：不破坏文档结构，没有副作用
* 弊端：代码量多

#### 方案7
```
.cf:before,.cf:after {
   content:"";
   display:table;
}
.cf:after { clear:both; }
```
* 优势：不破坏文档结构，没有副作用
* 弊端： 代码量多


### BFC (详细见这个https://blog.csdn.net/FE_dev/article/details/68954481)
**BFC(Block formatting context)直译为”块级格式化上下文”**:。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。