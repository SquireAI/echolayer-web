<script lang="ts">
	import { Background, Svelvet } from "svelvet";
	import { data } from "./sample-data";
	import { layout } from "./layout";
	import type { BaseEntity, LeveledNodeLayout } from "$lib/types";

	const nodes: BaseEntity[]  = [...data.components, ...data.teams]
	const nodesByRow: LeveledNodeLayout = layout(nodes, data.relations, "teamteam");
</script>

<Svelvet zoom={1} fixedZoom={false} theme="echolayer">
	{#each nodesByRow as rowEntry}
		{#each rowEntry as entry}
			<svelte:component this={entry[1].nodeType} component={entry[1].node} origin={entry[1].origin} outputConnections={entry[1].outputConnections} inputConnections={entry[1].inputConnections} />
		{/each}
	{/each}
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
