# 其他

## 参考资料
* https://github.com/qiu-deqing/FE-interview
* https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/javascript-questions.md
* https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions
* https://github.com/Advanced-Frontend/Daily-Interview-Question

### T1 基础类问题

> 基础
- 原型解释，怎么获取对象本身的属性和方法？
- 闭包，作用域解释，进一步问变量私有化
- forEach 和 map 的区别和选择
- function Person(){}, var person = Person(), and var person = new Person()?
- Function.prototype.bind, call, apply 解释
- display: none;与visibility: hidden;的区别
- 如何竖直居中一个元素
- sessionStorage,localStorage,cookie区别, 怎么清除cookie？
- 如何判断一个对象是否为函数

> ES6
- CMD,AMD,CommonJS, ES Modules 说明
- spread, rest 用法
- let 与 var 的区别, 以及 箭头函数 与 function 的区别
- Promise 中 .then 的第二参数与 .catch 有什么区别?
- 区别 doSomething().then(doSomethingElse()); doSomething().then(doSomethingElse);
- const 定义的 Array/Object 中间元素能否被修改? 如果能被修改，const 的意义何在？然后 怎么能防止修改？
可以；意义在保证变量类型不变；freeze()



> 网络

- HTTP 协议中的 GET 和 POST 有什么区别?  POST 和 PUT 有什么区别?
- 什么是跨域请求? 如何允许跨域? 如何允许所有域名跨域（不能通过代理转发）？
- cookie 与 session 的区别? 服务端如何清除 cookie?


> 事件
- 解释事件代理 event delegation
- 事件冒泡和用途


---
等级 | 要求
---|---
T1.1|基础 >80%
T1.2| ES6 >50%
T1.3 |网络+事件 >50%


---

### T2 技术类问题


- get请求参数包含url地址时需要怎么处理？
- 缓存控制 怎么实现？ Cache-control Expires
- HTTP状态码及其含义
- 解释之前做优化的时候把静态资源放在不同的域名上的原因 （单域名请求限制）
- 高阶函数说明
- reduce 函数解释，如何实现一个异步的 reduce? (注:不是异步完了之后同步 reduce)
- node path 模块常用方法说明 join, resolve, dirname, relative
- 包管理，版本锁定解释
- fiddle、charles 有没有用过，什么时候用
- 会不会用git，说上来几个命令，说一下git和svn的区别，有没有用git解决过冲突


---
等级 | 得分要求 （选10个问题）
---|---
T2.1 |  > 40
T2.2 |  >70
T2.3 |  >90

---


### T3 原理/框架问题

- vue 双向绑定原理          ★★
- react 框架原理            ★★
- MVC 和 MVVM 说明          ★★
- npm 包管理，上传包，搭建内部npm; 本地包开发 流程说明(npm link)    ★★★
- 工程化 webpack 说明，基础配置，编译优化，devserver     ★★★
- 构建工具自述，grunt gulp, webpack rollup  ★★
- 组件化经验，组件管理 lerna, storybook  ★★
- FireBug / ChromeDeveloperTools 自述 （网络限速，设备适配模拟， sourcemap调试，dom断点，性能问题检查）      ★★★
- nginx 功能和代理配置  ★★
- hybrid 认识，常见交互方式, 优化思路（加载速度，运行性能）  ★★★
- nodejs 框架 koa, express使用， 中间件洋葱模型说明  ★★★
- 同构方案说明  ★★★

---
等级 | 问题
---|---
T3.1 | 二星 > 2  三星 > 1
T3.2 |  二星 > 2  三星 > 3
T4.3 |  二星 > 6   三星 > 5

---


### T4 架构/管理问题

- 项目管理经验
>
    组织、发起、跟进、汇报一个项目的全周期的能力，
    包括多任务并行、和突发情况处理，
    具备高效和高质量记录、备份、确认和项目交接能力


- NodeJS 经验 / Graphql
- 数据库了解程度
- Native 了解程度和经验，可以由native成员提问部分Native 问题
- 容器化经验
- 监控和数据打点
- 单元测试工具和原则
