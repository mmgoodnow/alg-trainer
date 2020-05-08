<template>
	<div>
		<h1>{{ seconds }}</h1>
		<h1 v-if="showHint">{{ hint }}</h1>
		<template v-if="!disabled">
			<button v-if="isRunning" @click="stop" autofocus>Stop</button>
			<button v-else @click="start" autofocus>Start</button>
		</template>
		<div :class="{ flash: isRunning }" />
	</div>
</template>

<script>
const data = () => ({
	startTs: null,
	isRunning: false,
	showHint: false,
	hintTimeoutId: null,
	intervalId: null,
	elapsedMs: 0,
	autostartTimeoutId: null,
});

const props = {
	hint: String,
	hintDelayMs: Number,
	disabled: Boolean,
	autostartDelayMs: Number,
};

const computed = {
	seconds() {
		return (this.elapsedMs / 1000).toFixed(1);
	},
};

const watch = {
	disabled(newVal, oldVal) {
		if (!newVal && oldVal) {
			this.autostart();
		}
	},
};

function mounted() {
	if (!this.disabled) {
		this.autostart();
	}
}

const methods = {
	autostart() {
		this.autostartTimeoutId = setTimeout(() => {
			this.start();
		}, this.autostartDelayMs);
	},
	start() {
		clearTimeout(this.autostartTimeoutId);
		this.startTs = Date.now();
		this.isRunning = true;
		this.hintTimeoutId = setTimeout(() => {
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
		clearTimeout(this.hintTimeoutId);
		clearInterval(this.intervalId);
		this.$emit("stop", { target: { value: this.elapsedMs / 1000 } });
	},
};

export default {
	name: "Timer",
	data,
	computed,
	props,
	methods,
	watch,
	mounted,
};
</script>

<style scoped>
.flash {
	pointer-events: none;
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	animation: flash 1s;
}

@keyframes flash {
	0% {
		background-color: white;
	}
}
</style>
