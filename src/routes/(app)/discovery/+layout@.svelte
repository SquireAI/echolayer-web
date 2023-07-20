<script lang="ts">
	import { setContext } from 'svelte';
	import {
		COMPONENT_STORE_NAME,
		componentStore,
		RELATIONS_GRAPH_STORE_NAME,
		entityRelationshipStore,
		TEAM_STORE_NAME,
		ORG_STORE_NAME,
		USER_STORE_NAME,
		organizationStore,
		userStore,
		teamStore
	} from '$lib/stores';
    import DiscoveryLayout from "$lib/layouts/discovery/DiscoveryLayout.svelte";

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(RELATIONS_GRAPH_STORE_NAME, entityRelationshipStore);
	setContext(TEAM_STORE_NAME, teamStore);
	setContext(USER_STORE_NAME, userStore);
	setContext(ORG_STORE_NAME, organizationStore);
</script>

<DiscoveryLayout>
    <slot />
</DiscoveryLayout>
