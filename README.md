# unionizor
Superfast union supporting Arrays and Iterables containing primitives or objects. In the age of big data, you need it.

# Performance

Unionizer is extraordinarily fast. Multiple test runs show `unionizer` is 60-100x faster when accessing the first element of a union,  30-50x faster when accessing the central point of a union, and 10-15% slower than `lodash` when accessing the last item of union but still 10-15% faster than `setUnion`. If you are running a data processing pipeline, time to first response is critical. Secondary access of the same item will be sub millisecond since `unionizer` caches values in an array.

The results below are for the union of six 100,000 element arrays containing random numbers.

The function `setUnion` is defined as:

```javascript
function setUnion(...iterables) {
	return [...iterables.reduce((set,arg) => new Set([...set,...arg]))]
}
```

All approaches have variable speeds due to garbage collection.

Below are results from a sample run:

```
lodash create 85827 from 6 x 100000: 68.936ms
lodash access 0: 69.903ms
lodash access 42913.5: 70.358ms
lodash access 85826: 70.735ms
lodash re-access 85826: 0.121ms
lodash total: 71.626ms

setUnion create 85827 from 6 x 100000: 102.689ms
setUnion access 0: 103.528ms
setUnion access 42913.5: 103.933ms
setUnion access 85826: 104.287ms
setUnion re-access 85826: 0.107ms
setUnion total: 105.124ms

unionizer create 85827 from 6 x 100000: 0.047ms
unionizer access 0: 0.544ms
unionizer access 42913.5: 0.886ms
unionizer access 85826: 76.758ms
unionizer re-access 85826: 0.335ms
unionizer total: 78.063ms
```

If you want similar performance for intersection, Cartesian product, or memoizing also see:

- https://github.com/anywhichway/intersector
- https://github.com/anywhichway/cxproduct
- https://github.com/anywhichway/nano-memoize

For a complete high performance solution to set operations for Arrays and Sets with a standardized API, plus the addition of the standard map/reduce/find operations to Set see:

- https://github.com/anywhichway/array-set-ops

# Installing

```
npm install unionizor
```

# Using

`iterable <- unionizor(booleanOrUniqueKeyProperty=false)` is a function that returns another function configured to do array unions and return arrays. It takes one optional argument booleanOrUniqueKeyProperty that defaults to `false'. If booleanOrUniqueKeyProperty=false the intersection is optimized for direct value comparison of primitives or objects (not deepequals). If typeof(booleanOrUniqueKeyProperty)==="string" it is assumed to be a unique key on all objects in the arrays, primitives will still be handled. 


```
import unionizor from "unionizer";
const union = unionizor(),
	keyedObjectUnion = unionizor("o");
union([1,2,3],new Set([3,2])); // will return [1,2,3]
var o1 = {o:1},
    o2 = {o:2},
    o3 = {o:3};
keyedObjectUnion([o1,o2,o3],[o3,o2]); // will return [o1,o2,o3];
```

*Note*: Accessing the `length` property on a `unionizer` union forces full resolution of the union and will slow down your processing. Use a `for(...of...)` loop or

# Architecture

By definition a union contains one of every item that occurs in every group of items added to the union. As a result, it is not necessary to compute the entire union prior to returning the first item. It is only necessary to ensure that duplicates are not returned. Hence, an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) is implemented that keeps track of items returned and skips them. Returned items are stored in an array so that subsequent access is faster.

Custom versions of `forEach`, `map`, and `reduce` are implemented to avoid accessing length.

# Test Coverage

15 passing (322ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   98.13 |    85.24 |     100 |   98.13 |                  
index.js |   98.13 |    85.24 |     100 |   98.13 | 153-155          
----------|---------|----------|---------|---------|-------------------


# Updates (reverse chronological order)

2022-02-22 v2.0.2 - Updated documentation.

2022-02-15 v2.0.1 - Updated documentation.

2022-02-15 v2.0.0 - Updated to use iterable protocol. More than 10x faster overall.

2017-01-15 v1.0.3 - Added Codacy quality checks and badges. Replace `var` with `let`. Addressed a package loading issues that impacted testing.

2017-01-02 v1.0.2 - Previous versions would treat string equivalents in primitive arrays the same, e.g. 2 would equal "2". Also,
improved performance and added the option to pass in an object key.

2017-01-01 v1.0.1 - Externalized benchmark.

2016-12-27 v1.0.0 - Initial public release.

# License

MIT - see LICENSE file
