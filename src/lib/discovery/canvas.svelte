<script lang="ts">
	import { Background, Svelvet } from "svelvet";
	import TeamEntityNode from "./components/TeamEntityNode.svelte";
	import { data } from "./sample-data";
	import ComponentEntityNode from "./components/ComponentEntityNode.svelte";
	import { getConnectionForNode } from "./components/anchors";
	import { AnchorConnectionTypes } from "$lib/types";

	const { INPUT, OUTPUT } = AnchorConnectionTypes;
</script>

<Svelvet zoom={1} fixedZoom={false} theme="echolayer">
	<TeamEntityNode component={data.teams[0]} origin={{ x: 20, y: 20 }} outputConnections={[getConnectionForNode("componentmonolith", INPUT)]} />
	<TeamEntityNode component={data.teams[1]} origin={{ x: 280, y: 20 }} />
	<ComponentEntityNode component={data.components[0]} owners={[data.teams[0]]} origin={{ x: 20, y: 220 }} inputConnections={[getConnectionForNode("teamdishwashers", OUTPUT)]} />
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
