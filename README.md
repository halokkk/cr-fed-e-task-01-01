## 模块一：函数式编程与JS异步编程、手写Promise
******
### 【简答题】
####  一、谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务？	
答：
##### 1. JS异步编程：
- **同步：**JS是单线程模式，每次只能执行一个任务，每个任务顺序执行，只有前面任务结束才开始下一个任务（**注意：**同步并不是同时执行，而是排队执行）。
```

```
- **JS异步编程：**为了避免耗时任务阻塞进程或者影响效率（用户看到页面卡死或者卡顿），可以将耗时任务放在子线程，不用等待耗时任务接数才开始下个任务，耗时任务结束后通过回调函数对其结果进行操作。
> https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/%E6%A6%82%E5%BF%B5
 
##### 2.EventLoop、消息队列都是做什么的：
**EventLoop（事件循环）：**
- 监听调用栈和消息队列
- 调用栈所有任务结束，EventLoop从消息队列取出第一个回调函数，压入调用栈
- 直到调用栈和消息队列都没任务，结束

**消息队列：**
- 调用栈是正在执行的列表，消息队列是待办列表
- 消息队列中的任务排队等待事件循环


##### 3.什么宏任务，什么是微任务：

宏任务：消息队列中的每个任务都是宏任务
setTimeout，setInterval，setImmediate，requestAnimationFrame?，I/O，UI rendering
微任务：每个宏任务对应都有一个微任务队列
process.nextTick，Promise，Object.observe，MutationObserver

```
setTimeout(function () {
   console.log('1')
}); //宏任务

new Promise(function (resolve) {
   console.log('2');
   resolve();
}).then(function () { //then、微任务
   console.log('3')
});

console.log('4');
// 2、4、3、1
```

