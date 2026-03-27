## Promises & Async/Await in JavaScript

## 1) What is a Promise?

**Q: What is a Promise in JavaScript?**

A: A Promise is an object representing the eventual completion or failure of an asynchronous operation. It acts as a placeholder for a value that is not yet available.

```javascript
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operation succeeded!");
  } else {
    reject("Operation failed!");
  }
});

promise
  .then((result) => console.log(result)) // Operation succeeded!
  .catch((error) => console.error(error));
```

## 2) What are the states of a Promise?

**Q: How many states does a Promise have?**

A: A Promise has exactly three states:

- **Pending** — initial state, neither fulfilled nor rejected.
- **Fulfilled** — the operation completed successfully; `resolve()` was called.
- **Rejected** — the operation failed; `reject()` was called.

Once a Promise transitions from `pending` to either `fulfilled` or `rejected`, it is **settled** and cannot change state again.

```javascript
// Pending → Fulfilled
const fulfilled = new Promise((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// Pending → Rejected
const rejected = new Promise((_, reject) => {
  setTimeout(() => reject(new Error("Failed!")), 1000);
});
```

## 3) What is `.then()`?

**Q: What does `.then()` do on a Promise?**

A: `.then()` registers a callback to run when the Promise is fulfilled. It receives the resolved value and always returns a new Promise, enabling chaining.

```javascript
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

## 4) What is `.catch()`?

**Q: What does `.catch()` do?**

A: `.catch()` registers a callback to run when the Promise is rejected. It is equivalent to `.then(null, onRejected)` and is the standard way to handle errors in a Promise chain.

```javascript
const promise = new Promise((_, reject) => {
  reject(new Error("Something went wrong"));
});

promise
  .then((value) => console.log(value))
  .catch((error) => console.error("Caught:", error.message));
// Output: Caught: Something went wrong
```

## 5) What is `.finally()`?

**Q: What does `.finally()` do?**

A: `.finally()` registers a callback that runs after the Promise settles (fulfilled or rejected), regardless of the outcome. It is useful for cleanup tasks like hiding a loading spinner.

```javascript
function fetchData() {
  return fetch("https://api.example.com/data")
    .then((res) => res.json())
    .catch((err) => console.error(err))
    .finally(() => console.log("Request complete — hiding loader"));
}
```

## 6) What is `Promise.all()`?

**Q: When would you use `Promise.all()`?**

A: `Promise.all()` takes an array of Promises and returns a single Promise that resolves when **all** input Promises resolve, or rejects as soon as **any one** rejects (fail-fast).

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then((values) => console.log(values));
// Output: [1, 2, 3]

// Fail-fast example
const p4 = Promise.reject(new Error("Oops"));
Promise.all([p1, p4, p3]).catch((err) => console.error(err.message));
// Output: Oops
```

## 7) What is `Promise.allSettled()`?

**Q: What is the difference between `Promise.all()` and `Promise.allSettled()`?**

A: `Promise.allSettled()` waits for **all** Promises to settle (regardless of outcome) and returns an array of result objects with `status` ("fulfilled" or "rejected") and `value` or `reason`. Unlike `Promise.all()`, it never short-circuits.

```javascript
const promises = [
  Promise.resolve("Success"),
  Promise.reject(new Error("Fail")),
  Promise.resolve("Another success"),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result) => console.log(result));
});
// { status: 'fulfilled', value: 'Success' }
// { status: 'rejected', reason: Error: Fail }
// { status: 'fulfilled', value: 'Another success' }
```

## 8) What is `Promise.race()`?

**Q: What does `Promise.race()` do?**

A: `Promise.race()` returns a Promise that settles as soon as the **first** input Promise settles, whether fulfilled or rejected.

```javascript
const slow = new Promise((resolve) => setTimeout(() => resolve("slow"), 3000));
const fast = new Promise((resolve) => setTimeout(() => resolve("fast"), 500));

Promise.race([slow, fast]).then((winner) => console.log(winner));
// Output: fast
```

## 9) What is `Promise.any()`?

**Q: What is the difference between `Promise.race()` and `Promise.any()`?**

A: `Promise.any()` returns the **first fulfilled** Promise, ignoring rejections. It only rejects if **all** Promises reject (throwing an `AggregateError`). `Promise.race()` settles on the first settled Promise — fulfilled or rejected.

```javascript
const p1 = Promise.reject(new Error("Error 1"));
const p2 = Promise.reject(new Error("Error 2"));
const p3 = Promise.resolve("First success!");

Promise.any([p1, p2, p3]).then((value) => console.log(value));
// Output: First success!

// All rejected
Promise.any([p1, p2]).catch((err) => console.error(err));
// AggregateError: All promises were rejected
```

## 10) What is `async/await`?

**Q: What is `async/await` and how does it relate to Promises?**

A: `async/await` is syntactic sugar built on top of Promises. An `async` function always returns a Promise. Inside it, `await` pauses execution until the awaited Promise settles, making asynchronous code look synchronous.

```javascript
async function getUserData(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
}

getUserData(1).then((data) => console.log(data));
```

## 11) How do you handle errors with `async/await`?

**Q: How do you handle errors in `async/await` code?**

A: Use a `try/catch` block. The `catch` block receives the rejection reason, similar to `.catch()` on a Promise chain.

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return null;
  } finally {
    console.log("Fetch attempt complete");
  }
}
```

## 12) Can you run multiple async operations in parallel with `async/await`?

**Q: How do you run multiple Promises concurrently with `async/await`?**

A: Use `Promise.all()` combined with `await` to run operations concurrently instead of sequentially.

```javascript
async function loadDashboard(userId) {
  // Sequential (slow) — each waits for the previous
  // const user = await fetchUser(userId);
  // const posts = await fetchPosts(userId);

  // Concurrent (fast) — both start at the same time
  const [user, posts] = await Promise.all([
    fetchUser(userId),
    fetchPosts(userId),
  ]);

  console.log(user, posts);
}
```

## Rapid Fire (Promises & Async/Await)

**Q1: What are the three states of a Promise?**  
A: Pending, Fulfilled, Rejected.

**Q2: Can a settled Promise change state?**  
A: No — once fulfilled or rejected, the state is final.

**Q3: What does `async` keyword do to a function?**  
A: It makes the function return a Promise automatically.

**Q4: What does `await` pause?**  
A: It pauses execution of the `async` function until the Promise settles.

**Q5: Which Promise combinator is fail-fast?**  
A: `Promise.all()`.

**Q6: Which combinator waits for all Promises regardless of outcome?**  
A: `Promise.allSettled()`.

**Q7: Which combinator resolves with the first fulfilled Promise?**  
A: `Promise.any()`.

**Q8: Which combinator settles with the first settled Promise (fulfilled or rejected)?**  
A: `Promise.race()`.

**Q9: Can you use `await` outside an `async` function?**  
A: At the module top-level (top-level await in ES2022+), yes. Otherwise, no.

**Q10: What is the `.finally()` callback used for?**  
A: Cleanup code that must run regardless of success or failure.

## Tricky Output-Based Questions (Promises)

## 1) Promise execution order

**Q: What is the output?**

```javascript
console.log("start");

const p = new Promise((resolve) => {
  console.log("inside promise");
  resolve("resolved");
});

p.then((val) => console.log(val));

console.log("end");
```

**Answer:**

```text
start
inside promise
end
resolved
```

The executor runs synchronously. `.then()` callbacks are microtasks, so they run after the current synchronous code finishes.

## 2) Chained `.then()` values

**Q: What is the output?**

```javascript
Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => x * 2)
  .then((x) => console.log(x));
```

**Answer:**

```text
4
```

`1 + 1 = 2`, then `2 * 2 = 4`.

## 3) Error propagation

**Q: What is the output?**

```javascript
Promise.resolve("start")
  .then((val) => {
    throw new Error("oops");
  })
  .then((val) => console.log("then:", val))
  .catch((err) => console.log("catch:", err.message));
```

**Answer:**

```text
catch: oops
```

Once a `.then()` throws, the error skips subsequent `.then()` handlers and is caught by `.catch()`.

## 4) `async/await` execution order

**Q: What is the output?**

```javascript
async function greet() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

console.log("1");
greet();
console.log("2");
```

**Answer:**

```text
1
A
2
B
```

`"A"` logs synchronously. `await` yields control, so `"2"` logs next. Then `"B"` logs as a microtask.

## 5) `Promise.all` with rejection

**Q: What is the output?**

```javascript
Promise.all([
  Promise.resolve("a"),
  Promise.reject("b"),
  Promise.resolve("c"),
])
  .then((values) => console.log("resolved:", values))
  .catch((err) => console.log("rejected:", err));
```

**Answer:**

```text
rejected: b
```

`Promise.all()` short-circuits on the first rejection.
