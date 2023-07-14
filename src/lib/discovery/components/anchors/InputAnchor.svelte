<script lang="ts">
	import { Anchor, type Connections } from "svelvet";
	import Edge from "../Edge.svelte";
	
	export let parentId: string;
	export let anchorConnections: Connections = [];
	export let selected: boolean = false;

	console.log("ANCHOR CONNS", anchorConnections);
</script>

<Anchor id={`anchor-${parentId}-input-anchor`} input multiple connections={anchorConnections} direction="north">
	<div slot="edge">
		<Edge selected={selected} />
	</div>
	<div class={`anchor__input ${selected ? "anchor__input--selected" : ""}`}></div>
</Anchor>
