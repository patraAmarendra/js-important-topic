/**
 * Array.map() polyfill
 * map always returns a new array, even if the callback function does not return a value.
 *  mapData.map((value, index, array) => { })
 */

const mapData = [1, 2, 3, 4, 5];
// map always takes three arguments: the current value, the index of the current value, and the array being traversed.
// The callback function can use these arguments to perform operations on each element of the array and return a new value that will be included in the resulting array.
const mapResult = mapData.map((value, index, array) => {
  // console.log(`Value: ${value}, Index: ${index}, Array: ${array}`);
  return value * 2;
});

// If the callback function does not return a value, the resulting array will contain undefined for each element.
const mapResult2 = mapData.map((item) => { });
console.log("\n\n");
console.log('----------------------------- Array map() method -----------------------------');
console.log("Array mapResult2:", mapResult2); // Output: [undefined, undefined, undefined, undefined, undefined]

console.log("Array mapResult: ", mapResult); // Output: [2, 4, 6, 8, 10]

console.log("------------------- My custom map() polyfill -------------------   ");

//----------------------------------------------------------------------------------------------------------
/**
 * mycustomMap() polyfill
 * This is a custom implementation of the Array.map() method.
 * It takes a callback function and applies it to each element of the array, returning a new array with the results.
 */

/**
 * mycustomMap() polyfill characteristics:
 * 1. It does not modify the original array
 * 2. It returns a new array
 * 3. It iterates over each element
 */

Array.prototype.mycustomMap = function (cb) {
  const result = [];
  //Inside the function, this refers to the array.
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i], i, this));
  }

  return result;
};

const myMapResult = mapData.mycustomMap((item) => item * 2);
console.log("Array myMapResult:", myMapResult); // Output: [2, 4, 6, 8, 10]

const mymapResult2 = mapData.mycustomMap((item, index, array) => {
  // console.log(`Value: ${item}, Index: ${index}, Array: ${array}`);
  return item * 2;
});

console.log("Array mymapResult2:", mymapResult2); // Output: [2, 4, 6, 8, 10]
console.log("\n\n");

//---------------------------------------------------------------------------------------------------------

/**
 * Array.filter() polyfill
 * filter always returns a new array, even if the callback function does not return a value.
 * filter() creates a new array containing only the elements that pass a condition.
 * filterData.filter((value, index, array) => { })
 * Returns a new array
 *
 * 1. Does not modify the original array
 * 2. Runs the callback for each element
 * 3. Adds elements only if the callback returns true
 */

// The filter() method creates a new array with all elements that pass the test implemented by the provided function.
const filterResult = mapData.filter(() => {});
console.log('----------------------------- Array filter() method -----------------------------');
console.log("Array filterResult:", filterResult); // Output: []

const filterResult2 = mapData.filter((item) => item % 2 === 0);
console.log("Array filterResult2:", filterResult2); // Output: [2, 4]

console.log("------------------- My custom filter() polyfill -------------------   ");

// myfilter polyfill:

Array.prototype.myFilter = function (cb) {
  // create a new array to store the results of the filter operation.
  // as filter alaways returns a new array, we need to create an empty array to hold the filtered results.
  const result = [];
  //if the original array is empty, we can return the empty result array immediately without performing any further operations. This is an optimization to avoid unnecessary iterations.
  if (this.length === 0) return result;
  //   1. Does not modify the original array
  //   2. Runs the callback for each element
  //   3. Adds elements only if the callback returns true
  // loop the array
  for (let i = 0; i < this.length; i++) {
    // check the callback function for each element of the array.
    //  If the callback function returns true for a particular element,
    // that element is added to the result array using the push() method.
    if (cb(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  // return the result after filtering the array.
  return result;
};

const myFilterResult = mapData.myFilter((item) => item % 2 === 0);
console.log("Array myFilterResult:", myFilterResult); // Output: [2, 4]
console.log("\n\n");

//---------------------------------------------------------------------------------------------------------

/**
 * Array.forEach() polyfill
 * forEach() executes a provided function once for each array element.
 * forEach() does not return a new array, it returns undefined.
 */

console.log('----------------------------- Array forEach() method -----------------------------');
mapData.forEach((value, index, array) => {
    console.log(`Value: ${value}, Index: ${index}, Array: ${array}`);
})

Array.prototype.myForEach = function (cb) {
    for (let i = 0; i < this.length; i++) {
        cb(this[i], i, this);
    }
}
console.log("------------------- My custom forEach() polyfill -------------------   ");
mapData.myForEach((value, index, array) => {
    console.log(`myForEach Value: ${value}, Index: ${index}, Array: ${array}`);
});

console.log("\n\n");


/**
 * Array.reduce() polyfill
 * reduce() executes a reducer function on each element of the array, resulting in a single output value.
 * reduce() does not return a new array, it returns a single value.
 * reduceData.reduce((accumulator, currentValue, index, array) => { }, initialValue)
 *  it should have two parameters: the callback function and an optional initial value.
 * 1. The callback function takes four arguments: the accumulator, the current value, the index of the current value, and the array being traversed.
 * 2. The initial value is used as the first argument to the first call of the callback function. If no initial value is provided, the first element of the array is used as the initial accumulator value, and the iteration starts from the second element.
 */

const reduceResult = mapData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
}, 0);
console.log('----------------------------- Array reduce() method -----------------------------');
console.log("Array reduceResult:", reduceResult); // Output: 15


Array.prototype.myReduce = function (cb, initialValue) {
    let accumulator = initialValue;

    for (let i = 0; i < this.length; i++) {
        accumulator = cb(accumulator, this[i], i, this);
    }

    return accumulator;
}
console.log("------------------- My custom reduce() polyfill -------------------   ");
const myReduceResult = mapData.myReduce((accumulator, currentValue) => {
    return accumulator + currentValue
}, 0);
console.log("Array myReduceResult:", myReduceResult); // Output: 15
