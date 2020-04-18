export function SET_LOADED(store, loaded) {
	store.loaded = loaded;
}

export function SET_CASE(store, { index, value }) {
	store.cases[index] = value;
}

export function SET_ALG_SET(store, { algSet, cases }) {
	store.algSet = algSet;
	store.cases = cases;
}
