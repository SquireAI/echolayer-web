<script lang="ts">
	import type { AnchorConnection } from "$lib/types";
	import { Anchor, type Connections } from "svelvet";
	import { toNodeConnections } from ".";
	import Edge from "../Edge.svelte";
	
	export let parentId: string;
	export let anchorConnections: Connections = [];
	export let selected: boolean = false;
	
	/**
	 * Input anchor needs to accept a collection of [nodeId, nodeAnchorId] tuples
	*/
	// console.log(anchorConnections);
	// const connections: Connections = toNodeConnections(anchorConnections);
	// console.log(connections);

	
</script>

<Anchor id={`anchor-${parentId}-input-anchor`} input connections={anchorConnections} edge={Edge} direction="north">
	<div class={`anchor__wrapper ${selected ? "anchor__wrapper--selected" : ""}`}>
		<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M20.5 1.5L11 11L1.5 1.5" stroke="black" stroke-width="3" stroke-linecap="round"/>
		</svg>
	</div>
</Anchor>

<style lang="scss">
	.anchor__wrapper {
		$self: &;
		@apply w-6;
		@apply h-4;
		@apply flex;
		path {
			@apply stroke-neutral-500;
		}
		&--selected {
			path {
				@apply stroke-echolayer-blue-100;
			}
		}
	}
</style>
