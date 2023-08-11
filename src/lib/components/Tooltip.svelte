<script lang="ts">
	export let content: string;
	export let visible = false;
	export let classes = '';
</script>

{#if visible}
	<div class={`absolute bg-black/80 text-white rounded-md font-medium p-1.5 ${classes}`}>
		{content}
	</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 8px;
		border-radius: 4px;
		z-index: 9999;
	}
</style>
