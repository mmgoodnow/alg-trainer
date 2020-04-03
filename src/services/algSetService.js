export const $3X3 = "333";
export const OLL = "oll";
export const PLL = "pll";
const BASE =
	"http://cubiclealgdbserver.azurewebsites.net/user/content/caseGroup";

function getKey(cubeType, set) {
	return `${cubeType}/${set}`;
}

function retrieve(cubeType, set) {
	const lsValue = localStorage.getItem(getKey(cubeType, set));
	try {
		return JSON.parse(lsValue);
	} catch (_) {
		return lsValue;
	}
}

function store(cubeType, set, data) {
	return localStorage.setItem(getKey(cubeType, set), JSON.stringify(data));
}

function fetchAlgSet(cubeType, set) {
	return fetch(`${BASE}/${getKey(cubeType, set)}`)
		.then((response) => response.json())
		.then((json) => {
			store(cubeType, set, json);
			return json;
		});
}

export function getAlgSet(cubeType, set) {
	const fromLocalStorage = retrieve(cubeType, set);
	if (fromLocalStorage) return Promise.resolve(fromLocalStorage);
	return fetchAlgSet(cubeType, set);
}
