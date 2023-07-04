<script lang="ts">
	export let title: string;
</script>

<style lang="scss">
	.panel-header {
		@apply flex;
		@apply items-center;
		@apply px-2;
		@apply py-4;
		@apply leading-8;
		@apply border-b;
		@apply border-neutral-300;
		// box-shadow: inset 0 -1px 0 0 theme(colors.neutral.200);
	}
</style>

<div class="panel-header">
	<h3>{title}</h3>
</div>