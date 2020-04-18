import { getAlgSetKey } from "../lib/helpers";
import { $3X3 } from "../api/algSetService";

export function persistToLocalStorage(store) {
	store.subscribe((mutation, state) => {
		const { algSet, cases, loaded } = state;
		if (!loaded) return;
		localStorage.setItem(getAlgSetKey($3X3, algSet), JSON.stringify(cases));
	});
}
