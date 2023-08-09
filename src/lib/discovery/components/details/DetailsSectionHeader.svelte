<script lang="ts">
	export let label: string;
</script>

<div class="header">
	<span>{label}</span>
</div>

<style lang="scss">
	.header {
		@apply border-b border-b-neutral-200;
		@apply px-3 py-2.5;
		@apply text-neutral-500;
		@apply text-xs;

		padding-left: calc(0.75rem + 2px);
	}
</style>
