# unionizor
Superfast union supporting primitives and objects. In the age of big data, you need it.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3ed16b53c5014f9d9cbf4bf3ceab432c)](https://www.codacy.com/app/syblackwell/unionizor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=anywhichway/unionizor&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/3ed16b53c5014f9d9cbf4bf3ceab432c)](https://www.codacy.com/app/syblackwell/unionizor?utm_source=github.com&utm_medium=referral&utm_content=anywhichway/unionizor&utm_campaign=Badge_Coverage)

See browser benchmarks at [JSBenchmarks](http://www.jsbenchmarks.com/index.html?anywhichway/union/master/benchmark.js).

`lodash` appears to be faster than `unionizor` in Node.js.

# Installing

npm install unionizor

or

Download and use the browser files from the browser directory.

# Using

`unionizor(booleanOrUniqueKeyProperty=false)` is a function that returns another function configured to do array unions. It takes one optional argument booleanOrUniqueKeyProperty that defaults to `false'. If booleanOrUniqueKeyProperty=false the intersection is optimized for primitive data types and will run much faster. If typeof(booleanOrUniqueKeyProperty)==="string" it is assumed to be a unique key on all objects in the arrays, primtives will still be handled. This will run the second fastest. If booleanOrUniqueKeyProperty is otherwise not equal to zero, then a Set will be used internally and the algorithm will be slower, although still faster than many others in a browser. 


In NodeJS:

```
var unionizor = require("unionizor"),
	primitiveUnion = unionizor(),
	objectUnion = unionizor(true),
	keyedObjectUnion = unionizor("o");
	primitiveUnion([1,2,3],[3,2]); // will return [1,2,3]
	var o1 = {o:1},
		o2 = {o:2},
		o3 = {o:3};
	objectUnion([o1,o2,o3],[o3,o2]); // will return [o1,o2,o3];
	keyedObjectUnion([o1,o2,o3],[o3,o2]); // will return [o1,o2,o3];
```

In browser:

```
<script src="unionizor.js"></script>
<script>
	var primitiveUnion = unionizor(),
		objectUnion = unionizor(true);
		keyedObjectUnion = unionizor("o");
	primitiveUnion([1,2,3],[3,2]); // will return [1,2,3]
	var o1 = {o:1},
		o2 = {o:2},
		o3 = {o:3};
	objectUnion([o1,o2,o3],[o3,o2]); // will return [o1,o2,o3];
	keyedObjectUnion([o1,o2,o3],[o3,o2]); // will return [o1,o2,o3];
</script>
```

# Updates (reverse chronological order)

2017-01-15 v1.0.3 - Added Codacy quality checks and badges. Replace `var` with `let`. Addressed a package loading issues that impacted testing.

2017-01-02 v1.0.2 - Previous versions would treat string equivalents in primitve arrays the same, e.g. 2 would equal "2". Also,
improved performance and added the option to pass in an object key.

2017-01-01 v1.0.1 - Externalized benchmark.

2016-12-27 v1.0.0 - Initial public release.

# License

MIT - see LICENSE file
