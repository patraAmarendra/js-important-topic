## Prototypal Inheritance in JavaScript

## 1) What is a prototype in JavaScript?

**Q: What is a prototype in JavaScript?**

A: Every JavaScript object has an internal link to another object called its **prototype**. When you access a property or method on an object, JavaScript first looks on the object itself, then walks up the prototype chain until it finds the property or reaches `null`.

```javascript
const animal = {
  speak() {
    console.log(`${this.name} makes a sound.`);
  },
};

const dog = Object.create(animal);
dog.name = "Rex";

dog.speak(); // Rex makes a sound.
// dog doesn't have speak() — it's found on animal (the prototype)
```

## 2) What is the prototype chain?

**Q: What is the prototype chain?**

A: The prototype chain is the series of linked objects JavaScript traverses when looking up a property. The chain ends when a prototype is `null`.

```javascript
const obj = { a: 1 };

// obj -> Object.prototype -> null
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null
```

## 3) What is `__proto__` vs `Object.getPrototypeOf()`?

**Q: What is the difference between `__proto__` and `Object.getPrototypeOf()`?**

A: Both access an object's prototype. `__proto__` is a legacy accessor property and should be avoided in production code. `Object.getPrototypeOf()` is the modern, standards-compliant alternative.

```javascript
const parent = { greet: "Hello" };
const child = Object.create(parent);

// Legacy (avoid in production)
console.log(child.__proto__ === parent); // true

// Modern (preferred)
console.log(Object.getPrototypeOf(child) === parent); // true
```

## 4) What are constructor functions and the `new` keyword?

**Q: How do constructor functions work with `new`?**

A: A constructor function is a regular function intended to be called with `new`. When called with `new`, JavaScript:
1. Creates a new empty object.
2. Sets the object's prototype to the constructor's `prototype` property.
3. Runs the constructor with `this` pointing to the new object.
4. Returns the new object (unless the constructor returns another object).

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hi, I am ${this.name}`);
};

const aman = new Person("Aman", 25);
aman.greet(); // Hi, I am Aman

console.log(aman instanceof Person); // true
console.log(Object.getPrototypeOf(aman) === Person.prototype); // true
```

## 5) What is `Object.create()`?

**Q: What does `Object.create()` do?**

A: `Object.create(proto)` creates a new object whose prototype is set to `proto`. It gives fine-grained control over the prototype chain without using constructor functions.

```javascript
const vehicleProto = {
  describe() {
    console.log(`${this.make} ${this.model}`);
  },
};

const car = Object.create(vehicleProto);
car.make = "Toyota";
car.model = "Corolla";

car.describe(); // Toyota Corolla
console.log(Object.getPrototypeOf(car) === vehicleProto); // true
```

## 6) What is ES6 `class` syntax?

**Q: Are ES6 classes different from prototype-based inheritance?**

A: ES6 classes are **syntactic sugar** over JavaScript's existing prototype-based inheritance. Under the hood, `class` still uses prototypes; it just provides cleaner, more familiar syntax.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog("Rex");
dog.speak(); // Rex barks.
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
```

## 7) What is the difference between `class` and constructor functions?

**Q: When should you use `class` vs a constructor function?**

A: Both create the same prototype-based structure. Use `class` in modern code for readability. Key differences:

- `class` declarations are not hoisted (unlike function declarations).
- `class` methods are non-enumerable by default.
- `class` requires `new`; calling it without `new` throws a `TypeError`.
- `super()` must be called in a derived class constructor before accessing `this`.

```javascript
// Constructor function (traditional)
function Rectangle(w, h) {
  this.width = w;
  this.height = h;
}
Rectangle.prototype.area = function () {
  return this.width * this.height;
};

// ES6 class (modern equivalent)
class RectangleClass {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }
  area() {
    return this.width * this.height;
  }
}

const r1 = new Rectangle(4, 5);
const r2 = new RectangleClass(4, 5);

console.log(r1.area()); // 20
console.log(r2.area()); // 20
```

## 8) What is `hasOwnProperty()`?

**Q: What does `hasOwnProperty()` do?**

A: `hasOwnProperty()` returns `true` if the property exists directly on the object (not on the prototype chain).

```javascript
function Car(make) {
  this.make = make;
}
Car.prototype.type = "vehicle";

const myCar = new Car("Honda");

console.log(myCar.hasOwnProperty("make")); // true
console.log(myCar.hasOwnProperty("type")); // false (inherited)
console.log("type" in myCar);              // true (found via chain)
```

## 9) What is `instanceof`?

**Q: How does `instanceof` work?**

A: `instanceof` checks whether an object's prototype chain contains the `prototype` property of a given constructor.

```javascript
class Shape {}
class Circle extends Shape {}

const c = new Circle();
console.log(c instanceof Circle); // true
console.log(c instanceof Shape);  // true
console.log(c instanceof Object); // true (everything inherits from Object)
```

## 10) What is prototypal inheritance vs classical inheritance?

**Q: How is JavaScript's prototypal inheritance different from classical inheritance?**

A: In **classical inheritance** (Java, C++), classes are blueprints and objects are instances. In **prototypal inheritance** (JavaScript), objects inherit directly from other objects — there are no blueprints. ES6 classes are just a syntax layer over prototypes.

```javascript
// Prototypal — objects linking to objects
const base = { type: "base", greet() { return `I am ${this.type}`; } };
const derived = Object.create(base);
derived.type = "derived";

console.log(derived.greet()); // I am derived
```

## Rapid Fire (Prototypal Inheritance)

**Q1: What is at the top of every prototype chain?**  
A: `Object.prototype`, whose prototype is `null`.

**Q2: What does `Object.create(null)` create?**  
A: An object with no prototype — a truly plain dictionary.

**Q3: Are ES6 classes syntactic sugar?**  
A: Yes — they still use prototypes under the hood.

**Q4: What does `new` do to `this` inside a constructor?**  
A: It binds `this` to the newly created object.

**Q5: What is the difference between `in` operator and `hasOwnProperty()`?**  
A: `in` checks the entire prototype chain; `hasOwnProperty()` checks only own properties.

**Q6: Can you change an object's prototype after creation?**  
A: Yes with `Object.setPrototypeOf()`, but it is discouraged for performance reasons.

**Q7: What does `instanceof` actually check?**  
A: Whether `Constructor.prototype` exists in the object's prototype chain.

**Q8: Where should shared methods be defined in constructor-function style?**  
A: On `Constructor.prototype`, so all instances share one copy.

## Tricky Output-Based Questions (Prototype)

## 1) Prototype chain lookup

**Q: What is the output?**

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} speaks`;
};

const cat = new Animal("Whiskers");
console.log(cat.speak());
console.log(cat.hasOwnProperty("speak"));
```

**Answer:**

```text
Whiskers speaks
false
```

`speak` is on the prototype, not the instance.

## 2) Overriding a prototype property

**Q: What is the output?**

```javascript
function Foo() {}
Foo.prototype.value = 10;

const a = new Foo();
const b = new Foo();

a.value = 99;

console.log(a.value);
console.log(b.value);
```

**Answer:**

```text
99
10
```

Setting `a.value` creates an **own property** on `a`; it does not modify the prototype. `b` still inherits `10`.

## 3) Shared state on prototype

**Q: What is the output?**

```javascript
function Team() {}
Team.prototype.members = [];

const t1 = new Team();
const t2 = new Team();

t1.members.push("Alice");

console.log(t1.members);
console.log(t2.members);
```

**Answer:**

```text
["Alice"]
["Alice"]
```

Both instances share the same `members` array on the prototype. **Lesson:** never put mutable values on the prototype.

## 4) `instanceof` across the chain

**Q: What is the output?**

```javascript
class A {}
class B extends A {}
class C extends B {}

const c = new C();
console.log(c instanceof C);
console.log(c instanceof B);
console.log(c instanceof A);
```

**Answer:**

```text
true
true
true
```

`C.prototype → B.prototype → A.prototype` — `instanceof` walks the entire chain.

## 5) `Object.create()` prototype

**Q: What is the output?**

```javascript
const proto = {
  greet() {
    return `Hello, I am ${this.name}`;
  },
};

const obj = Object.create(proto);
obj.name = "Aman";

console.log(obj.greet());
console.log(obj.hasOwnProperty("greet"));
```

**Answer:**

```text
Hello, I am Aman
false
```

`greet` lives on `proto`, not on `obj` itself.
