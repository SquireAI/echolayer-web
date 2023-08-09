<script lang="ts">
	import {
		SVELVET_INTERNAL_NODE_STORE,
		type AnchorConnectionData,
		type GraphedEntity
	} from '$lib/types';
	import { getContext } from 'svelte';
	import { Anchor } from 'svelvet';
	import Edge from '../Edge.svelte';
	import { selectedStore } from '$lib/stores';
	import { isAnchorSelected } from '$lib/discovery/utils';

	export let parentId: string;
	export let anchorConnections: AnchorConnectionData[] = [];
	let nodeId: string;
	$: {
		nodeId = (getContext(SVELVET_INTERNAL_NODE_STORE) as any).id;
	}
	$: selected = isSelected($selectedStore.entity);

	const isSelected = (selectedNode?: GraphedEntity) => {
		const id: string = (getContext(SVELVET_INTERNAL_NODE_STORE) as any).id;
		return isAnchorSelected(id, anchorConnections, selectedNode);
	};
</script>

<Anchor
	id={`anchor-${parentId}-input-anchor`}
	input
	multiple
	connections={anchorConnections.map((connection) => connection.connection)}
	direction="north"
>
	<div slot="edge">
		<Edge startingNodeId={nodeId} connections={anchorConnections} />
	</div>
	<div class={`anchor__input ${selected ? 'anchor__input--selected' : ''}`} />
</Anchor>
