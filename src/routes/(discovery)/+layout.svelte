<script lang="ts">
	import "$lib/discovery/styles/discovery.scss";
	import {setContext} from "svelte";
	import {COMPONENT_STORE_NAME, componentStore} from "$lib/stores";
	import {ORIGIN_COMPONENT_STORE_NAME, originComponentStore} from "$lib/stores";

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(ORIGIN_COMPONENT_STORE_NAME, originComponentStore);

	componentStore.subscribe((val) => console.log("componentStore", val));
	originComponentStore.subscribe((val) => console.log("originComponentStore", val));
</script>

<div class="app-container">
	<slot />
</div>
