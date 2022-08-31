---
title: 浅谈：回调函数、async/await、Promises
date: 2021-12-06
tags:
 - JavaScript
categories:
 - JavaScript
---

正如我们所熟悉“**JavaScript是一种同步的、阻塞的、单线程的语言**”，Javascript执行是从上而下顺序执行的，浏览器只分配一个主线程给JavaScript，执行的时候会进入一个**任务队列**，后面的任务等待前面任务执行完了之后才开始执行。
## 为什么是单线程？
Javascript作为浏览器脚本语言，在浏览器环境中执行，承载着直接和用户交互的任务，必须对用户操作进行直接反馈。假如JavaScript是多线程的话，一个线程在某个DOM节点上进行了添加操作，其他线程在这个DOM节点上进行了编辑、删除……等操作，那么执行结果也就无从定论了，他的作用决定了他是单线程。
## JavaScript的异步处理？
在JavaScript执行中，我们往往会遇到一些需要等待某些值获取到之后，拿着这个值再去进行下一步操作，在JavaScript 这种单线程事件循环模型中，处理多个任务的时候就会排队执行，等待上个任务完成以后才会执行下一个任务，以此类推。但是，当其中某个任务执行时间过长，后面任务都必须排队等待，增加整个任务的执行时间。比如某个任务陷入“死循环”，后面任务都等不到这个“死循环”任务的值，阻塞线程执行，就会造成页面无响应。

## 同步与异步
### 同步
代码按照自上而下的顺序执行。当其中一段代码执行时间很长，后面的代码将会一直等待着他处理完才会执行

### 异步
代码执行过程中，遇到执行时间很长的任务，比如网络请求，加载图片等，期间主进程不用等待此类任务执行结果，主进程可继续执行下面的代码。此类任务完成后通知主进程，主进程再处理相应程序。

## JavaScript处理异步的几种方式

### 回调函数

ES6之前我们在JavaScript中写异步代码的方式就是回调函数，这种代码在代码量少的时候影响不大，但是逻辑变多的时候弊端就显现了出来，出现回调函数嵌套回调函数的问题，产生回调地狱。
1.高耦合，代码可读性差
2.后期可维护性差

```javascript
// 回调地狱
firstFn(function (a) {
    secondFn(a, function (b) {
        thirdFn(b, function (c) {
            forthFn(c, function (d) {
                fifthFn(d, function () {
                    // Do Something
                }, failureCallback);
            }, failureCallback);
        }, failureCallback);
    }, failureCallback);
}, failureCallback);
```

### Promise

#### 理解
在ES6中新增引入类型Promise，本质上 Promise 是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了
#### promise的三种状态

- 待定（pending）
- 兑现（fulfilled，有时候也称为“解决”，resolved） 
- 拒绝（rejected）

> 待定（pending）是期约的最初始状态。在待定状态下，期约可以落定（settled）为代表成功的兑现
（fulfilled）状态，或者代表失败的拒绝（rejected）状态。无论落定为哪种状态都是不可逆的。只要从待定转换为兑现或拒绝，期约的状态就不再改变。
>
> 以上定义引用自 JavaScript高级程序设计（第4版）


#### 基础示例

````
let myFirstPromise = new Promise(function(resolve, reject){
    //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
    //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
    setTimeout(function(){
        resolve("成功!"); //代码正常执行！
    }, 250);
});

myFirstPromise.then(function(successMessage){
    //successMessage的值是上面调用resolve(...)方法传入的值.
    //successMessage参数不一定非要是字符串类型，这里只是举个例子
    console.log("Yay! " + successMessage);
});
````

###### Promise实现

````
const processFn = (n) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 100), n);
    });
}

const step1 = (n) => {
    console.log(`step1 with ${n}`);
    return processFn(n);
}

const step2 = (n) => {
    console.log(`step2 with ${n}`);
    return processFn(n);
}

const step3 = (n) => {
    console.log(`step3 with ${n}`);
    return processFn(n);
}

// Promise方式
function runThis() {
    console.time("runThis");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("runThis");
        });
}

runThis();
````

#### async/await

> ES8 的 async/await 旨在解决利用异步结构组织代码的问题。为此，ECMAScript 对函数进行了扩展，
为其增加了两个新关键字：async 和 await。

```
// async await方式
const processFn = (n) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 100), n);
    });
}

const step1 = (n) => {
    console.log(`step1 with ${n}`);
    return processFn(n);
}

const step2 = (n) => {
    console.log(`step2 with ${n}`);
    return processFn(n);
}

const step3 = (n) => {
    console.log(`step3 with ${n}`);
    return processFn(n);
}

const runThis = async () => {
    console.time("runThis");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("runThis");
}

runThis();
```

