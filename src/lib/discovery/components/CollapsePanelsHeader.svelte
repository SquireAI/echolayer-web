<script lang="ts">
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import TextIcon from "svelte-material-icons/Text.svelte";
	import ArrowCollapseRight from "svelte-material-icons/ArrowCollapseRight.svelte";
	import ArrowCollapseLeft from "svelte-material-icons/ArrowCollapseLeft.svelte";
	export let title: string;
	export let open = true;
	export let disabled = false;
	const onToggle = () => {
		if (disabled) return;
		open = !open;
	};
</script>

<PanelsHeader {title} bind:disabled={disabled} onClick={() => onToggle()}>
	<span slot="left-action" class="flex">
		{#if open}
			<TextIcon />
		{:else}
			<ArrowCollapseLeft  />
		{/if}
	</span>

	<div slot="right-action" class="">
		{#if open}
			<ArrowCollapseRight />
		{/if}
	</div>
</PanelsHeader>