<template>
	<div>
		<img
			class="cube-img"
			v-on:load="onLoad('current')"
			v-bind:src="curSrc"
			v-bind:alt="curAlt"
		/>
		<img
			class="preload"
			v-on:load="onLoad('next')"
			v-bind:src="nextSrc"
			v-bind:alt="nextAlt"
		/>
	</div>
</template>

<script>
import * as Cube from "cubejs";

const BASE = "http://cube.crider.co.uk/visualcube.php";

function url(cube) {
	const faceletString = cube.asString();
	const queryParams = {
		fmt: "svg",
		view: "plan",
		fd: faceletString.toLowerCase(),
	};
	const entries = Object.entries(queryParams).map((qp) => qp.join("="));
	return `${BASE}?${entries.join("&")}`;
}

function alt(cube) {
	return cube.asString();
}

const computed = {
	curSrc() {
		return url(this.cube);
	},
	nextSrc() {
		return url(this.next);
	},
	curAlt() {
		return alt(this.cube);
	},
	nextAlt() {
		return alt(this.next);
	},
};

const methods = {
	onLoad(t) {
		console.log("loaded", t);
	},
};

const props = {
	cube: Cube,
	next: Cube,
};

export default { name: "CubeImage", computed, methods, props };
</script>

<style scoped>
.cube-img {
	width: 20%;
	height: 20%;
}
.preload {
	display: none;
}
</style>
