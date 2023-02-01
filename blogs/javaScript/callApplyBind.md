---
title: 代码实践call()、apply()、bind()使用及区别？
date: 2018-03-02
tags:
 - JavaScript
categories:
 - JavaScript
---

雁过无痕 叶落无声，希望在岁月的长河中，经历也可以有所留存，作为记录，送给广大的朋友，也送给未来的自己，回头看，有所收获～

## JavaScript中的call()方法

call()方法调用依赖于执行上下文，换句话说，可以将函数绑定到对象中，就好像它就是这个对象的属性一样。

```javascript
var obj = { num: 1 };
function add(v) {
	return this.num + v
}

add(2); 
//输出？： NaN 
//原因？： add()函数调用的时候this指向window，因为window对象中没有number属性，故undefined，故NaN。
```

上面代码我们可以看出，当我们想执行```add()```方法的时候，他返回this.num+v，但是函数内部没有属性num，因此调用this.num 失败。

我们不难看到对象上面有个属性num，那我们可以直接在对象上调用add()吗？，就好像它属于该对象一样。

我们可以用call()方法将函数add()暂时绑定到对象obj，改变函数add()调用时的this指向

``` add.call(obj, 3) //输出 4```

我们稍微改造一下函数，让函数接收多个参数

```javascript
var obj = { num: 1 };
function add(who,v) {
	return `${who} have ${this.num + v}` 
}
add.call(obj, 'She',3);
add.call(obj, 'He',5);
```

## JavaScript 中的 Apply() 方法

apply()方法与call()功能相同， 不同之处在于call()接受参数列表，但apply()接受参数数组。

```javascript
var obj = { num: 1 };
function add(who,v) {
	return `${who} have ${this.num + v}` 
}
add.apply(obj, ['She',3]);
add.apply(obj,  ['He',5]);
```
## JavaScript中的bind()方法

> bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。<br>--MDN

bind()方法使用后并不会立即调用，他会返回一个函数。
``` javascript
var obj = { num: 2 };

function add(a, b){
  return this.num + a + b;
}

const func = add.bind(obj, 3, 5);
func(); // 返回 10
```
我们再看下一个例子：
```javascript
let person = {
    name: 'John',
    getName: function() {
        console.log(this.name);
    }
};

window.setTimeout(person.getName, 1000);// 打印 空
```
可以看出，上面的例子并没有打印出person里面name的值而是直接输出**空**，这是为什么呢？

当window调用它的setTimeout()方法时，它的this对象就是window对象。因此，当setTimeout()调用函数person.getName()window对象中找不到这个函数，它不知道这个人的名字是什么。bind()要克服这个问题，请使用该方法将函数绑定到 person 对象。这样无论你在哪里调用函数，它仍然可以访问name.person

我们将上面的例子稍微改造一下：
``` javascript
let person = {
    name: 'John',
    getName: function() {
        console.log(this.name);
    }
};
let func = person.getName.bind(person);
window.setTimeout(func, 1000); // 打印 John
```
## 总结

```javascript
var obj = { num: 2 };

function add(a, b){
  return this.num + a + b;
}

const resultCall  = add.call(obj, 3, 5);
const resultApply = add.apply(obj, [3, 5]);
const funcBind    = add.bind(obj, 3, 5)
const resultBind  = funcBind();

console.log(resultCall, resultApply, resultBind);
```
新年第一发，如有疏漏还望给予指正～


