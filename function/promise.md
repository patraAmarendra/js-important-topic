## JavaScript Promises

According to MDN, a `Promise` object represents the eventual completion or failure of an asynchronous operation and its resulting value.

This note follows MDN terminology and explains promises in a simple study-note format.

---

## 1) What is a Promise?

A **promise** is the object returned by an asynchronous function when the final value is not available yet.

Instead of getting the result immediately, we get a promise and attach handlers that run later when the operation finishes.

Common examples:

- Network requests like `fetch()`
- Timers
- File or database operations

---

## 2) Why Promises Are Used

MDN explains that promises let us associate handlers with the eventual success value or failure reason of an asynchronous operation.

This helps because:

- We can attach success and error handlers with `.then()` and `.catch()`
- We can chain async steps more cleanly than nested callbacks
- We can combine multiple async operations with built-in promise methods

---

## 3) Promise States

MDN describes these promise states:

- **Pending**: the promise has not finished yet
- **Fulfilled**: the operation completed successfully
- **Rejected**: the operation failed

When a promise is either fulfilled or rejected, it is called **settled**.

---

## 4) Resolved vs Settled

One important MDN idea is that **resolved** is not exactly the same as **fulfilled**.

A promise is **resolved** when it is tied to another promise's result. That final result may still be pending for some time.

```javascript
const outer = new Promise((resolve) => {
  resolve(
    new Promise((innerResolve) => {
      setTimeout(() => innerResolve("done"), 1000);
    })
  );
});

outer.then((value) => console.log(value));
```

In this example:

- `outer` becomes resolved immediately
- It becomes fulfilled only when the inner promise fulfills

---

## 5) Creating a Promise

We can create a promise with the `Promise()` constructor.

The constructor receives an **executor** function with two callbacks:

- `resolve`
- `reject`

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Task completed");
  } else {
    reject(new Error("Task failed"));
  }
});
```

MDN generally uses the constructor when we need to wrap older async code that does not already return a promise.

---

## 6) Consuming a Promise

The main instance methods are:

- `.then()` for fulfillment
- `.catch()` for rejection
- `.finally()` for cleanup code that should run in either case

```javascript
myPromise
  .then((value) => {
    console.log("Success:", value);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  })
  .finally(() => {
    console.log("Promise finished");
  });
```

---

## 7) Basic Example

```javascript
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited ${ms} ms`);
    }, ms);
  });
}

wait(1000).then((message) => {
  console.log(message);
});
```

**Output after 1 second:**

```text
Waited 1000 ms
```

This follows the MDN pattern where a function returns a promise and the caller attaches handlers to it.

---

## 8) Chaining with `.then()`

MDN's promise guide emphasizes that `.then()` returns a **new promise**. That is why promise chaining works.

```javascript
Promise.resolve(2)
  .then((num) => {
    return num * 2;
  })
  .then((num) => {
    return num * 3;
  })
  .then((result) => {
    console.log(result);
  });
```

**Output:**

```text
12
```

Rules to remember:

- If you return a normal value from `.then()`, the next `.then()` gets that value
- If you throw an error, the chain moves to `.catch()`
- If you return another promise, the next step waits for it

---

## 9) Error Handling

MDN recommends using `.catch()` to handle rejections in a promise chain.

```javascript
Promise.resolve("start")
  .then(() => {
    throw new Error("Something went wrong");
  })
  .catch((error) => {
    console.log(error.message);
  });
```

**Output:**

```text
Something went wrong
```

---

## 10) Example with `fetch()`

MDN commonly uses `fetch()` as a real promise example because `fetch()` returns a promise.

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.title);
  })
  .catch((error) => {
    console.log("Fetch failed:", error);
  });
```

Here:

- `fetch()` returns a promise
- `response.json()` also returns a promise
- Each `.then()` waits for the previous promise to settle

---

## 11) Promise Concurrency Methods

MDN documents several static promise methods for running async work together.

### `Promise.all()`

Fulfills when all promises fulfill. Rejects if any one rejects.

```javascript
Promise.all([
  Promise.resolve("A"),
  Promise.resolve("B"),
  Promise.resolve("C"),
]).then((values) => {
  console.log(values);
});
```

**Output:**

```text
["A", "B", "C"]
```

### `Promise.allSettled()`

Waits for all promises and gives the result of each one, whether fulfilled or rejected.

```javascript
Promise.allSettled([
  Promise.resolve("success"),
  Promise.reject("failed"),
]).then((results) => {
  console.log(results);
});
```

### `Promise.race()`

Settles as soon as the first promise settles.

### `Promise.any()`

Fulfills as soon as the first promise fulfills. It rejects only if all promises reject.

---

## 12) Promises and the Microtask Queue

MDN explains that promise handlers do not run immediately during the current synchronous code.

They are queued to run after the current call stack is finished.

```javascript
console.log("start");

Promise.resolve().then(() => {
  console.log("promise callback");
});

console.log("end");
```

**Output:**

```text
start
end
promise callback
```

---

## 13) Promises with `async/await`

MDN treats `async/await` as syntax built on promises.

```javascript
async function getPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log(data.title);
  } catch (error) {
    console.log("Error:", error);
  }
}

getPost();
```

This is easier to read, but it still uses promises under the hood.

---

## 14) Important MDN-Based Points

- A promise represents a future result, not an immediate value
- Promise handlers can be attached to the returned promise object
- `.then()` always returns a new promise
- A promise can be pending, fulfilled, or rejected
- Fulfilled and rejected promises are settled
- Returning a promise from `.then()` makes the chain wait for it
- `fetch()` and `response.json()` both return promises
- `async/await` is built on top of promises

---

## 15) Interview Questions and Answers

**Q: What is a promise in JavaScript?**  
A: It is an object that represents the eventual completion or failure of an asynchronous operation and its resulting value.

**Q: What are the three promise states?**  
A: Pending, fulfilled, and rejected.

**Q: What does `.then()` return?**  
A: It returns a new promise.

**Q: What is the difference between resolved and fulfilled?**  
A: Fulfilled means success is final. Resolved means the promise is locked to another result, which could still be pending.

**Q: Does `fetch()` return a promise?**  
A: Yes.

---

## 16) Rapid Revision

- Promise = future result of an async operation
- States = pending, fulfilled, rejected
- Settled = fulfilled or rejected
- `.then()` handles success and returns a new promise
- `.catch()` handles rejection
- `.finally()` runs in both success and failure cases
- `Promise.all()` waits for all
- `Promise.race()` settles with the first settled promise
- `Promise.any()` fulfills with the first fulfilled promise
- `async/await` is promise-based syntax
