<script lang="ts">
	import { setContext } from 'svelte';
    import DiscoveryLayout from "$lib/layouts/discovery/DiscoveryLayout.svelte";
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
        originStore,
        ORIGIN_STORE_NAME,
        selectedStore,
        SELECTED_STORE_NAME
    } from '$lib/stores';
    import { page } from "$app/stores";
	import { goto } from '$app/navigation';

    $: console.log($page.url.searchParams.toString());

    if ($selectedStore.entity) {
        console.log("HERE2");
        $page.url.searchParams.set("selected", $selectedStore.entity?.publicId);
    }

    function foo() {
        if ($selectedStore.entity) {
            console.log("HERE");
            $page.url.searchParams.set("selected", $selectedStore.entity?.publicId);
            goto(`?${$page.url.searchParams.toString()}`);
        }
    }
    $: $selectedStore && foo() 

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(RELATIONS_GRAPH_STORE_NAME, entityRelationshipStore);
	setContext(TEAM_STORE_NAME, teamStore);
	setContext(USER_STORE_NAME, userStore);
	setContext(ORG_STORE_NAME, organizationStore);
	setContext(ORIGIN_STORE_NAME, originStore);
	setContext(SELECTED_STORE_NAME, selectedStore);
</script>

<DiscoveryLayout>
    <slot />
</DiscoveryLayout>
