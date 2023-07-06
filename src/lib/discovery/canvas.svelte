<script lang="ts">
	import { Background, Node, Svelvet } from "svelvet";
	import TeamComponentNode from "./components/TeamComponentNode.svelte";
	import { data } from "./sample-data";

	import {getContext} from "svelte";
	import type {ComponentStore} from "$lib/types";

	let componentStore: ComponentStore;
	componentStore = getContext("component") as ComponentStore;

	componentStore.setComponents([
		{id: 1, name: "First Component", organizationId: 1, metadata: {}},
		{id: 2, name: "Second Component", organizationId: 1, metadata: {}},
	]);

	componentStore.setOrigin($componentStore.entity[0]);
	console.log('First Component Selected => ', $componentStore?.origin?.name);

	componentStore.setOrigin($componentStore.entity[1]);
	console.log('Second Component Selected => ', $componentStore?.origin?.name);
</script>

<Svelvet zoom={1} fixedZoom={true} theme="echolayer">
	<TeamComponentNode component={data.teams[0]} origin={{ x: 20, y: 20}} />
	<TeamComponentNode component={data.teams[1]} origin={{ x: 280, y: 20 }} />
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
