<script lang="ts">
	import { Anchor, type Connections } from "svelvet";
	import Edge from "../Edge.svelte";
	
	export let parentId: string;
	export let anchorConnections: Connections = [];
	export let selected: boolean = false;
</script>

<Anchor id={`anchor-${parentId}-output-anchor`} output connections={anchorConnections} direction="south">
	<div slot="edge">
		<Edge selected={selected} />
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