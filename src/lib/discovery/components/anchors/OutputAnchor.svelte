<script lang="ts">
	import type { AnchorConnection } from "$lib/types";
	import { Anchor, type Connections } from "svelvet";
	import { toNodeConnections } from ".";
	import Edge from "../Edge.svelte";
	
	export let parentId: string;
	export let anchorConnections: Connections = [];
	export let selected: boolean = false;
	
	/**
	 * Input anchor needs to accept a collection of [nodeId, nodeAnchorId] tuples
	*/

	// const connections: Connections = toNodeConnections(anchorConnections);
	// console.log(connections);

	// const conn: Connections = [["node_componentmonolith", "anchor-node_componentmonolith-input-anchor"]];
</script>

<Anchor id={`anchor-${parentId}-output-anchor`} output connections={anchorConnections} edge={Edge} direction="south">
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