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
			<CubeImage :alg="curAlg" />
			<Timer :hint="curAlg" :hintDelayMs="2000" @stop="handleStop"></Timer>
			<button autofocus v-on:click="handleNext">Next</button>
		</div>
	</div>
</template>

<script>
import CubeImage from "./components/CubeImage";
import Timer from "./components/Timer";
import { $3X3, getAlgSet, OLL, PLL } from "./services/algSetService";
import { getRandomInt } from "./lib/helpers";

const data = () => ({
	algs: null,
	loaded: false,
	algIndex: null,
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
		if (this.algIndex === null) return null;
		return this.algs[this.algIndex].pigCase;
	},
};

const methods = {
	handleNext() {
		console.log("onNext called");
		this.algIndex = getRandomInt(this.algs.length);
	},
	handleNewAlgSet({ target: { value: newAlgSet } }) {
		this.loaded = false;
		getAlgSet($3X3, newAlgSet).then((json) => {
			this.algSet = newAlgSet;
			this.loaded = true;
			this.algs = json;
			this.algIndex = null;
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
