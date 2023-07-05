<script lang="ts">
	import { Background, Node, Svelvet } from "svelvet";
	import ComponentNode from "./components/ComponentNode.svelte";
</script>

<Svelvet zoom={1} fixedZoom={true} theme="echolayer">
	<!-- <Node /> -->
	<ComponentNode title="New Component node" --node-border-radius="10px" />
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
