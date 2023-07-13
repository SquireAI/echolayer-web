<script lang="ts">
	import { Anchor, type Connections } from "svelvet";
	import DefaultEdge from "../edges/DefaultEdge.svelte";
	import SelectedEdge from "../edges/SelectedEdge.svelte";
	
	export let parentId: string;
	export let anchorConnections: Connections = [];
	export let selected: boolean = false;
</script>

<Anchor id={`anchor-${parentId}-input-anchor`} input connections={anchorConnections} direction="north">
	<div slot="edge">
		{#if selected}
			<SelectedEdge />
		{:else}
			<DefaultEdge />
		{/if}
	</div>
	<div class={`anchor__input ${selected ? "anchor__input--selected" : ""}`}></div>
</Anchor>
