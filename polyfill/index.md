<!-- what is polyfill in js
why it is important
where we have used it in daily coding
 -->

## What is a Polyfill in JavaScript?

**Q: What is a polyfill?**

A: A polyfill is a piece of code that provides modern functionality to older browsers that don't natively support it. It mimics the behavior of newer JavaScript features.

```javascript
// Polyfill for Array.includes() (ES2016)
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}
```

## Why is a Polyfill Important?

**Q: Why do we need polyfills?**

A: Polyfills ensure cross-browser compatibility by allowing developers to use modern JavaScript features without worrying about older browser support. They bridge the gap between new standards and legacy environments.

```javascript
// Polyfill for Promise (older browsers)
if (typeof Promise === "undefined") {
  // Implement Promise functionality
}
```

## What is Transpilation in JavaScript?

**Q: What is transpilation?**

A: Transpilation is the process of converting code from one version of a language to another version of the same language. In JavaScript, tools like Babel transpile modern ES6+ code into ES5 so that it works in older browsers.

```javascript
// ES6+ code (input)
const greet = (name = "Guest") => `Hello, ${name}!`;

// Babel-transpiled ES5 code (output)
var greet = function greet() {
  var name =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Guest";
  return "Hello, " + name + "!";
};
```

**Q: What is `arguments` here?**

A: In JavaScript, `arguments` is a built-in array-like object available inside regular functions. It contains all values passed to that function.

**Key points:**

- It is array-like (has indexes and `length`) but not a real array.
- `arguments[0]` is the first argument, `arguments[1]` is the second, and so on.
- `arguments.length` tells how many arguments were passed.
- It is available in regular functions, not in arrow functions.

```javascript
function demo() {
  console.log(arguments.length); // number of passed arguments
  console.log(arguments[0]); // first argument
}

demo("JavaScript", 2026);
// Output:
// 2
// "JavaScript"
```

In the transpiled code above, Babel uses `arguments` to recreate default parameter behavior from ES6 in ES5.

## Where Do We Use Polyfills in Daily Coding?

**Q: What are common polyfills used in production?**

A: Common examples include:

- `fetch()` API polyfills for older browsers
- `Promise` polyfills for IE11
- `Object.assign()` for object manipulation
- `String.prototype.padStart()` for string operations

```javascript
// Polyfill for fetch API
if (!window.fetch) {
  window.fetch = function (url) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.response);
      xhr.send();
    });
  };
}
```

## Common Polyfill Examples

### Array Iteration Methods

**Note:** Array methods like `map()`, `filter()`, and `reduce()` do not modify the original array. They iterate over each element and return a new array with the transformed or filtered results.

````javascript
// Polyfill for Array.prototype.map()
**Note:** Array methods like `map()`, `filter()`, and `reduce()` do not modify the original array. They iterate over each element and return a new array with the transformed or filtered results.

if (!Array.prototype.map) {
    ```javascript
        // map() callback receives: current element, index, original array
    ```
  Array.prototype.map = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }
    return result;
  };
}

// Polyfill for Array.prototype.filter()
**Filter Key points:**
- Returns a new array
- Does not modify the original array
- Runs the callback for each element
- Adds elements only if the callback returns `true`

if (!Array.prototype.filter) {
  Array.prototype.filter = function (callback) {
    ```javascript
        // filter() callback receives: current element, index, original array
    ```
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
}

// Polyfill for Array.prototype.reduce()
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;
    if (accumulator === undefined) {
      accumulator = this[0];
      startIndex = 1;
    }
    for (let i = startIndex; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
  };
}

// Polyfill for Array.prototype.forEach()
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };
}

// Polyfill for Array.prototype.some()
if (!Array.prototype.some) {
  Array.prototype.some = function (callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) return true;
    }
    return false;
  };
}

// Polyfill for Array.prototype.every()
if (!Array.prototype.every) {
  Array.prototype.every = function (callback) {
    for (let i = 0; i < this.length; i++) {
      if (!callback(this[i], i, this)) return false;
    }
    return true;
  };
}
````

### Array Methods

```javascript
// Polyfill for Array.prototype.find()
if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i], i, this)) return this[i];
    }
    return undefined;
  };
}

// Polyfill for Array.prototype.findIndex()
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i], i, this)) return i;
    }
    return -1;
  };
}
```

### Object Methods

```javascript
// Polyfill for Object.assign()
if (typeof Object.assign !== "function") {
  Object.assign = function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
}
```

### String Methods

```javascript
// Polyfill for String.prototype.padStart()
if (!String.prototype.padStart) {
  String.prototype.padStart = function (length, fill = " ") {
    return (fill.repeat(length) + this).slice(-length);
  };
}

// Polyfill for String.prototype.includes()
if (!String.prototype.includes) {
  String.prototype.includes = function (search) {
    return this.indexOf(search) !== -1;
  };
}
```

### Function Methods

```javascript
// Polyfill for Function.prototype.call()
if (!Function.prototype.call) {
  Function.prototype.call = function (thisArg) {
    const args = Array.prototype.slice.call(arguments, 1);
    thisArg.fn = this;
    const result = thisArg.fn(...args);
    delete thisArg.fn;
    return result;
  };
}

// Polyfill for Function.prototype.apply()
if (!Function.prototype.apply) {
  Function.prototype.apply = function (thisArg, argsArray) {
    thisArg.fn = this;
    const result = thisArg.fn(...(argsArray || []));
    delete thisArg.fn;
    return result;
  };
}

// Polyfill for Function.prototype.bind()
if (!Function.prototype.bind) {
  Function.prototype.bind = function (thisArg) {
    const fn = this;
    const args = Array.prototype.slice.call(arguments, 1);
    return function (...newArgs) {
      return fn.apply(thisArg, args.concat(newArgs));
    };
  };
}
```

### Array Static Methods

```javascript
// Polyfill for Array.isArray()
if (!Array.isArray) {
  Array.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
}

// Polyfill for Array.from()
if (!Array.from) {
  Array.from = function (arrayLike, mapFn) {
    const arr = [];
    for (let i = 0; i < arrayLike.length; i++) {
      arr.push(mapFn ? mapFn(arrayLike[i], i) : arrayLike[i]);
    }
    return arr;
  };
}
```

### Object Static Methods

```javascript
// Polyfill for Object.keys()
if (!Object.keys) {
  Object.keys = function (obj) {
    const keys = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  };
}

// Polyfill for Object.create()
if (!Object.create) {
  Object.create = function (proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  };
}
```

### ES6 Features

```javascript
// Polyfill for String.prototype.startsWith()
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (search, pos = 0) {
    return this.substr(pos, search.length) === search;
  };
}

// Polyfill for String.prototype.endsWith()
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (search, length) {
    if (length === undefined) length = this.length;
    return this.substr(length - search.length, search.length) === search;
  };
}

// Polyfill for String.prototype.repeat()
if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    let str = "";
    for (let i = 0; i < count; i++) {
      str += this;
    }
    return str;
  };
}

// Polyfill for Number.isNaN()
if (!Number.isNaN) {
  Number.isNaN = function (value) {
    return typeof value === "number" && value !== value;
  };
}

// Polyfill for Number.isInteger()
if (!Number.isInteger) {
  Number.isInteger = function (value) {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
}
```
