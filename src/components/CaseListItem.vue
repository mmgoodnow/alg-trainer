<template>
	<div class="item grid" :disabled="alg.disabled" @click="toggleDisabled">
		<div class="image-container image">
			<CubeImage :alg="alg.pigCase" />
		</div>
		<strong class="name">{{ alg.name }}</strong>
		<strong class="median">{{ median }}</strong>
		<strong class="best">{{ best }}</strong>
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
		return min(this.alg.times) || null;
	},
	median() {
		return median(this.alg.times) || null;
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
	grid-template-rows: 1fr 1fr 1fr;
	grid-template-areas:
		"image name"
		"image median"
		"image best";
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
}

.median {
	grid-area: timer;
}

.best {
	grid-area: best;
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
