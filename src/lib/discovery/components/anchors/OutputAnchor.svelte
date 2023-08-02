<script lang="ts">
	import { INTERNAL_SVELVET_NODE_STORE, type AnchorConnectionData } from "$lib/types";
	import { getContext } from "svelte";
	import { Anchor } from "svelvet";
	import Edge from "../Edge.svelte";
	
	export let parentId: string;
	export let anchorConnections: AnchorConnectionData[] = [];
	export let selected: boolean = false;
	let nodeId: string;
	$: {
		nodeId = (getContext(INTERNAL_SVELVET_NODE_STORE) as any).id;
	}
</script>

<Anchor id={`anchor-${parentId}-output-anchor`} output multiple connections={anchorConnections.map(connection => connection.connection)} direction="south">
	<div slot="edge">
		<Edge selected={selected} startingNodeId={nodeId} connections={anchorConnections}/>
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