<script lang="ts">
	export let title: string;
	export let disabled = false;
</script>

<style lang="scss">
	.panel-header {
		@apply flex items-center;
		@apply px-4 py-4;
		@apply leading-8;
		@apply border-b border-neutral-300;
		@apply flex flex-row;
		@apply bg-white;

		&.disabled {
			@apply text-neutral-400;
		}
	}
</style>

<div class="panel-header" class:disabled={disabled}>
	<div class="flex-1 flex flex-row items-center">
		<span><slot name="left-action"></slot></span>
		<span class="mx-3 flex-1">{title}</span>
		<span><slot name="right-action"></slot></span>
	</div>
</div>
