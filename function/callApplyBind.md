## call, apply, bind in JavaScript

These three methods are used to control the value of `this` when calling a function.

## 1) What is `call()`?

**Q: What is `call()`?**

A: `call()` invokes a function immediately and lets you set `this` explicitly. Arguments are passed one by one.

```javascript
function introduce(city, country) {
  console.log(`I am ${this.name} from ${city}, ${country}`);
}

const person = { name: "Aman" };

introduce.call(person, "Delhi", "India");
// Output: I am Aman from Delhi, India
```

## 2) What is `apply()`?

**Q: What is `apply()`?**

A: `apply()` also invokes a function immediately and sets `this`, but arguments are passed as an array (or array-like object).

```javascript
function introduce(city, country) {
  console.log(`I am ${this.name} from ${city}, ${country}`);
}

const person = { name: "Aman" };

introduce.apply(person, ["Mumbai", "India"]);
// Output: I am Aman from Mumbai, India
```

## 3) What is `bind()`?

**Q: What is `bind()`?**

A: `bind()` does not execute immediately. It returns a new function with `this` permanently bound (and optionally pre-filled arguments).

```javascript
function introduce(city, country) {
  console.log(`I am ${this.name} from ${city}, ${country}`);
}

const person = { name: "Aman" };

const boundIntroduce = introduce.bind(person, "Bengaluru");
boundIntroduce("India");
// Output: I am Aman from Bengaluru, India
```

## 4) Which one is faster and why?

**Q: Which one is faster among `call`, `apply`, and `bind`?**

A: In modern JavaScript engines, performance differences are usually very small and not important for most applications.

- `call()` can be slightly faster than `apply()` when passing a few known arguments because there is no array unpacking.
- `apply()` may add small overhead due to array handling.
- `bind()` creates a new function first, so there is an extra creation step before execution.

**Interview tip:** Choose based on readability and use case, not micro-optimizations.

## 5) Why are there 3 ways if they look similar?

**Q: Why do we need all three methods?**

A: They solve related but different use cases:

- Use `call()` when you want immediate execution with arguments listed individually.
- Use `apply()` when your arguments are already in an array.
- Use `bind()` when you need a reusable function with fixed `this` for later execution (for example event handlers, callbacks, timers).

## Quick Comparison

| Method    | Executes Immediately | Arguments Format            | Returns            |
| --------- | -------------------- | --------------------------- | ------------------ |
| `call()`  | Yes                  | `fn.call(thisArg, a, b)`    | Function result    |
| `apply()` | Yes                  | `fn.apply(thisArg, [a, b])` | Function result    |
| `bind()`  | No                   | `fn.bind(thisArg, a, b)`    | New bound function |

## More Interview Questions

## 6) Can we borrow methods using `call()`?

**Q: What is method borrowing with `call()`?**

A: Method borrowing means using a method from one object on another object by changing `this`.

```javascript
const user1 = {
  name: "Aman",
  greet: function () {
    return `Hello, ${this.name}`;
  },
};

const user2 = { name: "Riya" };

console.log(user1.greet.call(user2));
// Output: Hello, Riya
```

## 7) What happens if we pass `null` or `undefined` as `thisArg`?

**Q: How do `call/apply/bind` behave with `null` or `undefined`?**

A: In non-strict mode, `this` falls back to the global object (`window` in browsers). In strict mode, `this` stays `null` or `undefined`.

```javascript
function showThis() {
  "use strict";
  console.log(this);
}

showThis.call(null); // Output: null
```

## 8) Can `bind()` be rebound?

**Q: If a function is already bound, can we change `this` again?**

A: No. Once a function is bound using `bind()`, its `this` value cannot be changed by another `bind()`, `call()`, or `apply()`.

```javascript
function show() {
  console.log(this.name);
}

const f1 = show.bind({ name: "First" });
const f2 = f1.bind({ name: "Second" });

f2();
// Output: First
```

## 9) Can we use `bind()` for partial application?

**Q: How does `bind()` help in partial application?**

A: `bind()` can pre-fill some arguments and return a new function that accepts the remaining arguments.

```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

console.log(double(5));
// Output: 10
```

## 10) What is the difference between arrow functions and `bind()` for `this`?

**Q: Why is `bind()` not useful with arrow functions?**

A: Arrow functions do not have their own `this`; they capture `this` from the surrounding scope. So `call/apply/bind` cannot change arrow function `this`.

```javascript
const obj = {
  value: 10,
  regular: function () {
    return this.value;
  },
  arrow: () => this.value,
};

console.log(obj.regular.bind({ value: 20 })()); // 20
console.log(obj.arrow.bind({ value: 20 })()); // undefined (or global value)
```

## 11) What is a common real-world use of `bind()`?

**Q: Where do we use `bind()` in real projects?**

A: A common use is event handlers and callbacks, where function context may be lost.

```javascript
const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log(this.count);
  },
};

const inc = counter.increment.bind(counter);
setTimeout(inc, 1000);
// Output after 1s: 1
```

## 12) What is the modern alternative to `apply()` for arrays?

**Q: Should we still use `apply()` when passing array arguments?**

A: You can, but with ES6+ spread syntax, many cases are cleaner with direct calls.

```javascript
const nums = [4, 8, 1, 9];

console.log(Math.max.apply(null, nums)); // 9
console.log(Math.max(...nums)); // 9 (modern)
```

## Rapid Fire Interview Questions

**Q1: Which method executes immediately: `bind()` or `call()`?**  
A: `call()` executes immediately; `bind()` returns a new function.

**Q2: Which method takes arguments as an array?**  
A: `apply()`.

**Q3: Can `bind()` change `this` after function creation?**  
A: No, it permanently binds `this` for that returned function.

**Q4: Do arrow functions have their own `this`?**  
A: No, they capture `this` lexically from outer scope.

**Q5: Can `call()` and `apply()` be used for method borrowing?**  
A: Yes, both can invoke a method with another object as `this`.

**Q6: Which is preferred if arguments are already in an array?**  
A: `apply()` (or spread syntax in modern JavaScript).

**Q7: What does `bind()` return?**  
A: A new bound function.

**Q8: Can you do partial application with `bind()`?**  
A: Yes, by pre-filling initial arguments.

**Q9: Is performance difference between `call()` and `apply()` a major concern?**  
A: Usually no; choose based on readability and use case.

**Q10: What happens to `this` in strict mode when `call(null)` is used?**  
A: `this` remains `null`.

**Q11: What happens to `this` in non-strict mode when `call(null)` is used?**  
A: `this` falls back to global object (`window` in browsers).

**Q12: Can `call()` be used on built-in functions?**  
A: Yes, for example `Array.prototype.slice.call(arguments)`.
