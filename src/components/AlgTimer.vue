<template>
	<div>
		<h1 v-if="!loaded">Loading...</h1>
		<div v-else>
			<CubeImage :alg="pigCase" />
			<Timer
				v-if="index !== null"
				:hint="pigCase"
				:hint-delay-ms="2000"
				@stop="handleStop"
				:disabled="isTimerDisabled"
			/>
			<button v-if="isTimerDisabled" @click="handleNext" autofocus>Next</button>
			<button v-if="isTimerDisabled && index !== null" @click="deleteLast">
				Delete
			</button>
		</div>
	</div>
</template>
<script>
import CubeImage from "./CubeImage";
import Timer from "./Timer";
import { mapState } from "vuex";
import { getRandomInt } from "../lib/helpers";

const data = () => ({
	index: null,
	isTimerDisabled: true,
});

const computed = {
	...mapState({
		loaded: (state) => state.loaded,
		cases: (state) => state.cases,
	}),
	pigCase() {
		if (!this.loaded) return null;
		if (this.index === null) return null;
		return this.cases[this.index].pigCase;
	},
};

const methods = {
	handleStop(evt) {
		this.isTimerDisabled = true;
		this.$store.dispatch("ADD_TIME", {
			index: this.index,
			time: evt.target.value,
		});
	},
	handleNext() {
		this.isTimerDisabled = false;
		const filtered = this.cases.filter((algCase) => !algCase.disabled);
		const filteredIndex = getRandomInt(filtered.length);
		this.index = this.cases.indexOf(filtered[filteredIndex]);
	},
	deleteLast() {
		this.$store.dispatch("DELETE_LAST_TIME", { index: this.index });
		this.index = null;
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
