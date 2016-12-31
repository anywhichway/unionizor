var chai,
	expect,
	Unionor;
if(typeof(window)==="undefined") {
	chai = require("chai");
	expect = chai.expect;
	unionizor = require("../index.js");
}

var primitiveUnion = unionizor(),
	objectUnion = unionizor(true);

var o1 = {o:1},
	o2 = {o:2},
	o3 = {o:3};

describe("Test",function() {
	it("primitive",function() {
		var result = primitiveUnion([1,2,3],[3,2,4]);
		expect(result.length).to.equal(4);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal(2);
		expect(result[2]).to.equal(3);
		expect(result[3]).to.equal(4);
	});
	it("object with primitives",function() {
		var result = objectUnion([1,2,3],[3,2]);
		expect(result.length).to.equal(3);
	});
	it("objects",function() {
		var result = objectUnion([o1,o2,o3],[o3,o2]);
		expect(result.length).to.equal(3);
	});
});