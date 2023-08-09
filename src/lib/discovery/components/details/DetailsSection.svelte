<script>
	export let label = 'Properties';
</script>

<div class="details-section">
	<div class="header">
		<span>{label}</span>
	</div>
	<div class="space-y-1">
		<slot name="content" />
	</div>
</div>

<style lang="scss">
	.details-section {
		.header {
			@apply border-b;
			@apply px-3 py-2.5;
			@apply text-neutral-500;
			@apply border-l-2 border-l-transparent;
			@apply text-xs;
		}
	}
</style>
