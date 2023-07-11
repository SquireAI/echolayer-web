<script lang="ts">
	import { Background, Svelvet } from "svelvet";
	import TeamEntityNode from "./components/TeamEntityNode.svelte";
	import { data } from "./sample-data";
	import ComponentEntityNode from "./components/ComponentEntityNode.svelte";
	import type { AnchorConnection } from "$lib/types";

	const outputConn: AnchorConnection[] = [
		{targetNodeId: "N-node_teamdishwashers", targetNodeAnchorId: "A-node-node_teamdishwashers-output-anchor/N-node_teamdishwashers"}
	];

	const inputConn: AnchorConnection[] = [
		{ targetNodeId: "N-node_componentmonolith", targetNodeAnchorId: "A-node-node_componentmonolith-input-anchor/N-node_componentmonolith"}
	]
</script>

<Svelvet zoom={1} fixedZoom={false} theme="echolayer">
	<TeamEntityNode component={data.teams[0]} origin={{ x: 20, y: 20 }} outputConnections={outputConn} />
	<TeamEntityNode component={data.teams[1]} origin={{ x: 280, y: 20 }} />
	<ComponentEntityNode component={data.components[0]} owners={[data.teams[0]]} origin={{ x: 20, y: 220 }} inputConnections={inputConn} />
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
