<div class="title"> 同构JavaScript应用开发</div>

## 1. 同构JavaScript应用

就是在 `浏览器客户端` 和 `Web应用服务器端` 间共享同一套 `JavaScript代码` 的应用。

## 2. 常见web架构

### 2.1. 传统的Web应用
所有的标记——至少是关键渲染路径的标记——是通过服务器使用某种服务器端语言（如PHP、Ruby、Java等）进行渲染的，浏览器解析文档后，用于丰富用户体验的JavaScript代码会被初始化。

![image.png](https://upload-images.jianshu.io/upload_images/1877305-23c0a63c5b5a544b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2.2. 单页面Web应用

![image.png](https://upload-images.jianshu.io/upload_images/1877305-ff6c9365ccb29178.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2.3. 同构JavaScript应用

同构JavaScript应用是传统Web应用和SPA架构的完美结合。同构应用具备以下优势。

* SEO默认支持使用完全合法的URL——不再需要“#!”的变通方案了——通过History API进行跳转，在不支持His-tory API的浏览器中可以优雅地回退到服务器端渲染模式。
* 在支持History API的浏览器中，后续的页面请求使用了SPA模型的分布式渲染。这种实现还可以减轻服务器的负载。
* 对于同一个渲染周期，客户端和服务器端可以重用同一套代码。这意味着我们不需要重复劳动，也不会让界限变得模糊。这可以在降低UI开发成本与bug数量的同时，提高团队的开发速度。
* 通过在服务器端渲染首屏页面提高加载速度。用户不再需要在首屏渲染之前等待网络请求完成和一直看着加载指示器动画了。
* 纯JavaScript技术栈，这意味着应用界面的代码可以由前端工程师单独维护，而无须经过后端工程师。

### 2.4. 何时不使用同构的场景：

像Yahoo!、Facebook、Netflix和Airbnb这些公司在使用同构JavaScript。然而，同构JavaScript架构可能仅仅适用于某些类型的应用。同构JavaScript应用需要更多架构上的考虑，实现上也存在一定的复杂度。对于SPA来说，如果性能要求不高或者没有SEO需求（比如需要登录后才能使用），同构JavaScript带来的麻烦似乎远大于收益。

## 3. MVC 和 MVVM 说明