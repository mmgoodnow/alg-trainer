<template>
	<div id="app">
		<h1 v-if="!loaded">Loading...</h1>
		<div v-else>
			<label>
				Set:
				<select v-on:change="handleNewAlgSet" :value="algSet">
					<option :key="option" v-for="option in algSetOptions" :value="option">
						{{ option.toUpperCase() }}
					</option>
				</select>
			</label>
			<CubeImage :cur-alg="curAlg" :next-alg="nextAlg" />
			<Timer :hint="curAlg" :hintDelayMs="2000" @stop="handleStop"></Timer>
			<button autofocus v-on:click="handleNext">Next</button>
		</div>
	</div>
</template>

<script>
import CubeImage from "./components/CubeImage";
import Timer from "./components/Timer";
import { $3X3, fetchAlgSet, OLL, PLL } from "./services/algDbService";
import { getRandomInt } from "./lib/helpers";

const data = () => ({
	algs: null,
	loaded: false,
	currentAlgIndex: null,
	nextAlgIndex: null,
	algSet: PLL,
	algSetOptions: [OLL, PLL],
});

function created() {
	this.handleNewAlgSet({ target: { value: PLL } });
}

const components = {
	CubeImage,
	Timer,
};

const computed = {
	curAlg() {
		if (!this.loaded) return null;
		if (this.currentAlgIndex === null) return null;
		return this.algs[this.currentAlgIndex].pigCase;
	},
	nextAlg() {
		if (!this.loaded) return null;
		if (this.nextAlgIndex === null) return null;
		return this.algs[this.nextAlgIndex].pigCase;
	},
};

const methods = {
	handleNext() {
		console.log("onNext called");
		this.currentAlgIndex = this.nextAlgIndex;
		while (this.currentAlgIndex === this.nextAlgIndex) {
			this.nextAlgIndex = getRandomInt(this.algs.length);
		}
	},
	handleNewAlgSet({ target: { value: newAlgSet } }) {
		this.loaded = false;
		fetchAlgSet($3X3, newAlgSet).then((json) => {
			this.algSet = newAlgSet;
			this.loaded = true;
			this.algs = json;
			this.currentAlgIndex = null;
			this.nextAlgIndex = null;
			this.handleNext();
		});
	},
	handleStop(evt) {
		console.log(evt.target.value);
	},
};
export default { name: "App", data, components, computed, created, methods };
</script>

<style>
html,
body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
}

#app {
	padding: 10px;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
