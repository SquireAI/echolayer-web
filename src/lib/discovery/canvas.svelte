<script lang="ts">
	import { Background, Svelvet } from "svelvet";
	import TeamEntityNode from "./components/TeamEntityNode.svelte";
	import { data } from "./sample-data";
	import ComponentEntityNode from "./components/ComponentEntityNode.svelte";
	import { getConnectionForNode } from "./components/anchors";
	import { AnchorConnectionTypes, type BaseEntity, type ComponentEntity, type TeamEntity } from "$lib/types";
	import { layout } from "./layout";

	const { INPUT, OUTPUT } = AnchorConnectionTypes;

	type Foo = ComponentEntity | TeamEntity;
	const nodes: Foo[]  = [...data.components, ...data.teams]
	const foo = layout(nodes, data.relations, "teamteam");
</script>

<Svelvet zoom={1} fixedZoom={false} theme="echolayer">
	{#each Array.from(foo.entries()) as nodeThingy}
		<svelte:component this={nodeThingy[1].nodeType} component={nodeThingy[1].node} origin={nodeThingy[1].origin} outputConnections={nodeThingy[1].outputConnections} inputConnections={nodeThingy[1].inputConnections} />
	{/each}
	<!-- <TeamEntityNode component={data.teams[0]} origin={{ x: 20, y: 20 }} outputConnections={[getConnectionForNode("componentmonolith", INPUT)]} />
	<TeamEntityNode component={data.teams[1]} origin={{ x: 280, y: 20 }} />
	<ComponentEntityNode component={data.components[0]} owners={[data.teams[0]]} origin={{ x: 20, y: 220 }} inputConnections={[getConnectionForNode("teamdishwashers", OUTPUT)]} /> -->
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
