<script lang="ts">
	import { Background, Svelvet } from "svelvet";
	import TeamComponentNode from "./components/TeamComponentNode.svelte";
	import { data } from "./sample-data";
</script>

<Svelvet zoom={1} fixedZoom={true} theme="echolayer">
	<TeamComponentNode component={data.teams[0]} origin={{ x: 20, y: 20}} />
	<TeamComponentNode component={data.teams[1]} origin={{ x: 280, y: 20 }} />
	<Background dotColor="#D4D4D4" bgColor="transparent" gridWidth={30} dotSize={3} slot="background" />
</Svelvet>
