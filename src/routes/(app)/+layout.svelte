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
		teamStore,
		ORGS_STORE_NAME,
		organizationsStore
	} from '$lib/stores';
    import AdminLayout from "$lib/layouts/admin/AdminLayout.svelte";

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(RELATIONS_GRAPH_STORE_NAME, entityRelationshipStore);
	setContext(TEAM_STORE_NAME, teamStore);
	setContext(USER_STORE_NAME, userStore);
	setContext(ORG_STORE_NAME, organizationStore);
	setContext(ORGS_STORE_NAME, organizationsStore);
</script>

<AdminLayout>
    <slot />
</AdminLayout>
