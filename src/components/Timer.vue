<template>
	<div>
		<h1>{{ seconds }}</h1>
		<h1 v-if="showHint">{{ hint }}</h1>
		<div v-if="!disabled">
			<button v-if="isRunning" @click="stop" autofocus>Stop</button>
			<button v-else @click="start" autofocus>Start</button>
		</div>
	</div>
</template>

<script>
const data = () => ({
	startTs: null,
	isRunning: false,
	showHint: false,
	timeoutId: null,
	intervalId: null,
	elapsedMs: 0,
});

const props = {
	hint: String,
	hintDelayMs: Number,
	disabled: Boolean,
};

const computed = {
	seconds() {
		return (this.elapsedMs / 1000).toFixed(1);
	},
};

const methods = {
	start() {
		this.startTs = Date.now();
		this.isRunning = true;
		this.timeoutId = setTimeout(() => {
			this.showHint = true;
		}, this.hintDelayMs);
		this.intervalId = setInterval(this.tick, 100);
	},
	tick() {
		this.elapsedMs = Date.now() - this.startTs;
	},
	stop() {
		this.elapsedMs = Date.now() - this.startTs;
		this.isRunning = false;
		this.showHint = false;
		clearTimeout(this.timeoutId);
		clearInterval(this.intervalId);
		this.$emit("stop", { target: { value: this.elapsedMs / 1000 } });
	},
};

export default { name: "Timer", data, computed, props, methods };
</script>

<style scoped></style>
