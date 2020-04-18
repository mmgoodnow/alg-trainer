<template>
	<div>
		<h1 v-if="!loaded">Loading...</h1>
		<div v-else>
			<CubeImage :alg="pigCase" />
			<Timer :hint="pigCase" :hintDelayMs="2000" @stop="handleStop" />
			<button autofocus v-on:click="handleNext">Next</button>
		</div>
	</div>
</template>
<script>
import CubeImage from "./CubeImage";
import Timer from "./Timer";
import { mapState } from "vuex";
import { getRandomInt } from "../lib/helpers";

const data = () => ({
	currentIndex: null,
});

const computed = {
	...mapState({
		loaded: (state) => state.loaded,
		cases: (state) => state.cases,
	}),
	pigCase() {
		if (!this.loaded) return null;
		if (this.currentIndex === null) return null;
		return this.cases[this.currentIndex].pigCase;
	},
};

const methods = {
	handleStop(evt) {
		console.log("stop", evt.target.value);
	},
	handleNext() {
		const filtered = this.cases.filter((algCase) => !algCase.disabled);
		const filteredIndex = getRandomInt(filtered.length);
		this.currentIndex = this.cases.indexOf(filtered[filteredIndex]);
	},
};

export default {
	name: "AlgTimer",
	data,
	computed,
	methods,
	components: { CubeImage, Timer },
};
</script>
<style scoped></style>
