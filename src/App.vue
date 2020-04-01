<template>
	<div id="app">
		<h1 v-if="!loaded">Loading...</h1>
		<div v-else>
			<label>
				Set:
				<select v-on:change="onNewAlgSet" :value="algSet">
					<option :key="option" v-for="option in algSetOptions" :value="option">
						{{ option.toUpperCase() }}
					</option>
				</select>
			</label>
			<CubeImage :cube="cube" :next="next" />
			<button autofocus v-on:click="onNext">Next</button>
		</div>
	</div>
</template>

<script>
import CubeImage from "./components/CubeImage";
import * as Cube from "cubejs";
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
	this.loaded = false;
	fetchAlgSet($3X3, PLL).then((json) => {
		this.loaded = true;
		this.algs = json;
		this.onNext();
	});
}

const components = {
	CubeImage,
};

const computed = {
	cube() {
		if (!this.loaded) return null;
		if (this.currentAlgIndex === null) return new Cube();
		return new Cube().move(
			Cube.inverse(this.algs[this.currentAlgIndex].pigCase)
		);
	},
	next() {
		if (!this.loaded) return null;
		if (this.nextAlgIndex === null) return new Cube();
		return new Cube().move(Cube.inverse(this.algs[this.nextAlgIndex].pigCase));
	},
};

const methods = {
	onNext() {
		console.log("onNext called");
		this.currentAlgIndex = this.nextAlgIndex;
		this.nextAlgIndex = getRandomInt(this.algs.length);
	},
	onNewAlgSet({ target: { value: newAlgSet } }) {
		this.loaded = false;
		fetchAlgSet($3X3, newAlgSet).then((json) => {
			this.algSet = newAlgSet;
			this.loaded = true;
			this.algs = json;
			this.currentAlgIndex = null;
			this.nextAlgIndex = null;
			this.onNext();
		});
	},
};
export default { name: "App", data, components, computed, created, methods };
</script>

<style>
html,
body {
	width: 100%;
	height: 100%;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
