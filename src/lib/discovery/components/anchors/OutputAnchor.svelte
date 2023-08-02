<script lang="ts">
	import { Anchor } from "svelvet";
	import Edge from "../Edge.svelte";
	import { ANCHOR_EDGE_NAMES_CONTEXT_KEY, type AnchorConnectionTuple } from "$lib/types";
	import { setContext } from "svelte";
	
	export let parentId: string;
	export let anchorConnections: AnchorConnectionTuple[] = [];
	export let selected: boolean = false;
	$: {
		for (let connection of anchorConnections) {
			const name = `A-${connection[1][1]}/N-${connection[1][0]}`;
			const newContext = {
				[name]: connection[0],
			}
			setContext(ANCHOR_EDGE_NAMES_CONTEXT_KEY, newContext);
		}
	}
</script>

<Anchor id={`anchor-${parentId}-output-anchor`} output multiple connections={anchorConnections.map(connection => connection[1])} direction="south">
	<div slot="edge">
		<Edge selected={selected} />
	</div>
	<div class={`anchor__output ${selected ? "anchor__output--selected" : ""}`}>	</div>
</Anchor>

<style lang="scss">
	.anchor__output {
		@apply w-4;
		@apply h-4;
		@apply rounded-2xl;
		@apply bg-neutral-500;
		&#{&}--selected {
			@apply bg-echolayer-blue-100;
		}
	}
</style>