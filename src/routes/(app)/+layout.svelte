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
	import orgInvitationStore, { ORG_INVITATION_STORE_NAME } from '$lib/stores/org-invitation-store';
	import { page } from '$app/stores';

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(RELATIONS_GRAPH_STORE_NAME, entityRelationshipStore);
	setContext(TEAM_STORE_NAME, teamStore);
	setContext(ORIGIN_STORE_NAME, originStore);
	setContext(SELECTED_STORE_NAME, selectedStore);
	setContext(ORG_INVITATION_STORE_NAME, orgInvitationStore);
	setContext('ORG_INVITATION_HANDLERS', {
		getOrgInvitations: $page.data.getOrgInvitations,
		createOrgInvitation: $page.data.createOrgInvitation,
		deleteOrgInvitation: $page.data.deleteOrgInvitation
	});
</script>

<DiscoveryLayout>
	<slot />
</DiscoveryLayout>
