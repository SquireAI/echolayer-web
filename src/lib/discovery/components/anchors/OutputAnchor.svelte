<script lang="ts">
	import { SVELVET_INTERNAL_NODE_STORE, type AnchorConnectionData, type BaseEntity, SVELVET_INTERNAL_EDGE_STORE } from "$lib/types";
	import { selectedStore } from "$lib/stores";

	import { getContext } from "svelte";
	import { Anchor } from "svelvet";
	import Edge from "../Edge.svelte";
	
	export let parentId: string;
	export let anchorConnections: AnchorConnectionData[] = [];
	let nodeId: string;
	$: {
		nodeId = (getContext(SVELVET_INTERNAL_NODE_STORE) as any).id;
	}
	$: selected = isSelected($selectedStore.entity);

	const isSelected = (selectedNode?: BaseEntity) => {
		if (!selectedNode) {
			return false;
		}
		const id: string = (getContext(SVELVET_INTERNAL_NODE_STORE) as any).id;
		const connectedNodeIds = anchorConnections.map((connection) => {
			return connection.connection[0];
		})
		return id.includes(selectedNode.publicId) || !!connectedNodeIds.find((nodeId) => nodeId.includes(selectedNode.publicId));
	}
</script>

<Anchor id={`anchor-${parentId}-output-anchor`} output multiple connections={anchorConnections.map(connection => connection.connection)} direction="south">
	<div slot="edge">
		<Edge startingNodeId={nodeId} connections={anchorConnections} />
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