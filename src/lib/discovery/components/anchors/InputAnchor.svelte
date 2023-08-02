<script lang="ts">
	import type { AnchorConnectionData } from "$lib/types";
	import { getContext } from "svelte";
	import { Anchor } from "svelvet";
	import Edge from "../Edge.svelte";

	export let parentId: string;
	export let anchorConnections: AnchorConnectionData[] = [];
	export let selected: boolean = false;
	let nodeId: string;
	$: {
		nodeId = (getContext("node") as any).id;
	}
</script>
<Anchor id={`anchor-${parentId}-input-anchor`} input multiple connections={anchorConnections.map(connection => connection.connection)} direction="north">
	<div slot="edge">
		<Edge selected={selected} startingNodeId={nodeId} connections={anchorConnections} />
	</div>
	<div class={`anchor__input ${selected ? "anchor__input--selected" : ""}`}></div>
</Anchor>
