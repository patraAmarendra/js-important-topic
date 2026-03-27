## `this` Keyword in JavaScript

## 1) What is `this` in JavaScript?

**Q: What is `this` in JavaScript?**

A: `this` is a special keyword that refers to the **execution context** — the object that is currently executing the code. Its value is determined **dynamically at runtime** (not at the point where a function is written), except for arrow functions, which capture `this` from the surrounding lexical scope.

```javascript
const user = {
  name: "Aman",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

user.greet(); // Hello, Aman
// 'this' inside greet() refers to the user object
```

## 2) What is `this` in the global scope?

**Q: What does `this` refer to in the global scope?**

A: In the browser, `this` in the global scope refers to `window`. In Node.js, it refers to the `global` object (or `module.exports` at the top level of a module).

```javascript
// In a browser
console.log(this === window); // true

// In Node.js (global scope)
console.log(this === globalThis); // true in global scripts
```

## 3) What is `this` in a regular function?

**Q: What does `this` refer to inside a regular function?**

A: In **non-strict mode**, `this` inside a regular function called without an explicit context falls back to the global object. In **strict mode**, it is `undefined`.

```javascript
function showThis() {
  console.log(this);
}

showThis(); // window (non-strict) or undefined (strict mode)

function strictShowThis() {
  "use strict";
  console.log(this);
}

strictShowThis(); // undefined
```

## 4) What is `this` in an object method?

**Q: What does `this` refer to inside an object method?**

A: `this` refers to the object that **owns** the method — the object to the left of the dot at call time.

```javascript
const car = {
  brand: "Toyota",
  getBrand() {
    return this.brand;
  },
};

console.log(car.getBrand()); // Toyota

// Losing context
const fn = car.getBrand;
console.log(fn()); // undefined (this is global/undefined in strict mode)
```

## 5) What is `this` in arrow functions?

**Q: How does `this` behave in arrow functions?**

A: Arrow functions do **not** have their own `this`. They capture `this` from the **enclosing lexical scope** at the time they are defined. This makes them useful inside callbacks where you want to preserve the outer `this`.

```javascript
const timer = {
  seconds: 0,
  start() {
    // Arrow function captures 'this' from start()
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  },
};

timer.start(); // 1, 2, 3, ...

// Compare with regular function (broken)
const timerBroken = {
  seconds: 0,
  start() {
    setInterval(function () {
      // 'this' here is window/undefined — not timerBroken
      this.seconds++;
    }, 1000);
  },
};
```

## 6) What is `this` in event listeners?

**Q: What does `this` refer to in a DOM event listener?**

A: In a regular function event handler, `this` refers to the **DOM element** that received the event. Arrow functions lose this behavior because they inherit `this` from the outer scope.

```javascript
const button = document.querySelector("button");

// Regular function — 'this' is the button element
button.addEventListener("click", function () {
  console.log(this); // <button> element
  this.textContent = "Clicked!";
});

// Arrow function — 'this' is the outer scope (e.g., window)
button.addEventListener("click", () => {
  console.log(this); // window (not the button!)
});
```

## 7) Explicit binding with `call()`, `apply()`, and `bind()`

**Q: How do `call`, `apply`, and `bind` affect `this`?**

A: These three methods allow you to explicitly set what `this` refers to when invoking a function.

```javascript
function introduce(city) {
  console.log(`I am ${this.name} from ${city}`);
}

const person = { name: "Aman" };

introduce.call(person, "Delhi");            // I am Aman from Delhi
introduce.apply(person, ["Mumbai"]);        // I am Aman from Mumbai

const boundFn = introduce.bind(person, "Bangalore");
boundFn();                                  // I am Aman from Bangalore
```

## 8) What is `this` inside a class?

**Q: How does `this` behave inside a class?**

A: Inside a class, `this` refers to the **instance** created by `new`. Methods defined in a class body are placed on the prototype and receive the instance as `this` when called on the instance.

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log(this.count);
  }
}

const c = new Counter();
c.increment(); // 1
c.increment(); // 2

// Losing context
const inc = c.increment;
// inc(); // TypeError: Cannot read properties of undefined (strict mode)
```

## 9) How do you fix `this` context loss in callbacks?

**Q: What are the common ways to preserve `this` in a callback?**

A: Three common approaches:

1. Use an arrow function (captures outer `this` lexically).
2. Use `.bind(this)` to create a bound function.
3. Store `this` in a variable like `const self = this` (older pattern).

```javascript
class Printer {
  constructor(name) {
    this.name = name;
  }

  // 1. Arrow function
  printArrow() {
    setTimeout(() => {
      console.log("Arrow:", this.name);
    }, 100);
  }

  // 2. bind
  printBind() {
    setTimeout(
      function () {
        console.log("Bind:", this.name);
      }.bind(this),
      100
    );
  }

  // 3. Self pattern
  printSelf() {
    const self = this;
    setTimeout(function () {
      console.log("Self:", self.name);
    }, 100);
  }
}

const p = new Printer("Aman");
p.printArrow(); // Arrow: Aman
p.printBind();  // Bind: Aman
p.printSelf();  // Self: Aman
```

## Rapid Fire (`this` keyword)

**Q1: What determines the value of `this`?**  
A: How a function is **called**, not where it is defined (except arrow functions).

**Q2: What is `this` in strict mode inside a standalone function call?**  
A: `undefined`.

**Q3: Do arrow functions have their own `this`?**  
A: No — they inherit `this` from the enclosing lexical scope.

**Q4: What does `new` do to `this`?**  
A: Binds `this` to the newly created object.

**Q5: Can you change `this` of an arrow function with `bind()`?**  
A: No — `call/apply/bind` have no effect on arrow function's `this`.

**Q6: In an event listener with a regular function, what is `this`?**  
A: The DOM element that received the event.

**Q7: If a method is extracted from an object and called standalone, what is `this`?**  
A: The global object (or `undefined` in strict mode) — context is lost.

**Q8: What does `bind()` return?**  
A: A new function with `this` permanently set.

## Tricky Output-Based Questions (`this`)

## 1) Method context loss

**Q: What is the output?**

```javascript
const obj = {
  value: 42,
  getValue() {
    return this.value;
  },
};

const fn = obj.getValue;
console.log(fn());
```

**Answer:**

```text
undefined
```

`fn` is called without a receiver, so `this` is the global object (or `undefined` in strict mode). `window.value` is `undefined`.

## 2) Arrow function `this`

**Q: What is the output?**

```javascript
const obj = {
  value: 10,
  regularFn: function () {
    return this.value;
  },
  arrowFn: () => {
    return this.value;
  },
};

console.log(obj.regularFn()); // ?
console.log(obj.arrowFn());   // ?
```

**Answer:**

```text
10
undefined
```

`regularFn` has `this` = `obj`, so `this.value` is `10`. `arrowFn` captures `this` from the outer scope (global), where `value` is `undefined`.

## 3) Nested function `this`

**Q: What is the output?**

```javascript
const person = {
  name: "Aman",
  outer() {
    function inner() {
      console.log(this.name);
    }
    inner();
  },
};

person.outer();
```

**Answer:**

```text
undefined
```

`inner` is a regular function called without a receiver, so `this` is the global object. `global.name` is `undefined` (or an empty string in browsers).

## 4) Arrow function inside method

**Q: What is the output?**

```javascript
const person = {
  name: "Aman",
  outer() {
    const inner = () => {
      console.log(this.name);
    };
    inner();
  },
};

person.outer();
```

**Answer:**

```text
Aman
```

The arrow function captures `this` from `outer()`, where `this` is `person`.

## 5) `call()` overrides `this`

**Q: What is the output?**

```javascript
function greet() {
  console.log(`Hello, ${this.name}`);
}

greet.call({ name: "Riya" });
greet.call({ name: "Sam" });
```

**Answer:**

```text
Hello, Riya
Hello, Sam
```

`call()` sets `this` explicitly for each invocation.

## 6) `bind()` creates a fixed `this`

**Q: What is the output?**

```javascript
function show() {
  console.log(this.x);
}

const obj1 = { x: 1 };
const obj2 = { x: 2 };

const bound = show.bind(obj1);
bound();
bound.call(obj2); // Does call() override the bound this?
```

**Answer:**

```text
1
1
```

Once bound, `this` cannot be overridden — even by `call()` or `apply()`.

## 7) `this` with `new`

**Q: What is the output?**

```javascript
function Person(name) {
  this.name = name;
}

const a = new Person("Alice");
const b = new Person("Bob");

console.log(a.name);
console.log(b.name);
```

**Answer:**

```text
Alice
Bob
```

`new` creates a fresh object for each call and binds `this` to it.
