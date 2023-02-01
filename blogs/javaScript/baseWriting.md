---
title: JavaScript 更好的条件表达式你都知道吗？
date: 2021-09-27
tags:
 - JavaScript
categories:
 - JavaScript
---

我们在写JavaScript代码时，相同逻辑的代码可能会有很多不同的实现方式，和场景有关，也和代码习惯有关，可以选择一种习惯又舒服的方式来尽情的coding吧～


#### 1. 避免多个条件

可以用 switch 语句替换多个 if else 块以提高可读性。

```javascript
function onKeyPress(key) {
  if (key === 'a') {
    moveLeft();
  } else if (key === 'w') {
    moveTop( );
  } else if (key === 's') {
    moveDown( );
  } else if (key === 'd') {
    moveRight( );
  } else if (key === 'r') {
    bigMove( ); // 大招
  } else if (key === 'f') {
    flash( ); // 闪现
  }
}
```

可以更好地写成👇：

```javascript
function onKeyPress(key) {
  switch (key) {
    case 'a':
      moveLeft();
      break;
    case 'w':
      movelTop();
      break;
    case 's':
      moveDown():
      break;
    case 'd':
      moveRight();
      break;
    case 'r':
      bigMove(); // 大招
      break;
    case 'f':
      flash(); // 闪现
    break;
  }
}
```

但还有更好的方法。我们可以使用对象文字/映射以简洁的方式重写它：

```javascript
function onKeyPress(key) {
  const mapping = {
    a: moveLeft,
    w: movelTop,
    s: moveDown,
    d: moveRight,
    r: bigMove, // 大招
    f: flash, // 闪现
  };
  // 增加判断更友好的处理业务逻辑 
  if (Object.keys(mapping).includes(key)) {
    console.log(mapping[key]);
  }
}
```

对象字面量/字典是最简洁的实现形式，并且还通过向其添加键值来增加可扩展性的好处。


#### 2. 使用内置的 Array 方法

为了匹配多个条件，我们通常将代码写成：

```javascript
const isAnimal = animal => {
  if (animal === 'cat' || animal === 'dog'
    || animal === 'lion' || animal === 'bird') {
    return true;
  }
  return false;
};
```

但是我们可以使用内置的 Array.includes() 方法来做到这一点，而不必担心添加这么多“或”条件。

```javascript
const isAnimal = animal => {
  const animals = ['cat', 'dog', 'lion', 'bird'];
  return animals.includes(animal);
};
```

或者，如果我们正在处理对象数组并想要检查属性，我们可以使用 Array.some() 方法来检查是否满足条件：

```javascript
const isAnimal = name => {
  const animals = [
    { name: 'cat', legs: 4 },
    { name: 'dog', legs: 4 },
    { name: 'lion', legs: 4},
    { name: 'bird', legs: 2}
  ];
  return animals.some(animal => animal.name === name);
};
```

我们可以类似地使用 Array.every 来检查所有对象是否具有属性，或者使用 Array.find() 来执行一些逻辑。

#### 3. 使用默认值和解构
使用最新的 ECMAScript 特性总是一件好事。并且提供默认值消除了在初始化变量时对某些条件的需要。使用对象解构也是如此。

```javascript
const test = (animal, legs) => {
  if (!animal) return;
  const num_legs = legs || 0; // if legs not provided, default to zero
  console.log(`${animal} has ${num_legs} legs!`);
}
```

我们可以使用默认函数值来移除值初始化周围的条件。

```javascript
const test = (animal, legs = 0) => {
  if (!animal) return;
  console.log(`${animal} has ${num_legs} legs!`);
}
```

如果我们正在处理对象，我们可以使用解构运算符。从：

```javascript
const test = (animal) => { 
  // printing animal name if value provided
  if (animal && animal.name)  {
    console.log (animal.name);
  } else {
    console.log('unknown');
  }
}
```

可以改写为：

```javascript
function test({name} = {}) { 
    console.log (name || 'unknown');
}

```


这就是编写更好的条件表达式的全部内容。使用这些技术来编写更好的条件表达式，我们可以使我们的代码更清晰、更具可读性。如果您对如何编写更好的条件表达式有任何其他建议，请随时给予发表评论～