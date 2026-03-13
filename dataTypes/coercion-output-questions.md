## Type Coercion Output-Based Questions

Practice these before interviews. Try to guess the output first, then check the answer.

---

## 1) String + Number

**Q: What is the output?**

```javascript
console.log("5" + 2);
```

**Answer:**

```text
52
```

Because `+` with a string performs string concatenation.

---

## 2) String - Number

**Q: What is the output?**

```javascript
console.log("5" - 2);
```

**Answer:**

```text
3
```

Because `-` converts both operands to numbers.

---

## 3) Boolean + Number

**Q: What is the output?**

```javascript
console.log(true + 1);
console.log(false + 1);
```

**Answer:**

```text
2
1
```

Because `true` becomes `1` and `false` becomes `0`.

---

## 4) Empty Array + Empty Array

**Q: What is the output?**

```javascript
console.log([] + []);
```

**Answer:**

```text
""
```

Both arrays become empty strings.

---

## 5) Array + Number

**Q: What is the output?**

```javascript
console.log([] + 1);
console.log([1, 2] + 3);
```

**Answer:**

```text
"1"
"1,23"
```

Arrays are converted to strings with `+`.

---

## 6) Array - Number

**Q: What is the output?**

```javascript
console.log([10] - 5);
console.log([1, 2] - 1);
```

**Answer:**

```text
5
NaN
```

`[10]` becomes `10`, but `[1,2]` becomes `"1,2"`, which cannot convert to a valid number.

---

## 7) `null` and `undefined`

**Q: What is the output?**

```javascript
console.log(null + 1);
console.log(undefined + 1);
```

**Answer:**

```text
1
NaN
```

`null` becomes `0`, but `undefined` becomes `NaN` in numeric conversion.

---

## 8) Loose Equality Trap

**Q: What is the output?**

```javascript
console.log("5" == 5);
console.log(false == 0);
console.log(null == undefined);
```

**Answer:**

```text
true
true
true
```

Because `==` allows coercion.

---

## 9) Strict Equality

**Q: What is the output?**

```javascript
console.log("5" === 5);
console.log(false === 0);
console.log(null === undefined);
```

**Answer:**

```text
false
false
false
```

Because `===` checks both type and value.

---

## 10) `[] == ![]`

**Q: What is the output?**

```javascript
console.log([] == ![]);
```

**Answer:**

```text
true
```

Reason:

- `![]` becomes `false` because arrays are truthy.
- Then comparison becomes `[] == false`.
- Both get coerced to `0`.

---

## 11) Whitespace String Comparison

**Q: What is the output?**

```javascript
console.log("\t\n" == 0);
```

**Answer:**

```text
true
```

Whitespace string converts to `0`.

---

## 12) `NaN` Comparison

**Q: What is the output?**

```javascript
console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(Number.isNaN(NaN));
```

**Answer:**

```text
false
false
true
```

`NaN` is never equal to itself.

---

## 13) String Boolean Trap

**Q: What is the output?**

```javascript
console.log("0" == false);
console.log("0" === false);
```

**Answer:**

```text
true
false
```

`==` coerces, `===` does not.

---

## 14) Boolean Conversion

**Q: What is the output?**

```javascript
console.log(Boolean(""));
console.log(Boolean("0"));
console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean(0));
```

**Answer:**

```text
false
true
true
true
false
```

Empty string and `0` are falsy; arrays and objects are truthy.

---

## 15) Object String Conversion

**Q: What is the output?**

```javascript
console.log({} + []);
```

**Answer:**

```text
[object Object]
```

The object is converted to `"[object Object]"` and array to `""`.

---

## 16) Empty Array Equality

**Q: What is the output?**

```javascript
console.log([] == "");
console.log([] == 0);
```

**Answer:**

```text
true
true
```

The empty array becomes an empty string, and empty string becomes `0` in numeric comparison.

---

## 17) Single Element Array Equality

**Q: What is the output?**

```javascript
console.log([1] == 1);
console.log([1] === 1);
```

**Answer:**

```text
true
false
```

`[1]` becomes `"1"` and then `1` in loose comparison.

---

## 18) Multiple Element Array Equality

**Q: What is the output?**

```javascript
console.log([1, 2] == "1,2");
console.log([1, 2] == 12);
```

**Answer:**

```text
true
false
```

`[1,2]` becomes `"1,2"`, not `12`.

---

## 19) Explicit Conversion

**Q: What is the output?**

```javascript
console.log(Number("123"));
console.log(Number("123abc"));
console.log(String(true));
```

**Answer:**

```text
123
NaN
"true"
```

---

## 20) Mixed Expression

**Q: What is the output?**

```javascript
console.log("5" + 2 - 1);
console.log("5" - 2 + 1);
```

**Answer:**

```text
51
4
```

Reason:

- `"5" + 2` becomes `"52"`, then `"52" - 1` becomes `51`
- `"5" - 2` becomes `3`, then `3 + 1` becomes `4`

---

## Quick Tip

For interviews:

- First check whether `+` means concatenation.
- For `-`, `*`, `/`, think numeric conversion.
- Be careful with `==`.
- Arrays and objects usually convert through strings first.
