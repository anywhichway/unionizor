(function() {
	
	var imports = ["unionizor.js"];
	
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
	var oargs2 = oargs1.slice(50000);
	
	
	JSBenchmark.import(imports).then(() => {
		const unionizorPrimitive = unionizor(),
			unionizorObject = unionizor(true);
		
		function uniqs() {
			var list = Array.prototype.concat.apply([], arguments);
			return list.filter(function(item, i) {
				return i == list.indexOf(item);
			});
		}
			
		JSBenchmark.run({
			name: "Array Union",
			description: "Test various ways of creating array uinions",
			keywords: ["union","lodash","unionizor","uniqs"],
			suites: {
				primitive: {
					arguments: [args1,args2],
					expected: expected,
					pretest: true,
					showArguments: false,
					tests: {
						lodash: (a1,a2) => { return _.union(a1,a2).length; },
						unionizor: (a1,a2) => { return unionizorPrimitve(a1,a2).length; },
						uniqs: (a1,a2) => { return uniqs(a1,a2).length; }
					}
				},
				object: {
					arguments: [oargs1,oargs2],
					expected: expected,
					pretest: true,
					showArguments: false,
					tests: {
						lodash: (a1,a2) => { return _.union(a1,a2).length; },
						unionizor: (a1,a2) => { return unionizorObject(a1,a2).length; },
						uniqs: (a1,a2) => { return uniqs(a1,a2).length; }
					}
				}
			}
		});
	});
}).call(this);