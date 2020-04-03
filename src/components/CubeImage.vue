<template>
	<div id="cube-img"></div>
</template>

<script>
import { cubeSVG } from "sr-visualizer";

function mounted() {
	console.log("mounted fired");
	this.rerender();
}

const watch = {
	alg() {
		console.log("watch fired");
		this.rerender();
	},
};

const methods = {
	rerender() {
		const container = document.getElementById("cube-img");
		while (container.firstChild) {
			container.removeChild(container.lastChild);
		}
		cubeSVG(document.getElementById("cube-img"), {
			view: "plan",
			case: this.alg,
		});
	},
};

const props = {
	alg: String,
};

export default { name: "CubeImage", mounted, watch, methods, props };
</script>

<style>
svg {
	width: 500px;
	max-width: 100%;
	height: auto;
}
</style>
