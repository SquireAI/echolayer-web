<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { ORG_INVITATION_SERVICE_CONTEXT_NAME } from '$lib/invitation/orgInvite.service';
	import DiscoveryLayout from '$lib/layouts/discovery/DiscoveryLayout.svelte';
	import { RELATIONS_SERVICE_CONTEXT_NAME } from '$lib/relations/relations.service';
	import {
		COMPONENT_STORE_NAME,
		componentStore,
		RELATIONS_GRAPH_STORE_NAME,
		entityRelationshipStore,
		TEAM_STORE_NAME,
		teamStore,
		ORIGIN_STORE_NAME,
		originStore,
		SELECTED_STORE_NAME,
		selectedStore,
		ISSUE_STORE_NAME,
		issueStore
	} from '$lib/stores';
	import { setContext } from 'svelte';
	/**
	 * This layout is needed so that when the selected org changes,
	 * the (app) related layout(s) will re-render, calling the appropriate API's,
	 * and setting the proper context for future calls.
	 */
	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(RELATIONS_GRAPH_STORE_NAME, entityRelationshipStore);
	setContext(TEAM_STORE_NAME, teamStore);
	setContext(ORIGIN_STORE_NAME, originStore);
	setContext(SELECTED_STORE_NAME, selectedStore);
	setContext(ISSUE_STORE_NAME, issueStore);

	setContext(ORG_INVITATION_SERVICE_CONTEXT_NAME, $page.data.inviteService);
	setContext(RELATIONS_SERVICE_CONTEXT_NAME, $page.data.relationsService);
</script>

<DiscoveryLayout>
	<slot />
</DiscoveryLayout>
<Modal />
