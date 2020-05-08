<template>
	<!-- mousedown handler is to prevent the blur event on focused buttons-->
	<div class="grid" @mousedown.stop.prevent>
		<div class="selector">
			<label>
				<strong>Set:</strong>
				<select v-on:change="handleNewAlgSet" :value="algSet">
					<option :key="option" v-for="option in algSetOptions" :value="option">
						{{ option.toUpperCase() }}
					</option>
				</select>
			</label>
		</div>
		<AlgTimer class="timer" />
		<CaseList class="list" />
	</div>
</template>

<script>
import CaseList from "./CaseList";
import CubeImage from "./CubeImage";
import Timer from "./Timer";
import { OLL, PLL } from "../api/algSetService";
import { mapActions, mapState } from "vuex";
import AlgTimer from "./AlgTimer";

const data = () => ({
	algSetOptions: [OLL, PLL],
});

function created() {
	this.fetchAlgSet(PLL);
}

const components = {
	CubeImage,
	Timer,
	CaseList,
	AlgTimer,
};

const computed = {
	...mapState({
		algSet: (state) => state.algSet,
		cases: (state) => state.cases,
		loaded: (state) => state.loaded,
	}),
};

const methods = {
	handleNewAlgSet(evt) {
		this.fetchAlgSet(evt.target.value);
	},
	...mapActions({
		fetchAlgSet: "FETCH_ALG_SET",
	}),
};
export default {
	name: "AlgTrainer",
	data,
	components,
	computed,
	created,
	methods,
};
</script>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: 200px 1fr;
	grid-template-rows: 25px 1fr;
	grid-template-areas:
		"selector timer"
		"list timer";
	width: 100%;
	height: 100%;
	column-gap: 8px;
	background-color: #f9cc00;
}

.selector {
	grid-area: selector;
	background-color: #3a445d;
	color: #e8ebe6;
}

.list {
	grid-area: list;
	background-color: #3a445d;
	color: #e8ebe6;
}

.timer {
	grid-area: timer;
	background-color: #cdcacc;
}
</style>
