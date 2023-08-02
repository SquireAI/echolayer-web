<script lang="ts">
	import { Anchor, type Connections } from "svelvet";
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

<Anchor id={`anchor-${parentId}-input-anchor`} input multiple connections={anchorConnections.map(connection => connection[1])} direction="north">
	<div slot="edge">
		<Edge selected={selected} />
	</div>
	<div class={`anchor__input ${selected ? "anchor__input--selected" : ""}`}></div>
</Anchor>
