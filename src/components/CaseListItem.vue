<template>
	<div class="item" :disabled="alg.disabled" @click="toggleDisabled">
		<div class="image-container">
			<CubeImage :alg="alg.pigCase" />
		</div>
		<h2 class="text-white">{{ alg.name }}</h2>
	</div>
</template>

<script>
import CubeImage from "./CubeImage";

const props = {
	alg: Object,
};

const methods = {
	toggleDisabled() {
		this.$emit("toggle-disabled", {
			target: {
				value: {
					...this.alg,
					disabled: !this.alg.disabled,
				},
			},
		});
	},
};
export default {
	name: "CaseListItem",
	components: { CubeImage },
	props,
	methods,
};
</script>

<style scoped>
.item {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	cursor: pointer;
	user-select: none;
}

.item:hover,
.item:disabled {
	text-decoration: line-through;
	filter: brightness(50%);
}

.image-container {
	width: 100px;
	height: 100px;
}
</style>
