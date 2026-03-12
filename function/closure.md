## Closure in JavaScript

## 1) What is a closure?

**Q: What is a closure in JavaScript?**

A: A closure is created when an inner function remembers and can access variables from its outer (lexical) scope, even after the outer function has finished execution.

```javascript
function outer() {
  let count = 0;

  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

## 2) Why does closure work after outer function returns?

**Q: How can inner function still access outer variables?**

A: Because JavaScript keeps a reference to the outer lexical environment as long as the inner function exists.

```javascript
function greet(name) {
  return function () {
    console.log(`Hello, ${name}`);
  };
}

const sayHelloToAman = greet("Aman");
sayHelloToAman(); // Hello, Aman
```

## 3) What is lexical scope (related to closure)?

**Q: What is lexical scope?**

A: Lexical scope means variable access is determined by where functions are written in code, not where they are called.

```javascript
const globalVar = "I am global";

function outer() {
  const outerVar = "I am outer";

  function inner() {
    console.log(globalVar); // accessible
    console.log(outerVar); // accessible
  }

  inner();
}

outer();
```

## 4) What are practical uses of closure?

**Q: Where do we use closures in real projects?**

A: Common uses:

- Data privacy (private variables)
- Function factories
- Memoization / caching
- Event handlers and callbacks

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500)); // 1500
console.log(account.getBalance()); // 1500
// Cannot access balance directly: account.balance -> undefined
```

## 5) What is function factory using closure?

**Q: What is a function factory?**

A: A function factory returns customized functions by capturing configuration values through closure.

```javascript
function multiplyBy(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## 6) What is closure in loops (common interview trap)?

**Q: Why do all callbacks print same value with `var` in loop?**

A: `var` is function-scoped, so all callbacks share the same `i`. Use `let` (block-scoped) or an IIFE.

```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}
// Output: var: 4, var: 4, var: 4

for (let j = 1; j <= 3; j++) {
  setTimeout(() => console.log("let:", j), 100);
}
// Output: let: 1, let: 2, let: 3
```

## 7) What is IIFE solution for loop closure issue?

**Q: How do we fix loop closure issue without `let`?**

A: Use an IIFE to capture current value in each iteration.

```javascript
for (var i = 1; i <= 3; i++) {
  (function (current) {
    setTimeout(() => console.log(current), 100);
  })(i);
}
// Output: 1, 2, 3
```

## 8) Can closures cause memory leaks?

**Q: Are closures bad for memory?**

A: Not inherently. But if closures keep references to large unused objects for a long time, memory usage can grow unnecessarily.

```javascript
function handlerFactory() {
  const largeData = new Array(1000000).fill("data");

  return function () {
    console.log("Handler active");
    // largeData is still referenced by closure
  };
}

const handler = handlerFactory();
```

## 9) What is memoization using closure?

**Q: How does closure help in memoization?**

A: Closure stores a cache object so repeated inputs can return saved results.

```javascript
function memoizedSquare() {
  const cache = {};

  return function (n) {
    if (cache[n] !== undefined) return cache[n];
    cache[n] = n * n;
    return cache[n];
  };
}

const square = memoizedSquare();
console.log(square(4)); // 16 (calculated)
console.log(square(4)); // 16 (from cache)
```

## 10) What is closure vs block scope?

**Q: Is closure same as block scope?**

A: No.

- Block scope (`let`, `const`) controls variable visibility in `{}`.
- Closure is a function retaining access to outer scope variables over time.

## Rapid Fire (Closure)

**Q1: Closure means?**  
A: Inner function remembers outer scope variables.

**Q2: Is closure created at runtime or compile time?**  
A: Function is created at runtime; lexical scope is determined by code structure.

**Q3: Can closures access global variables?**  
A: Yes, through scope chain.

**Q4: Are closures only in nested functions?**  
A: Practically yes, because an inner function captures outer variables.

**Q5: One common use of closure?**  
A: Data hiding/private state.

**Q6: Biggest closure interview trap?**  
A: `var` in loops with async callbacks.

## Tricky Output-Based Questions (Closure)

## 1) Shared closure state

**Q: What is the output?**

```javascript
function outer() {
  let x = 10;
  return {
    inc() {
      x++;
      console.log(x);
    },
    dec() {
      x--;
      console.log(x);
    },
  };
}

const obj = outer();
obj.inc();
obj.inc();
obj.dec();
```

**Answer:**

```text
11
12
11
```

Both methods share the same closed-over variable `x`.

## 2) New closure per function call

**Q: What is the output?**

```javascript
function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const c1 = counter();
const c2 = counter();

c1();
c1();
c2();
```

**Answer:**

```text
1
2
1
```

`c1` and `c2` have different closure environments.

## 3) `var` in loop with `setTimeout`

**Q: What is the output?**

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

**Answer:**

```text
3
3
3
```

All callbacks share the same function-scoped `i`.

## 4) `let` in loop with `setTimeout`

**Q: What is the output?**

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

**Answer:**

```text
0
1
2
```

`let` creates a new block-scoped binding each iteration.

## 5) Parameter shadowing in closure

**Q: What is the output?**

```javascript
let x = 1;

function outer(x) {
  return function inner(y) {
    console.log(x + y);
  };
}

const fn = outer(5);
fn(2);
```

**Answer:**

```text
7
```

The inner function closes over outer parameter `x = 5`, not global `x = 1`.

## 6) Closure with reassigned outer variable

**Q: What is the output?**

```javascript
function test() {
  let name = "A";

  function print() {
    console.log(name);
  }

  name = "B";
  return print;
}

const p = test();
p();
```

**Answer:**

```text
B
```

Closure keeps reference to variable, not a snapshot of initial value.

## 7) IIFE closure fix

**Q: What is the output?**

```javascript
for (var i = 1; i <= 3; i++) {
  (function (n) {
    setTimeout(() => console.log(n), 0);
  })(i);
}
```

**Answer:**

```text
1
2
3
```

IIFE captures a new `n` for every iteration.

## 8) Function factory trap

**Q: What is the output?**

```javascript
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add10 = makeAdder(10);
console.log(add10(5));
console.log(makeAdder(2)(8));
```

**Answer:**

```text
15
10
```

Each created function remembers its own `x`.
