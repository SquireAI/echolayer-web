<script lang="ts">
	import { SVELVET_INTERNAL_NODE_STORE, type AnchorConnectionData, type BaseEntity } from "$lib/types";
	import { getContext } from "svelte";
	import { Anchor } from "svelvet";
	import Edge from "../Edge.svelte";
	import { selectedStore } from "$lib/stores";

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
		});
		return id.includes(selectedNode.publicId) || connectedNodeIds.find((nodeId) => nodeId.includes(selectedNode.publicId));
	}
</script>
<Anchor id={`anchor-${parentId}-input-anchor`} input multiple connections={anchorConnections.map(connection => connection.connection)} direction="north">
	<div slot="edge">
		<Edge startingNodeId={nodeId} connections={anchorConnections} />
	</div>
	<div class={`anchor__input ${selected ? "anchor__input--selected" : ""}`}></div>
</Anchor>
