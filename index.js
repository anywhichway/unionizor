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
	function unionizor(o) {
		var ot = (!o ? 0 : (typeof(o)==="boolean" ? -1 : 1)),
			s = (typeof(o)==="boolean" ? new Set() : {});
		return function() {
			var r = [],
				a = [];
			a = a.concat.apply(a,arguments);
			var len = a.length;
			if(ot===-1) {
				for(var i=0;i<len;i++) {
					var v = a[i];
					if(!s.has(v)) {
						s.add(v);
						r.push(v);
					}
				}
			} else if(ot===0) {
				for(var i=0;i<len;i++) {
					var v = a[i], t = typeof(v);
					if(s[v]!==t) {
						s[v]=t;
						r.push(v);
					}
				}
			} else {
				for(var i=0;i<len;i++) {
					var v = a[i], t = typeof(v);
					if(v && t==="object") {
						if(s[v[o]]!==t) {
							s[v[o]]=t;
							r.push(v);
						}
					} else {
						if(s[v]!==t) {
							s[v]=t;
							r.push(v);
						}
					}
					
				}
			}
			if(ot===-1) {
				s.clear();
			} else {
				s = {};
			}
			return r;
		}
	}
	if(typeof(module)!=="undefined") {
		module.exports = unionizor;
	} else {
		this.unionizor = unionizor;
	}
}).call(this);