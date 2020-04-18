<template>
	<div class="list">
		<div v-for="alg in algs" :key="alg.id">
			<CaseListItem :alg="alg" @toggle-disabled="handleUpdateCase" />
		</div>
	</div>
</template>

<script>
import CaseListItem from "./CaseListItem";
const props = {
	algs: Array,
};

const methods = {
	handleUpdateCase(evt) {
		this.$emit("update-case", evt);
	},
};
export default {
	name: "CaseList",
	components: { CaseListItem },
	props,
	methods,
};
</script>

<style scoped>
.list {
	text-align: left;
	overflow: scroll;
}
</style>
