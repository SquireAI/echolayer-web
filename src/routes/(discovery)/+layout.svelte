<script lang="ts">
	import "$lib/discovery/styles/discovery.scss";
	import DiscoveryHeader from "$lib/discovery/components/Header.svelte";

	import {setContext} from "svelte";
	import {COMPONENT_STORE_NAME, componentStore} from "$lib/stores";

	setContext(COMPONENT_STORE_NAME, componentStore);
</script>

<div class="app-container">
	<nav>NAV</nav>
	<main>
    <div class="content">
			<DiscoveryHeader title="Content" />
			<slot />
		</div>
		<div class="details">
			<DiscoveryHeader title="Details" />
		</div>
	</main>
</div>
