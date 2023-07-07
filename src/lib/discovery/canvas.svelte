<script lang="ts">
	import { Background, Node, Svelvet } from "svelvet";

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

<Svelvet>
	<Node />
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
