<template>
	<div class="item grid" :disabled="alg.disabled" @click="toggleDisabled">
		<div class="image-container image">
			<CubeImage :alg="alg.pigCase" />
		</div>
		<div class="name">
			<strong>{{ alg.name }}</strong>
		</div>
		<div class="stats">
			<div>Med {{ median }}</div>
			<div>Best {{ best }}</div>
		</div>
	</div>
</template>

<script>
import CubeImage from "./CubeImage";
import { median, min } from "../lib/helpers";

const props = {
	index: Number,
};

const computed = {
	alg() {
		return this.$store.state.cases[this.index];
	},
	best() {
		const minimum = min(this.alg.times);
		if (!minimum) return null;
		return minimum.toFixed(3);
	},
	median() {
		const med = median(this.alg.times);
		if (!med) return null;
		return med.toFixed(3);
	},
};

const methods = {
	toggleDisabled() {
		this.$store.dispatch("TOGGLE_DISABLED", { index: this.index });
	},
};
export default {
	name: "CaseListItem",
	computed,
	props,
	methods,
	components: { CubeImage },
};
</script>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: 100px 1fr;
	grid-template-rows: 1fr 1fr;
	grid-template-areas:
		"image name"
		"image stats";
	height: 100px;
	max-height: 100px;
}

.image {
	grid-area: image;
	width: 100px;
	height: 100px;
}

.name {
	grid-area: name;
	align-self: end;
	font-size: x-large;
}

.item {
	cursor: pointer;
	user-select: none;
}

.item:hover {
	filter: brightness(80%);
}

.item[disabled] {
	text-decoration: line-through;
	filter: brightness(50%);
}
</style>
