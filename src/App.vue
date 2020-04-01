<template>
	<div id="app">
		<p v-if="loading">Loading...</p>
		<div v-else>
			<CubeImage :cube="cube" :next="next" />
			<button v-on:click="onNext">Next</button>
		</div>
	</div>
</template>

<script>
import CubeImage from "./components/CubeImage";
import * as Cube from "cubejs";
import { $3X3, fetchAlgSet, PLL } from "./services/algDbService";

function data() {
	const cube = new Cube();
	const next = new Cube().randomize();
	const loading = true;
	const algs = null;

	return { cube, next, algs, loading };
}

function created() {
	this.loading = true;
	fetchAlgSet($3X3, PLL).then((json) => {
		this.loading = false;
		this.algs = json;
		console.log(this.algs[0]);
	});
}

const components = {
	CubeImage,
};

const computed = {};

const methods = {
	onNext() {
		this.cube = this.next;
		this.next = this.cube.clone().randomize();
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
