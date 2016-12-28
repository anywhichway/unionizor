var Benchmark = require("benchmark"),
unionizor = require("../index.js"),
_ = require("lodash"),
uniqs = require("uniqs");

var suite = new Benchmark.Suite;


const primitiveUnion = unionizor(),
	objectUnion = unionizor(true);

var expected = 100000,
args1 = [];
for(var i=0;i<100000;i++) {
	args1.push(i);
}
var args2 = args1.slice(50000);
var oargs1 = [];
for(var i=0;i<100000;i++) {
	oargs1.push({i:i});
}
var oargs2 = oargs1.slice(50000)


//add tests
suite.add('unionizorPrimitive', function() {
	primitiveUnion(args1,args2);
}).add('lodashPrimitive', function() {
	_.union(args1,args2);
}).add('uniqs', function() {
	uniqs(args1,args2);
})
.add('unionizorObject', function() {
	objectUnion(oargs1,oargs2);
}).add('lodashObject', function() {
	_.union(oargs1,oargs2);
}).add('uniqsObject', function() {
	uniqs(args1,args2);
})
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run();