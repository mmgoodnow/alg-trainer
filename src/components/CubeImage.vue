<template>
	<div>
		<img
			class="cube-img"
			v-on:load="onLoad('current')"
			:src="curSrc"
			alt
			:key="curAlg"
		/>
		<img
			class="preload"
			v-on:load="onLoad('next')"
			:src="nextSrc"
			alt
			:key="nextAlg"
		/>
	</div>
</template>

<script>
const BASE = "http://cube.crider.co.uk/visualcube.php";

function url(alg) {
	if (!alg) alg = "";
	const queryParams = {
		fmt: "svg",
		view: "plan",
		case: alg,
	};
	const entries = Object.entries(queryParams).map(
		([k, v]) => `${k}=${encodeURIComponent(v)}`
	);
	return `${BASE}?${entries.join("&")}`;
}

const computed = {
	curSrc() {
		return url(this.curAlg);
	},
	nextSrc() {
		return url(this.nextAlg);
	},
};

const methods = {
	onLoad(t) {
		console.log("loaded", t);
	},
};

const props = {
	curAlg: String,
	nextAlg: String,
};

export default { name: "CubeImage", computed, methods, props };
</script>

<style scoped>
.cube-img {
	width: 500px;
	max-width: 100%;
}
.preload {
	display: none;
}
</style>
