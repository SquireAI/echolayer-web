<script lang="ts">
	import { Background, Svelvet } from "svelvet";
	import TeamEntityNode from "./components/TeamEntityNode.svelte";
	import { data } from "./sample-data";
	import ComponentEntityNode from "./components/ComponentEntityNode.svelte";
	import type { AnchorConnection } from "$lib/types";

	const outputConn: AnchorConnection[] = [
		{targetNodeId: "node_teamdishwashers", targetNodeAnchorId: "anchor-node_teamdishwashers-output-anchor"}
	];

	const inputConn: AnchorConnection[] = [
		{ targetNodeId: "node_componentmonolith", targetNodeAnchorId: "anchor-node_componentmonolith-input-anchor"}
	]
</script>

<Svelvet zoom={1} fixedZoom={false} theme="echolayer">
	<TeamEntityNode component={data.teams[0]} origin={{ x: 20, y: 20 }} />
	<!-- <TeamEntityNode component={data.teams[1]} origin={{ x: 280, y: 20 }} /> -->
	<ComponentEntityNode component={data.components[0]} owners={[data.teams[0]]} origin={{ x: 20, y: 220 }} />
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
