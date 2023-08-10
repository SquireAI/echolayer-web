<script lang="ts">
	import DiscoveryLayout from '$lib/layouts/discovery/DiscoveryLayout.svelte';
	import { setContext } from 'svelte';
	import {
		COMPONENT_STORE_NAME,
		componentStore,
		entityRelationshipStore,
		ORIGIN_STORE_NAME,
		originStore,
		RELATIONS_GRAPH_STORE_NAME,
		SELECTED_STORE_NAME,
		selectedStore,
		TEAM_STORE_NAME,
		teamStore
	} from '$lib/stores';

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(RELATIONS_GRAPH_STORE_NAME, entityRelationshipStore);
	setContext(TEAM_STORE_NAME, teamStore);
	setContext(ORIGIN_STORE_NAME, originStore);
	setContext(SELECTED_STORE_NAME, selectedStore);
</script>

<DiscoveryLayout>
	<slot />
</DiscoveryLayout>
