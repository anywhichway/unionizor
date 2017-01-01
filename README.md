# unionizor
Superfast union supporting primitives and objects. In the age of big data, you need it.

Below are node.js benchmarks in a 4 core i7 2.86gz Windows 10 64bit environment:

```
unionizorPrimitive x 186 ops/sec ±2.93% (71 runs sampled)
lodashPrimitive x 17.46 ops/sec ±4.86% (33 runs sampled)
uniqs x 0.20 ops/sec ±1.80% (5 runs sampled)
unionizorObject x 25.40 ops/sec ±8.13% (47 runs sampled)
lodashObject x 17.97 ops/sec ±5.30% (33 runs sampled)
uniqsObject x 0.20 ops/sec ±3.78% (5 runs sampled)
Fastest is unionizorPrimitive
```

See benchmarks at [JSBenchmarks](http://www.jsbenchmarks.com/index.html?anywhichway/union/master/benchmark.js).

# Installing

npm install unionizor

or

Download and use the browser files from the browser directory.

# Using

`unionizor(supportObjects=true)` is a function that returns another function configured to do array Unionions. It takes one optional argument `supportObjects` that defaults to `false`. If `supportObjects` is false, the Unionion is optimized for primitive data types and will run much faster.

In NodeJS:

```
var unionizor = require("unionizor"),
	primitiveUnion = unionizor(),
	objectUnion = unionizor(true);
	primitiveUnion([1,2,3],[3,2]); // will return [1,2,3]
	var o1 = {o:1},
		o2 = {o:2},
		o3 = {o:3};
	objectUnion([o1,o2,o3],[o3,o2]); // will return [o1,o2,o3];
```

In browser:

```
<script src="unionizor.js"></script>
<script>
	var primitiveUnion = unionizor(),
		objectUnion = unionizor(true);
	primitiveUnion([1,2,3],[3,2]); // will return [1,2,3]
	var o1 = {o:1},
		o2 = {o:2},
		o3 = {o:3};
	objectUnion([o1,o2,o3],[o3,o2]); // will return [o1,o2,o3];
</script>
```

# Updates (reverse chronological order)

2017-01-01 v1.0.0 - Externalized benchmark.

2016-12-27 v1.0.0 - Initial public release.

# License

MIT - see LICENSE file
