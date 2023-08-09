<script lang="ts">
	import { selectedStore } from '$lib/stores';
	import {
		SVELVET_INTERNAL_NODE_STORE,
		type AnchorConnectionData,
		type GraphedEntity
	} from '$lib/types';

	import { isAnchorSelected } from '$lib/discovery/utils';
	import { getContext } from 'svelte';
	import { Anchor } from 'svelvet';
	import Edge from '../Edge.svelte';

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
	id={`anchor-${parentId}-output-anchor`}
	output
	multiple
	connections={anchorConnections.map((connection) => connection.connection)}
	direction="south"
>
	<div slot="edge">
		<Edge startingNodeId={nodeId} connections={anchorConnections} />
	</div>
	<div class={`anchor__output ${selected ? 'anchor__output--selected' : ''}`} />
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
