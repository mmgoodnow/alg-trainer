export const $3X3 = "333";
export const OLL = "oll";
export const PLL = "pll";

export function fetchAlgSet(cubeType, set) {
	return fetch(
		`http://cubiclealgdbserver.azurewebsites.net/user/content/caseGroup/${cubeType}/${set}`
	).then((response) => response.json());
}
