/* MIT License
Copyright (c) 2016 Simon Y. Blackwell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
(function() {
	function unionizor(objects) {
		return function() {
			var set = (objects ? new Set() : {}),
				results = [];
			for(var i=0;i<arguments.length;i++) {
				var array = arguments[i];
				for(var j=0;j<array.length;j++) {
					var value = array[j];
					if((objects && !set.has(value)) || (!objects && !set.hasOwnProperty(value))) {
						if(objects) {
							set.add(value);
						} else {
							set[value] = value;
						}
						results.push(value);
					}
				}
			}
			return results;
		}
	}
	if(typeof(module)!=="undefined") {
		module.exports = unionizor;
	} else {
		this.unionizor = unionizor;
	}
}).call(this);