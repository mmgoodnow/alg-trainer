<template>
	<div class="list">
		<CaseListItem v-for="(alg, index) in cases" :key="alg.id" :index="index" />
	</div>
</template>

<script>
import CaseListItem from "./CaseListItem";

const computed = {
	cases() {
		return this.$store.state.cases;
	},
};

export default {
	name: "CaseList",
	computed,
	components: { CaseListItem },
};
</script>

<style scoped>
.list {
	text-align: left;
	overflow: scroll;
}
</style>
