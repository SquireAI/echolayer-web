<div
	class="center-wrapper max-w-2xl mx-auto border border-neutral-500 rounded-xl text-neutral-100 bg-neutral-700"
>
	<slot />
</div>

<style lang="scss">
	.center-wrapper {
		@apply relative mx-auto;
		@apply py-6 px-6;
		@apply rounded-3xl;
		@apply border border-neutral-300 border-opacity-10 bg-neutral-800 bg-opacity-80 backdrop-blur-lg;
		@apply ring-2 ring-neutral-500 ring-opacity-5;
	}
</style>
