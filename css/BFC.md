- [1. css清除浮动的几种方法](#1-css清除浮动的几种方法)
  - [1.1. 一、常用css定位流描述](#11-一常用css定位流描述)
    - [1.1.1. 1、文档流定位 `position: static` （默认方式）](#111-1文档流定位-position-static-默认方式)
    - [1.1.2. 2、浮动定位 float](#112-2浮动定位-float)
    - [1.1.3. 3、相对定位 `position: relative`](#113-3相对定位-position-relative)
    - [1.1.4. 4、绝对定位 `position: absolute`](#114-4绝对定位-position-absolute)
  - [1.2. 二、浮动的效果](#12-二浮动的效果)
    - [1.2.1. 注意](#121-注意)
    - [1.2.2. 浮动的影响？](#122-浮动的影响)
  - [1.3. 三、清除浮动](#13-三清除浮动)
    - [1.3.1. 方案1](#131-方案1)
    - [1.3.2. 方案2](#132-方案2)
    - [1.3.3. 方案3](#133-方案3)
    - [1.3.4. 方案4](#134-方案4)
    - [1.3.5. 方案5](#135-方案5)
    - [1.3.6. 方案6](#136-方案6)
    - [1.3.7. 方案7](#137-方案7)
  - [1.4. 疑问](#14-疑问)
- [2. BFC](#2-bfc)
  - [2.1. BFC布局规则：](#21-bfc布局规则)
  - [2.2. 触发BFC的条件](#22-触发bfc的条件)
  - [2.3. BFC example](#23-bfc-example)

## 1. css清除浮动的几种方法

### 1.1. 一、常用css定位流描述

#### 1.1.1. 1、文档流定位 `position: static` （默认方式）

页面元素的默认定位方式

* **块级元素**：按照从上到下的方式逐个排列
* **行内元素**：按照从左到右的方式逐个排列

> 但是如何让多个块级元素在一行内显示? 方法之一：浮动定位

#### 1.1.2. 2、浮动定位 float

`floa: left/right`
这个属性原本是用来做文字环绕的，但是后来大家发现做布局也不错，就一直这么用了

#### 1.1.3. 3、相对定位 `position: relative`

元素会相对于它原来的位置偏移某个距离，改变元素位置后，元素原本的空间依然会被保留（不会脱离文档流）

#### 1.1.4. 4、绝对定位 `position: absolute`

特征:

* 1、脱离文档流-不占据页面空间
* 2、通过偏移属性固定元素位置
* 3、相对于最近的已定位的祖先元素实现位置固定
* 4、如果没有已定位祖先元素，那么就相对于最初的包含块(body, html)去实现位置的固定

### 1.2. 二、浮动的效果

* 1、浮动定位元素会被排除在文档流之外-脱离文档流(不占据页面空间), 其余的元素要上前补位
* 2、浮动元素会停靠在父元素的左边或右边，或停靠在其他已浮动元素的边缘上(元素只能在当前所在行浮动)
* 3、浮动元素依然位于父元素之内
* 4、浮动元素处理的问题-解决多个块级元素在一行内显示的问题

#### 1.2.1. 注意

* 1、一行内，显示不下所有的已浮动元素时，最后一个将换行
* 2、元素一旦浮动起来之后，那么宽度将变成自适应(宽度由内容决定)
* 3、元素一旦浮动起来之后，那么就将变成 **类似行内块级元素**
* 4、文本，行内元素，行内块元素时采用环绕的方式来排列的，是不会被浮动元素压在底下的，会巧妙的避开浮动元素

#### 1.2.2. 浮动的影响？

由于浮动元素会脱离文档流，所以导致不占据页面空间，所以会对父元素高度带来一定影响。如果一个元素中包含的元素全部是浮动元素，那么该元素高度将变成0（**高度塌陷**）

### 1.3. 三、清除浮动

#### 1.3.1. 方案1

* 直接设置父元素的高度
* 优势：极其简单
* 弊端：必须要知道父元素高度是多少

#### 1.3.2. 方案2

* 在父元素中，追加空子元素，并设置其clear属性为both
* clear是css中专用于清除浮动的属性
* 作用：清除当前元素前面的元素浮动所带来的影响

**取值：**

    - 1、 `none` :默认值，不做任何清除浮动的操作
    - 2、 `left` : 清除前面元素左浮动带来的影响
    - 3、 `right` :清除前面元素右浮动带来的影响
    - 4、 `both` : 清除前面元素所有浮动带来的影响
* 优势：代码量少 容易掌握 简单易懂
* 弊端：会添加许多无意义的空标签，有违结构与表现的分离，不便于后期的维护

#### 1.3.3. 方案3

* 设置父元素浮动
* 优势：简单，代码量少，没有结构和语义化问题
* 弊端：对后续元素会有影响

#### 1.3.4. 方案4

* 为父元素设置overflow属性
* 取值：hidden 或 auto
* 优势：简单，代码量少
* 弊端：如果有内容要溢出显示(弹出菜单)，也会被一同隐藏

#### 1.3.5. 方案5

* 父元素设置display:table
* 优势：不影响结构与表现的分离，语义化正确，代码量少
* 弊端：盒模型属性已经改变，会造成其他问题

#### 1.3.6. 方案6

使用内容生成的方式清除浮动

```
.clearfix:after {
   content:"";
   display: block;
   clear:both;
}
```

* `:after` 选择器向选定的元素之后插入内容
* `content:""` ; 生成内容为空
* `display: block` ; 生成的元素以块级元素显示,
* `clear:both` ; 清除前面元素浮动带来的影响
* 相对于空标签闭合浮动的方法
* 优势：不破坏文档结构，没有副作用
* 弊端：代码量多

#### 1.3.7. 方案7

```
.cf:before,.cf:after {
   content:"";
   display:table;
}
.cf:after { clear:both; }
```

* 优势：不破坏文档结构，没有副作用
* 弊端： 代码量多

> 注意：display:table本身无法触发BFC，但是它会产生匿名框(anonymous boxes)，而匿名框中的display:table-cell可以触发BFC，简单说就是，触发块级格式化上下文的是匿名框，而不是display:table。所以通过display:table和display:table-cell创建的BFC效果是不一样的（后面会说到BFC）。

> CSS2.1 表格模型中的元素，可能不会全部包含在除HTML之外的文档语言中。这时，那些“丢失”的元素会被模拟出来，从而使得表格模型能够正常工作。所有的表格元素将会自动在自身周围生成所需的匿名table对象，使其符合table/inline-table、table-row、table- cell的三层嵌套关系。

### 1.4. 疑问

* 为什么会margin边距重叠？
* overflow:hidden, 语义应该是溢出: 隐藏，按道理说，子元素浮动了，但依然是在父元素里的，而父元素高度塌陷，高度为0了，子元素应该算是溢出了，为什么没有隐藏，反而撑开了父元素的高度？
* 为什么display:table也能清除浮动，原理是什么？

## 2. BFC

**BFC(Block formatting context)直译为”块级格式化上下文”**:。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

* `block-level box` ，display属性为block, list-item, table的元素，会生成block-level box。并且参与block fomatting context。
* `inline-level box` ， display属性为inline, inline-block, inline-table的元素，会生成inline-level box。并且参与inline formatting context。

### 2.1. BFC布局规则：

* 1、内部的Box会在垂直方向，按照从上到下的方式逐个排列。
* 2、Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 3、每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* 4、BFC的区域不会与float box重叠。
* 5、BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 6、计算BFC的高度时，浮动元素的高度也参与计算

### 2.2. 触发BFC的条件

* 1、根元素
* 2、float （left，right）
* 3、overflow 除了visible 以外的值（hidden，auto，scroll ）
* 4、display (table-cell，table-caption，inline-block)
* 5、position（absolute，fixed）

### 2.3. BFC example

* 1、依据BFC布局规则第二条：

Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
注意：发生重叠后，外边距的高度等于两个发生重叠的外边距的高度中的较大者

```
<style>
   .top{
    width:100px;
    height:100px;
    background:red;
    margin:50px;
   }
   .bottom{
    width:100px;
    height:100px;
    background:blue;
    margin:20px;
   }
</style>
<body>
    <div class="top">上</div>
    <div class="bottom">下</div>
</body>
```

![image.png](../img/img9.png)

* 2、依据BFC布局规则第三条：

每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
我们可以看到，虽然有浮动的元素top，但是bottom的左边依然与包含块的左边相接触。

```
<style>
   .top{
    width:100px;
    height:100px;
    background:red;
    float:left;
   }
   .bottom{
    width:200px;
    height:200px;
    background:blue;
   }
</style>
<body>
    <div class="top"></div>
    <div class="bottom"></div>
</body>
```

![imag3e.png](../img/img7.png)

* 3、依据BFC布局规则第四条：

BFC的区域不会与float box重叠。
看代码和效果图，可以看出，这次的代码比上面的代码多了一行overflow:hidden; 用这行代码触发新的BFC后，由于这个新的BFC不会与浮动的top重叠，所以bottom的位置改变了

```
<style>
   .top{
    width:100px;
    height:100px;
    background:red;
    float:left;
   }
   .bottom{
    width:200px;
    height:200px;
    background:blue;
    overflow:hidden;
   }
</style>
<body>
    <div class="top"></div>
    <div class="bottom"></div>
</body>
```

![4](../img/img8.png)

* 4、依据BFC布局规则第六条：

计算BFC的高度时，浮动元素的高度也参与计算。
到此我们应该是解决了上面的所有疑问了。

```
<style>
   p{
    width:100px;
    height:100px;
    background:red;
    float:left;
   }
   div{
    width:200px;
    border:1px solid blue;
   }
</style>
<body>
    <div>
       <p></p>
    </div>
</body>
```

![image.png](../img/img10.png)

当div增加 overflow:hidden; 时 效果如下

![image.png](../img/img11.png)

> 清除浮动的方式有很多种，但是实现的原理主要是靠clear属性和触发新的BFC，通过详细的解释与比较，最后两种内容生成的方式是比较推荐使用的，如果需要考虑margin重叠的问题，就用方案7，不考虑就用方案6

* 5、自适应两栏布局

```
<style>
	body {
		width: 300px;
		position: relative;
	}
	.aside {
		width: 100px;
		height: 150px;
		float: left;
		background: #f66;
	}
	.main {
		height: 200px;
		background: #fcc;
               overflow: hidden;
	}
</style>
<body>
	<div class="aside"></div>
	<div class="main"></div>
</body>
```

每个元素的margin box的左边, 与包含块border box的左边相接触(对于从左往右的格式化, 否则相反)。即使存在浮动也是如此。
因此, 虽然存在浮动的元素aslide, 但main的左边依然会与包含块的左边相接触。
根据BFC布局规则第四条:
BFC的区域不会与float box重叠。
我们可以通过通过触发main生成BFC, 来实现自适应两栏布局。
`.main { overflow: hidden/auto;}`
当触发main生成BFC后, 这个新的BFC不会与浮动的aside重叠。因此会根据包含块的宽度, 和aside的宽度, 自动变窄。效果如下:

> 参考文献：https://blog.csdn.net/FE_dev/article/details/68954481

