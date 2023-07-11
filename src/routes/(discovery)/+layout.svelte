<script lang="ts">
	import "$lib/discovery/styles/discovery.scss";
	import {setContext} from "svelte";
	import {COMPONENT_STORE_NAME, componentStore} from "$lib/stores";

	setContext(COMPONENT_STORE_NAME, componentStore);
</script>

<div class="app-container">
	<slot />
</div>
