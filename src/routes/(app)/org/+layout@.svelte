<script>
    import { setContext } from 'svelte';
	import {
		ORG_STORE_NAME,
		USER_STORE_NAME,
		organizationStore,
		userStore,
		ORGS_STORE_NAME,
		organizationsStore
	} from '$lib/stores';
	import DiscoveryLayout from "$lib/layouts/discovery/DiscoveryLayout.svelte";

    setContext(USER_STORE_NAME, userStore);
	setContext(ORG_STORE_NAME, organizationStore);
	setContext(ORGS_STORE_NAME, organizationsStore);
</script>

<DiscoveryLayout>
    <slot />
</DiscoveryLayout>