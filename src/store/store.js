import Vue from "vue";
import Vuex from "vuex";
import * as mutations from "./mutations";
import * as actions from "./actions";
import { persistToLocalStorage } from "./plugins";
import { PLL } from "../api/algSetService";
Vue.use(Vuex);

const state = {
	algSet: PLL,
	cases: [],
	loaded: false,
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	plugins: [persistToLocalStorage],
});
