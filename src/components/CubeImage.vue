<template>
	<div class="cube-img" ref="container" />
</template>

<script>
import { cubeSVG } from "sr-visualizer";

function mounted() {
	this.rerender();
}

const watch = {
	alg() {
		this.rerender();
	},
};

const methods = {
	rerender() {
		const container = this.$refs.container;
		while (container.firstChild) {
			container.removeChild(container.lastChild);
		}
		cubeSVG(this.$refs.container, {
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
.cube-img > svg {
	width: 500px;
	max-width: 100%;
	height: auto;
}
</style>
