## Type Coercion in JavaScript

Practice file: [Type Coercion Output Questions](./coercion-output-questions.md)

## 1) What is type coercion?

**Q: What is type coercion in JavaScript?**

A: Type coercion is the process of converting a value from one type to another (like string → number, number → boolean, etc.).

- Automatic conversion is called **implicit coercion**.
- Manual conversion is called **explicit coercion**.

---

## 2) Types of coercion

## A) Implicit Coercion (automatic)

JavaScript converts values automatically during operations.

```javascript
console.log("5" + 2); // "52"  (number -> string)
console.log("5" - 2); // 3     (string -> number)
console.log(true + 1); // 2     (boolean -> number)
```

## B) Explicit Coercion (manual)

You convert values intentionally using functions.

```javascript
console.log(Number("123")); // 123
console.log(String(123)); // "123"
console.log(Boolean(0)); // false
```

---

## 3) Coercion rules with examples

## String Rules

When `+` has a string, other values are usually converted to string.

```javascript
console.log("10" + 5); // "105"
console.log("Hello " + true); // "Hello true"
console.log("" + null); // "null"
```

## Number Rules

Arithmetic operators (`-`, `*`, `/`) try to convert operands to numbers.

```javascript
console.log("10" - "2"); // 8
console.log("6" * "7"); // 42
console.log("8" / "2"); // 4
console.log("abc" - 1); // NaN
```

## Boolean Rules

In numeric operations:

- `true` becomes `1`
- `false` becomes `0`

```javascript
console.log(true + true); // 2
console.log(false + 10); // 10
console.log(true * 5); // 5
```

In condition checks, values become truthy/falsy:

```javascript
console.log(Boolean("")); // false
console.log(Boolean("0")); // true
console.log(Boolean([])); // true
console.log(Boolean(0)); // false
```

## Array Rules

Arrays convert differently based on operation:

```javascript
console.log([] + []); // ""
console.log([] + 1); // "1"
console.log([1, 2] + [3, 4]); // "1,23,4"
console.log([10] - 5); // 5
console.log([1, 2] - 1); // NaN
```

Why?

- With `+`, arrays are often converted to strings (`[1,2] -> "1,2"`).
- With `-`, JavaScript tries numeric conversion.

## `null` and `undefined` Rules

```javascript
console.log(null + 1); // 1      (null -> 0)
console.log(undefined + 1); // NaN
console.log(null == undefined); // true
console.log(null === undefined); // false
```

---

## 4) Equality coercion (`==`) vs strict (`===`)

## `==` (loose equality)

Allows coercion before comparing.

```javascript
console.log("5" == 5); // true
console.log(false == 0); // true
console.log([] == ""); // true
```

## `===` (strict equality)

No coercion; both type and value must match.

```javascript
console.log("5" === 5); // false
console.log(false === 0); // false
console.log(null === undefined); // false
```

**Interview tip:** Prefer `===` to avoid unexpected coercion bugs.

---

## 5) Common tricky outputs

```javascript
console.log([] == ![]); // true
console.log("\t\n" == 0); // true
console.log("0" == false); // true
console.log("0" === false); // false
console.log(NaN == NaN); // false
console.log(Number.isNaN(NaN)); // true
```

---

## 6) Best practices

- Prefer `===` and `!==` for comparisons.
- Convert types explicitly with `Number()`, `String()`, `Boolean()`.
- Avoid relying on complex coercion in production code.
- Handle `null` and `undefined` carefully.
- For numeric input, validate with `Number.isNaN()`.

---

## Rapid Fire Interview Questions

**Q1: What is implicit coercion?**  
A: Automatic type conversion done by JavaScript.

**Q2: What is explicit coercion?**  
A: Manual conversion using `Number()`, `String()`, `Boolean()`.

**Q3: Why does `"5" + 2` return `"52"`?**  
A: `+` with a string performs string concatenation.

**Q4: Why does `"5" - 2` return `3`?**  
A: `-` forces numeric conversion.

**Q5: Is `null == undefined` true?**  
A: Yes, with loose equality.

**Q6: Is `null === undefined` true?**  
A: No, types are different.

**Q7: Is `NaN === NaN` true?**  
A: No. Use `Number.isNaN()` to check NaN.
