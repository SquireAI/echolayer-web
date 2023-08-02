<script lang="ts">SVELVET_INTERNAL_NODE_STORE from "svelte";
	import { Anchor } from "svelvet";
	import Edge from "../Edge.svelte";

	export let parentId: string;
	export let anchorConnections: AnchorConnectionData[] = [];
	export let selected: boolean = false;
	let nodeId: string;
	$: {
		nodeId = (getContext(INTERNAL_SVELVET_NODE_STORE) as any).id;
	}
</script>SVELVET_INTERNAL_NODE_STOREr-${parentId}-input-anchor`} input multiple connections={anchorConnections.map(connection => connection.connection)} direction="north">
	<div slot="edge">
		<Edge selected={selected} startingNodeId={nodeId} connections={anchorConnections} />
	</div>
	<div class={`anchor__input ${selected ? "anchor__input--selected" : ""}`}></div>
</Anchor>
