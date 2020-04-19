import Vue from "vue";
const getDefaultCaseProperties = () => ({ times: [], disabled: false });

export function SET_LOADED(store, loaded) {
	store.loaded = loaded;
}

export function SET_CASE(store, { index, value }) {
	Vue.set(store.cases, index, value);
}

export function SET_ALG_SET(store, { algSet, cases }) {
	store.algSet = algSet;
	store.cases = cases.map((c) => ({ ...getDefaultCaseProperties(), ...c }));
}

export function SET_DISABLED(store, { index, disabled }) {
	store.cases[index].disabled = disabled;
}

export function ADD_TIME(store, { index, time }) {
	store.cases[index].times.push(time);
}

export function DELETE_LAST_TIME(store, { index }) {
	store.cases[index].times.pop();
}
