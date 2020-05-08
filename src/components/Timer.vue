<template>
	<div>
		<div class="noflash">
			<h1>{{ seconds }}</h1>
			<h1 v-if="showHint">{{ hint }}</h1>
			<template v-if="!disabled">
				<button v-if="isRunning" @click="stop" autofocus>Stop</button>
				<button v-else @click="start" autofocus>Start</button>
			</template>
		</div>
		<div
			class="flash"
			:class="{ flashstart: isRunning, preflash: autostartTimeoutId }"
		/>
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
};

const computed = {
	seconds() {
		return (this.elapsedMs / 1000).toFixed(3);
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
		}, 2000);
	},
	start() {
		clearTimeout(this.autostartTimeoutId);
		this.autostartTimeoutId = null;
		this.startTs = Date.now();
		this.isRunning = true;
		this.hintTimeoutId = setTimeout(() => {
			this.showHint = true;
		}, this.hintDelayMs);
		this.intervalId = setInterval(this.tick, 25);
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
.noflash {
	position: relative;
	z-index: 1;
}
.flash {
	pointer-events: none;
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
}

.flashstart {
	animation: flashstart 1s;
}

.preflash {
	animation: preflash 2s;
}

@keyframes flashstart {
	0% {
		background-color: green;
	}

	100% {
		background-color: unset;
	}
}

@keyframes preflash {
	0% {
		background-color: white;
	}
	49% {
		background-color: unset;
	}
	50% {
		background-color: white;
	}
	100% {
		background-color: unset;
	}
}
</style>
