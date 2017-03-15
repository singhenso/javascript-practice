//Find largest contiguous sum in array

function findLargestContiguousSum(array){
	var largestSum = array[0] + array[1];

	for(var i = 2; i < array.length; i++){
		largestSum = Math.max(largestSum, array[i] + array[i - 1]);
	}

	return largestSum;
}

/*Find most frequent integer in array
	O(n) time but O(k) space
*/

function findMostFrequent(array){
	var frequencyMap = new Map();
	for(var i = 0; i < array.length; i++){
		if (!frequencyMap.has(array[i])){
			frequencyMap.set(array[i], 1);
		}
		else{
			var currentCount = frequencyMap.get(array[i]) + 1;
			frequencyMap.set(array[i], currentCount);
		}
	}

	var mostFrequent = frequencyMap.get(array[0]);
	var mostFrequentKey = array[0];
	for (var [key, value] of Map.entries()){
		mostFrequent = Math.max(mostFrequent, value)
		if(mostFrequent === value){
			mostFrequentKey = key;
		}
	}
}