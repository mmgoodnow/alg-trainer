export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export function getAlgSetKey(cubeType, set) {
	return `${cubeType}/${set}`;
}
