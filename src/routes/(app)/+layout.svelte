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

	import type { LayoutData } from './$types';
	import { ORG_INVITATION_SERVICE_CONTEXT_NAME } from '$lib/invitation/orgInvite.service';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { RELATIONS_SERVICE_CONTEXT_NAME } from '$lib/relations/relations.service';

	export let data: LayoutData;

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(RELATIONS_GRAPH_STORE_NAME, entityRelationshipStore);
	setContext(TEAM_STORE_NAME, teamStore);
	setContext(ORIGIN_STORE_NAME, originStore);
	setContext(SELECTED_STORE_NAME, selectedStore);

	setContext(ORG_INVITATION_SERVICE_CONTEXT_NAME, data.inviteService);
	setContext(RELATIONS_SERVICE_CONTEXT_NAME, data.relationsService);
</script>

<DiscoveryLayout>
	<slot />
</DiscoveryLayout>
<Modal />
