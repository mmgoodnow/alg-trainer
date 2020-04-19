export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export function getAlgSetKey(cubeType, set) {
	return `${cubeType}/${set}`;
}

export function median(numbers) {
	const middle = (numbers.length + 1) / 2;
	const sorted = numbers.slice().sort((a, b) => a - b);
	return sorted.length % 2
		? sorted[middle - 1]
		: (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2;
}

export function min(numbers) {
	return numbers.slice().sort((a, b) => a - b)[0];
}
