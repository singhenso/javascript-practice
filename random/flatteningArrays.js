var obnoxiousArray = [0, [1, [2, [3, [4, [5]]]]]];

function flatten(array){
	return array.reduce(function(acc, value){
		return acc.concat(
			Array.isArray(value)?
			flatten(value) : value;
		);
	}, []);
}

function flattenWithApply(array){
	var myArray = [].concat.apply([], array);
}