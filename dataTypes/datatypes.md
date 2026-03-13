## JavaScript Data Types, Hoisting, Scope, and `typeof`

This guide is written for interview preparation and deep conceptual clarity.

---

## 1) How many data types are there in JavaScript?

Modern JavaScript has **8 data types**:

## Primitive Types (7)

1. `string`
2. `number`
3. `bigint`
4. `boolean`
5. `undefined`
6. `symbol`
7. `null` (primitive value, special behavior with `typeof`)

## Non-Primitive Type (1)

8. `object` (includes arrays, functions, dates, maps, sets, etc.)

---

## 2) Explain data types with examples

```javascript
const name = "Aman"; // string
const age = 25; // number
const big = 9007199254740993n; // bigint
const isActive = true; // boolean
let city; // undefined
const id = Symbol("id"); // symbol
const empty = null; // null
const user = { name: "Aman" }; // object
const arr = [1, 2, 3]; // object (array)
const fn = function () {}; // object (function)
```

### Quick check with `typeof`

```javascript
console.log(typeof name); // "string"
console.log(typeof age); // "number"
console.log(typeof big); // "bigint"
console.log(typeof isActive); // "boolean"
console.log(typeof city); // "undefined"
console.log(typeof id); // "symbol"
console.log(typeof empty); // "object" (historical bug)
console.log(typeof user); // "object"
console.log(typeof arr); // "object"
console.log(typeof fn); // "function"
```

---

## 3) What is hoisting?

**Hoisting** is JavaScript behavior where declarations are conceptually moved to the top of their scope before execution.

### `var` hoisting

```javascript
console.log(a); // undefined (not ReferenceError)
var a = 10;
```

`var` is hoisted and initialized with `undefined`.

### `let` and `const` hoisting (TDZ)

```javascript
console.log(b); // ReferenceError
let b = 20;
```

`let` and `const` are hoisted but stay in the **Temporal Dead Zone (TDZ)** until their declaration line executes.

### Function hoisting

```javascript
sayHello(); // works

function sayHello() {
  console.log("Hello");
}
```

Function declarations are fully hoisted.

---

## 4) What is scoping?

Scope defines where a variable is accessible.

Main scopes in JavaScript:

- Global scope
- Function scope
- Block scope
- Lexical scope

```javascript
const globalVar = "global";

function outer() {
  const functionVar = "function";

  if (true) {
    const blockVar = "block";
    console.log(globalVar); // accessible
    console.log(functionVar); // accessible
    console.log(blockVar); // accessible
  }

  // console.log(blockVar); // ReferenceError
}
```

---

## 5) Function scope vs block scope

## Function Scope

- Created by functions.
- `var` is function-scoped.

```javascript
function demo() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10
}
```

## Block Scope

- Created by `{}` blocks (`if`, `for`, `while`, etc.).
- `let` and `const` are block-scoped.

```javascript
if (true) {
  let y = 20;
  const z = 30;
  console.log(y, z); // 20 30
}

// console.log(y, z); // ReferenceError
```

---

## 6) What is `typeof` operator?

`typeof` returns a string indicating the type of operand.

```javascript
console.log(typeof "JS"); // "string"
console.log(typeof 123); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof Symbol("x")); // "symbol"
console.log(typeof 10n); // "bigint"
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof function () {}); // "function"
console.log(typeof null); // "object" (known legacy behavior)
```

### Important interview note

Use `Array.isArray(value)` to detect arrays:

```javascript
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false
```

### Why is `typeof undefined` "undefined" but `typeof null` "object"?

**Q: Why does JavaScript return different results for `undefined` and `null` in `typeof`?**

A:

- `undefined` is a built-in primitive type in JavaScript, so `typeof undefined` correctly returns `"undefined"`.
- `null` is also a primitive value, but `typeof null` returns `"object"` because of a **legacy bug** from the first JavaScript implementation.

In early engines, values were stored with type tags, and `null` got the same tag as objects. That behavior became part of the language and could not be changed later without breaking old web code.

```javascript
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (legacy behavior)
```

**Interview-safe way to check `null`:**

```javascript
const value = null;

console.log(value === null); // true
console.log(typeof value); // "object"
```

---

## 7) Tricky interview questions (with answers)

## Q1) What is output?

```javascript
console.log(typeof null);
```

**Answer:** `"object"`

Reason: Historical bug in JavaScript.

## Q2) What is output?

```javascript
console.log(typeof NaN);
```

**Answer:** `"number"`

## Q3) What is output?

```javascript
console.log(typeof []);
console.log(typeof {});
```

**Answer:**

```text
object
object
```

## Q4) What is output?

```javascript
console.log(a);
var a = 5;
```

**Answer:** `undefined`

## Q5) What is output?

```javascript
console.log(b);
let b = 5;
```

**Answer:** `ReferenceError` (TDZ)

## Q6) What is output?

```javascript
var x = 1;
function test() {
  console.log(x);
  var x = 2;
}
test();
```

**Answer:** `undefined`

Reason: `var x` inside function is hoisted, shadows outer `x`.

## Q7) What is output?

```javascript
if (true) {
  var p = 10;
  let q = 20;
}
console.log(p);
console.log(q);
```

**Answer:**

- `console.log(p)` → `10`
- `console.log(q)` → `ReferenceError`

## Q8) What is output?

```javascript
console.log(typeof undeclaredVar);
```

**Answer:** `"undefined"`

Unlike direct access (`undeclaredVar`) which throws `ReferenceError`.

---

## Rapid Fire Revision

- Total data types in JS: **8**
- Primitive types: **7**
- Non-primitive: **object**
- `typeof null` is **"object"**
- `typeof function(){}` is **"function"**
- `var` is **function-scoped**
- `let/const` are **block-scoped**
- Prefer `let`/`const` over `var`

---

## Best Practices for Interviews

- Explain with short code + output.
- Mention TDZ when discussing `let/const` hoisting.
- Clearly separate hoisting of declaration vs initialization.
- Use `Array.isArray()` for arrays, not `typeof`.
