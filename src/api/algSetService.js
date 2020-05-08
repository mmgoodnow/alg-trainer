import { getAlgSetKey } from "../lib/helpers";

export const $3X3 = "333";
export const OLL = "oll";
export const PLL = "pll";
const BASE =
	"https://cubiclealgdbserver.azurewebsites.net/user/content/caseGroup";

export function fetchAlgSet(cubeType, set) {
	const url = `${BASE}/${getAlgSetKey(cubeType, set)}`;
	return fetch(url).then((response) => response.json());
}
