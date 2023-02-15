/* MIT License
Copyright (c) 2016-2023 Simon Y. Blackwell

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

function unionizer(objectsMixedOrKey) {
	const objectkey = (typeof (objectsMixedOrKey) === "string" ? objectsMixedOrKey : false);

	return (...iterables) => {
		const memory = new Set(),
			results = [];
		let i = 0, k = 0,
			length;
		Object.defineProperty(results,"forEach",{
			value:(f) => {
				let i = 0; // avoid accessing length
				for(const item of proxy) {
					f(item,i++,proxy);
				}
			}
		});
		Object.defineProperty(results,"map",{
			value:(f) => {
				const result = [];
				let i = 0; // avoid accessing length
				for(const item of proxy) {
					result[i] = f(item,i++,proxy);
				}
				return result;
			}
		});
		Object.defineProperty(results,"reduce",{
			value:(f,result) => {
				let i = 0; // avoid accessing length
				for(const item of proxy) {
					if(result===undefined) result = item;
					else result = f(result,item,i++,proxy);
				}
				return result;
			}
		});
		const proxy = new Proxy(results,{
			get(target,key) {
				const type = typeof(key);
				let item = target[key];
				if(key!=="length" && type!=="symbol") {
					if(item!=undefined) {
						return item;
					}
					if(type==="string") {
						const num = parseInt(key);
						if(num+""===key) {
							key = num;
						}
					}
					if(key<0 || key===Infinity) {
						throw new RangeError(`${key} is out of range`)
					}
				}
				if(key==="length") {
					if (length >= 0) {
						return length;
					}
					key = Infinity;
				}
				if(typeof(key)==="number") {
					if(key>=length) return;
					if(key<target.length) return target[key];
					const il = iterables.length;
					let item;
					while(k<il) {
						let array = iterables[k];
						if(!Array.isArray(array)) {
							array = [...array];
						}
						const al = array.length;
						while(key>=target.length && i<al) {
							item = array[i++];
							if(objectkey ? !memory.has(item[objectkey]) : !memory.has(item)) {
								objectkey ? memory.add(item[objectkey]) : memory.add(item);
								target[target.length] = item;
							}
						}
						if(i===al) {
							i = 0;
							k++;
						}
						if(key<=target.length) {
							break;
						}
					}
					if(k===il) {
						length = target.length;
					}
					return key===Infinity ? length : item;
				}
				if(type==="symbol" && key.toString()==="Symbol(Symbol.iterator)") {
					return () => {
						if(length>=0) {
							let l = 0;
							return {
								next() {
									while(l<target.length) {
										return {value:target[l++]}
									}
									return {done:true}
								}
							}
						}
						return {
							next() {
								while(k<iterables.length) {
									let array = iterables[k];
									if(!Array.isArray(array)) {
										array = [...array];
									}
									while(i<array.length) {
										const item = array[i++],
											keyed = objectkey && item && typeof(item)==="object";
										if(keyed ? !memory.has(item[objectkey]) : !memory.has(item)) {
											keyed ? memory.add(item[objectkey]) : memory.add(item);
											target[target.length] = item;
											return {value:item}
										}
									}
									if(i===array.length) {
										i = 0;
										k++;
									}
								}
								length = target.length;
								return {done:true}
							}
						}
					}
				}
				return target[key];
			}
		})
		return proxy;
	}
}

export {unionizer,unionizer as default};

