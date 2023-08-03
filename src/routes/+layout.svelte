<script lang="ts">
	import { setContext } from 'svelte';
	import {
		SELECTED_ORG_STORE_NAME,
		USER_STORE_NAME,
		selectedOrgStore,
		userStore,
		ORGS_STORE_NAME,
		organizationsStore
	} from '$lib/stores';
	import { page } from '$app/stores';

    // Set basic context's at root level layout - all routes will have access to these stores
    // Without being at the root, we can end up overwriting filled stores with empty stores.
	setContext(USER_STORE_NAME, userStore);
	setContext(SELECTED_ORG_STORE_NAME, selectedOrgStore);
	setContext(ORGS_STORE_NAME, organizationsStore);


    // If data exists when loading the page, load the stores with the data
    if($page.data?.orgs) {
        organizationsStore.setOrganizations($page.data.orgs);
    }

    if($page.data?.org) {
        selectedOrgStore.setOrganization($page.data.org.publicId);
    }

    if($page.data?.user) {
        userStore.setUser($page.data.user);
    }
</script>

<slot />
