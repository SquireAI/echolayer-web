<script lang="ts">
	import { Anchor, type Connections } from "svelvet";
	import Edge from "../Edge.svelte";
	
	export let parentId: string;
	export let anchorConnections: Connections = [];
	export let selected: boolean = false;
	
</script>

<Anchor id={`anchor-${parentId}-input-anchor`} input connections={anchorConnections} edge={Edge} direction="north">
	<div class={`anchor__input ${selected ? "anchor__input--selected" : ""}`}></div>
</Anchor>
