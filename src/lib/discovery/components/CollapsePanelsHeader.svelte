<script lang="ts">
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import Text from "svelte-material-icons/Text.svelte";
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

<PanelsHeader {title} bind:disabled={disabled}>
	<span slot="left-action" class="flex">
		{#if open}
			<Text />
		{:else}
			<button class="cursor-pointer" on:click={() => onToggle()}>
				<ArrowCollapseLeft  />
			</button>
		{/if}
	</span>

	<button slot="right-action" class="cursor-pointer" on:click={() => onToggle()}>
		<ArrowCollapseRight />
	</button>
</PanelsHeader>
