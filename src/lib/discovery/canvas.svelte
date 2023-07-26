<script lang="ts">
	import { Background, Svelvet } from "svelvet";
	import { layout } from "./layout";
	import type { BaseEntity, ComponentEntity, LeveledNodeLayout, RelationGraphEntity, TeamEntity } from "$lib/types";
	import { setOriginOnNodeLayout } from "./utils";

	export let components: ComponentEntity[] = [];
	export let teams: TeamEntity[] = [];
	export let relations: RelationGraphEntity[] = [];
	export let origin: BaseEntity;

	const nodes: BaseEntity[]  = [...components, ...teams];
	let nodesByRow: LeveledNodeLayout = [];

	function updateGraph() {
		nodesByRow = layout(nodes, relations, origin.publicId);
		nodesByRow = setOriginOnNodeLayout(nodesByRow, origin.publicId);
	}

	/**
	 * Update the graph by figuring out a new layout when we get a new collection
	 * of relations.
	 * We get a new set of relations when a new origin is set, so it's implied when
	 * we redo the layout that a new origin is already present at this time.
	 * The function will also assign the right node to be the origin as well for when
	 * we need to draw it.
	*/
	$: relations, updateGraph();
</script>

<!-- Each entry being drawn needs to be keyed for when updates to the graph are made, else you get an error -->
<Svelvet zoom={1} fixedZoom={false} theme="echolayer">
	{#each nodesByRow as rowEntry}
		{#each rowEntry as entry (entry[1].node.publicId)}
			<svelte:component this={entry[1].nodeType} component={entry[1].node} origin={entry[1].origin} outputConnections={entry[1].outputConnections} inputConnections={entry[1].inputConnections} />
		{/each}
	{/each}
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
