<script lang="ts">
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import Text from "svelte-material-icons/Text.svelte";
	import ArrowCollapseRight from "svelte-material-icons/ArrowCollapseRight.svelte";
	import ArrowCollapseLeft from "svelte-material-icons/ArrowCollapseLeft.svelte";
	export let title: string;
	export let open = true;
	const onToggle = () => open = !open;
</script>

<style lang="scss">
	.panel-header {
		@apply flex items-center;
		@apply px-4 py-4;
		@apply leading-8;
		@apply border-b border-neutral-300;
		@apply flex flex-row;
	}
</style>

<PanelsHeader title={title}>
	<span slot="left-action">
	{#if open}
		<Text />
	{:else}
		<span class="cursor-pointer" on:click={() => onToggle()}>
			<ArrowCollapseLeft />
		</span>
	{/if}
	</span>

	<span slot="right-action" class="cursor-pointer" on:click={() => onToggle()}>
		<ArrowCollapseRight />
	</span>
</PanelsHeader>
