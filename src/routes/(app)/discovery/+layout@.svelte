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
	import { navigating } from '$app/stores';
	import type { NavigationTarget, NavigationType } from '@sveltejs/kit';
    import { URL_SEARCH_PARAMS_KEYS } from "$lib/discovery/utils";

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(RELATIONS_GRAPH_STORE_NAME, entityRelationshipStore);
	setContext(TEAM_STORE_NAME, teamStore);
	setContext(USER_STORE_NAME, userStore);
	setContext(ORG_STORE_NAME, organizationStore);
	setContext(ORIGIN_STORE_NAME, originStore);
	setContext(SELECTED_STORE_NAME, selectedStore);

    // we will peek into the searchParams to see what has changed so we can update the state(s) as needed
    function isNavigating(from: NavigationTarget | null, to: NavigationTarget | null, type: Omit<NavigationType, 'enter'>): void {
        console.log("HERE")
        if (type !== "popstate" && type !== "goto") {
            return;
        }
        const { ORIGIN, SELECTED } = URL_SEARCH_PARAMS_KEYS;
        const fromSearchParms: URLSearchParams | undefined = from?.url.searchParams;
        const toSearchParams: URLSearchParams | undefined = to?.url.searchParams;
        // console.log(fromSearchParms, toSearchParams);
        if (!toSearchParams) {
            return;
        }
        const selectedPublicId: string | null = toSearchParams.get(SELECTED);
        const originPublicId: string | null = toSearchParams.get(ORIGIN);
        if ($originStore.entity?.publicId !== originPublicId) {
            if (originPublicId) {
                const entity = [...Array.from($componentStore.entity || []), ...Array.from($teamStore.entity || [])].find((e) => e.publicId === originPublicId);
                if (entity) {
                    originStore.setEntity(entity)
                } else {
                    // entity is not in the store. Possibility is that originPublicId was tampered with
                    throw new Error("Could not find entity for given origin public ID in URL");
                }   
            } else {
                originStore.clear();
            }
        }
        if ($selectedStore.entity?.publicId !== selectedPublicId) {
            if (selectedPublicId) {
                const entity = [...Array.from($componentStore.entity || []), ...Array.from($teamStore.entity || [])].find((e) => e.publicId === selectedPublicId);
                if (entity) {
                    selectedStore.setEntity(entity);
                } else {
                    // entity is not in the store. Possibility is that selectedPublicId was tampered with
                    throw new Error("Could not find entity for given selected public ID in URL");
                }
            } else {
                selectedStore.clear();
            }
        }
    }

    $: if ($navigating) isNavigating($navigating.from, $navigating.to, $navigating.type);

    $: $navigating, console.log($navigating);
</script>

<DiscoveryLayout>
    <slot />
</DiscoveryLayout>
