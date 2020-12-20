# Part1-01

> **Part 1 · JavaScript 深度剖析：**函数式编程与 JS 异步编程、手写 Promise

回调函数 回调地狱

异步统一规范——Promise

#### Promise概念：

Promise-》Pending-》

​	结果Fulfilled--动作onFulfilled

​	Rejiected--onRejiected

承诺结果不可变

#### Promise用法：

#### Promise使用案例：

Promise方式的Ajax：

#### Promise常见误区：

​	Promise的本质，使用回调函数定义的异步任务接数后所需执行的任务

​	回调函数用then传递进去

错误方法：连续嵌套——回调地狱

正确方法：Promise链式调用，异步任务扁平化

#### Promise链式调用：

链式调用，顺序执行then方法

- Promise对象的then方法会返回一个全新的Promise对象
- 后面的then方法就是在为上一个then返回的Promise注册回调？
- 前面then方法中回调函数的返回值会作为后面then方法回调的参数
  - 上一个返回Promise下一个接收Promise
  - 上一个返回值下一个接收到的是值
  - 上一个没返回下一个接收到的是undefined
- 如果回调中返回的是Promise，那后面then方法的回调会等待它的结束



#### Promise 异常处理：

then第二个参数和catch捕获异常的区别：

then第二个参数——只能捕获到第一个Promise 的异常

catch——可以捕获到上一个Promise 的异常（链式调用，可以捕获到链条上传递过来的异常）



捕获异常的位置：

不推荐全局捕获，在代码中捕获可能出现的异常



#### Promise 静态方法：

`Promise.resolve()`快速把一个值转换为Promise

- 传入值

等价于

```
new Promise(function (resolve, reject) {
  resolve('foo')
})
```

- 如果传入的是一个 Promise 对象，Promise.resolve 方法原样返回

- 对象定义then属性同

`Promise.resolve()`传入任何值，都会作为这个 Promise 失败的理由



#### Promise 串行/并行执行：

请求多个接口，接口之间无相互依赖

怎么判断所有请求都已经结束

传统：计算器==任务数

现在：`Promise.all()` 多个Promise合并为一个，等待所有都结束，都成功返回成功，有一个失败则失败



```
// 串行----------
// 入参——数组（元素是Promise对象）；出参--返回一个全新的Promise对象
var promise = Promise.all([
  ajax('/api/users.json'),
  ajax('/api/posts.json')
])

// 所有请求都成功才会走then，否则有一个失败就会失败
promise.then(function (values) {
	// values——数组：每个任务返回的结果
  console.log(values)
}).catch(function (error) {
  console.log(error)
})

// 并行-----------
```





`Promise.race()`有一个结束则结束

场景：ajax请求超时控制



#### **Promise 执行时序：**

Promise无异步调用也会进入队列等待

Promise执行时序比较特殊：

宏任务setTimeout——本轮任务结束进入回调队列末尾

- 大部分方法都是后任务

微任务Promise——本轮调用结束末尾立即执行（提高整体销效率）

	-  Promise
	-  MutationObserver
	-  node——process.NextTick



#### Generator 异步方案：

Promise的多个then写法不好

用Generator



