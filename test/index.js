var chai,
	expect,
	unionizor,
	_;
if(typeof(window)==="undefined") {
	chai = await import("chai");
	expect = chai.expect;
	unionizor = (await import("../index.js")).default;
	_ = (await import("lodash")).default
}

function setUnion(...iterables) {
	return [...iterables.reduce((set,arg) => new Set([...set,...arg]))]
}

const union = unionizor(),
	keyedObjectUnion = unionizor("o");

const o1 = {o:1},
	o2 = {o:2},
	o3 = {o:3},
	o4 = {o:4};

const primitiveResult = _.union([3,1,2],[3,"2",4]),
	big1 = [],
	big2 = [],
	big3 = [];

const size = 100000,
	samples = [];
for(let i=0;i<6;i++) {
	const array = [];
	for(let j=0;j<size;j++) {
		array.push(Math.round(Math.random()*j))
	}
	samples.push(array);
}
const sample = setUnion(...samples);


describe("Test",function() {
	it("unionizer spread",function() {
		const result = union([3,1,2,3],[3,"2",4]);
		expect([...result].length).to.equal(primitiveResult.length);
		expect([...result].length).to.equal(primitiveResult.length); // exercises cached values
	});
	it("unionizer spread mixed",function() {
		const result = union([3,1,2,3],new Set([3,"2",4]));
		expect([...result].length).to.equal(primitiveResult.length);
		expect([...result].length).to.equal(primitiveResult.length); // exercises cached values
	});
	it("unionizer primitive",function() {
		const result = union([3,1,2,3],[3,"2",4]);
		expect(result.length).to.equal(primitiveResult.length);
		let i = 0,
			item;
		do {
			item = result[i];
			expect(item).to.equal(primitiveResult[i]);
			i++;
		} while(item);
	});
	it("unionizer mixed",function() {
		const result = union([3,1,2,3],new Set([3,"2",4]));
		expect(result.length).to.equal(primitiveResult.length);
		let i = 0,
			item;
		do {
			item = result[i];
			expect(item).to.equal(primitiveResult[i]);
			i++;
		} while(item);
	});
	it("unionizer forEach",function() {
		const result = union([3,1,2,3],[3,"2",4]);
		result.forEach((item,i) => {
			expect(item).to.equal(primitiveResult[i]);
		});
	});
	it("unionizer map",function() {
		const result = union([3,1,2,3],[3,"2",4]),
			mapped = result.map((item,i) => {
				expect(item).to.equal(primitiveResult[i]);
				return item;
			});
		mapped.forEach((item,i) => {
			expect(item).to.equal(primitiveResult[i]);
		});
	});
	it("unionizer reduce",function() {
		const result = union([3,1,2,3],[3,"2",4]),
			reduced = result.reduce((reduced,item,i) => {
				expect(item).to.equal(primitiveResult[i]);
				reduced.push(item);
				return reduced;
			},[]);
		reduced.forEach((item,i) => {
			expect(item).to.equal(primitiveResult[i]);
		});
	});
	it("lodash primitive",function() {
		const result = _.union([3,1,2],[3,"2",4]);
		expect(result.length).to.equal(primitiveResult.length);
	});
	it("setUnion",function() {
		const result = setUnion([3,1,2],[3,"2",4]);
		expect(result.length).to.equal(primitiveResult.length);
	});
	it("objects",function() {
		const result = union([o3,o1,o2,o3],[o3,"2",o4]);
		expect(result.length).to.equal(5);
	});
	it("lodash objects",function() {
		const result = _.union([o3,o1,o2,o3],[o3,o4]);
		expect(result.length).to.equal(4);
	});
	it("keyed objects",function() {
		const result = keyedObjectUnion([o3,o1,o2,o3],[o3,o4]);
		expect(result.length).to.equal(4);
	});
	for(const [name,f] of [["lodash",_.union],["setUnion",setUnion],["unionizer",union]]) {
		it(name,function() {
			let result;
			console.time(`${name} total`);
			console.time(`${name} access 0`);
			console.time(`${name} access ${sample.length/2}`);
			console.time(`${name} access ${sample.length-1}`);
			console.time(`${name} create ${sample.length} from ${samples.length} x ${size}`);
			result = f(...samples);
			console.timeEnd(`${name} create ${sample.length} from ${samples.length} x ${size}`);
			let item = result[0];
			expect(item).to.equal(sample[0]);
			console.timeEnd(`${name} access 0`);
			item = result[sample.length/2];
			expect(item).to.equal(sample[sample.length/2]);
			console.timeEnd(`${name} access ${sample.length/2}`);
			item = result[sample.length-1];
			expect(item).to.equal(sample[sample.length-1]);
			console.timeEnd(`${name} access ${sample.length-1}`);
			console.time(`${name} re-access ${sample.length-1}`);
			item = result[sample.length-1];
			expect(item).to.equal(sample[sample.length-1]);
			console.timeEnd(`${name} re-access ${sample.length-1}`);
			expect(result.length).to.equal(sample.length);
			console.timeEnd(`${name} total`);
		});
	}

});