import { getAlgSetKey } from "../lib/helpers";
import { $3X3, fetchAlgSet } from "../api/algSetService";

const SET_LOADED = "SET_LOADED";
const SET_ALG_SET = "SET_ALG_SET";

export function FETCH_ALG_SET({ commit, state }, algSet) {
	const key = getAlgSetKey($3X3, algSet);

	if (state.loaded && algSet === state.algSet) return;
	commit(SET_LOADED, false);

	function commitNewCases(cases) {
		commit(SET_ALG_SET, { algSet, cases });
		commit(SET_LOADED, true);
	}

	const fromLocalStorage = JSON.parse(localStorage.getItem(key));
	if (Array.isArray(fromLocalStorage)) return commitNewCases(fromLocalStorage);
	fetchAlgSet($3X3, algSet).then(commitNewCases);
}
