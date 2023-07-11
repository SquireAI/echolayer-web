<script lang="ts">
	import type { AnchorConnection } from "$lib/types";
	import { Anchor } from "svelvet";
	import { toNodeConnections } from ".";
	import Edge from "../Edge.svelte";
	
	export let parentId: string;
	export let anchorConnections: AnchorConnection[] = [];
	export let selected: boolean = false;
	
	/**
	 * Input anchor needs to accept a collection of [nodeId, nodeAnchorId] tuples
	*/

	const connections = toNodeConnections(anchorConnections);
</script>

<Anchor id={`node-${parentId}-output-anchor`} input connections={connections} edge={Edge}>
	<div class={`anchor__output ${selected ? "anchor__output--selected" : ""}`}>

	</div>
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