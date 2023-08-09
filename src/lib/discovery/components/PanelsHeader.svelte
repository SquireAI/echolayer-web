<script lang="ts">
	export let title: string;
	export let disabled = false;
	export let onClick: () => void;
</script>

<button
	class={`panel-header ${!!onClick && !disabled && 'cursor-pointer'} ${
		disabled && 'cursor-not-allowed'
	}`}
	class:disabled
	on:click={onClick}
>
	<div class="flex-1 flex flex-row items-center">
		<span><slot name="left-action" /></span>
		<span class="mx-3 flex-1">{title}</span>
		<span><slot name="right-action" /></span>
	</div>
</button>

<style lang="scss">
	.panel-header {
		@apply flex items-center;
		@apply px-4 py-2.5;
		@apply leading-8 font-medium;
		@apply border-b border-neutral-300;
		@apply flex flex-row;
		@apply bg-white;

		&.disabled {
			@apply text-neutral-400;
		}
	}
</style>
