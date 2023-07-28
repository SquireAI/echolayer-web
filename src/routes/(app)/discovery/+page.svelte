<script lang="ts">
    import Panels from "$lib/discovery/panels.svelte";
	import Canvas from "$lib/discovery/canvas.svelte";
    import PanelsHeader from "$lib/discovery/components/PanelsHeader.svelte";
    import Details from "$lib/discovery/details.svelte";
    import type { BaseEntity } from "$lib/types";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
    import {
        componentStore,
        entityRelationshipStore,
        originStore,
        selectedStore,
        teamStore,
    } from "$lib/stores";
	import type { DiscoveryPage } from "./+page";
	import { writable } from "svelte/store";
	import { updateQueryParameters } from "$lib/discovery/utils";
    import SitemapOutline from "svelte-material-icons/SitemapOutline.svelte";

    export let data: DiscoveryPage;

    const { teams, origin, components, relations, getRelationsGraph } = data;
    const isDetailsPanelOpen = writable<boolean>(false);

    if(components) {
        componentStore.setComponents(components);
    }
    if(teams) {
        teamStore.setTeams(teams);
    }
    if (origin) {
        originStore.setEntity(origin);
    }
    if(relations) {
        entityRelationshipStore.setEntityRelationships(relations);
    }

    /**
     * Gets the new downstream relations for the next selected origin.
     * Replaces the relations currently set in the entity relations store.
     */
    async function updateRelationsOnOriginChange() {
        const nextOrigin = $originStore.entity;
        if (!nextOrigin) {
            return;
        }
        const relations = await getRelationsGraph(nextOrigin);
        entityRelationshipStore.setEntityRelationships(relations);
    }

    // when originStore updates, fetch the new downstream relations
    $: $originStore, updateRelationsOnOriginChange();

    // if the origin or selected node update in our stores, we update the query params in the URL in the user's browser
    $: $originStore || $selectedStore, updateQueryParameters({ originPublicId: $originStore.entity?.publicId, selectedPublicId: $selectedStore.entity?.publicId});

    // Toggle the details panel open / closed if there's a node selected or not, respectively
    $: $selectedStore.entity, isDetailsPanelOpen.set($selectedStore.entity !== undefined);
</script>

<Panels>
    <Navigation slot="nav" />
    <div class="content" slot="content">
        <PanelsHeader title="Connections">
            <span slot="left-action" class="flex">
                <SitemapOutline />
	        </span>
        </PanelsHeader>
        {#if $originStore.entity}
            <Canvas
                components={$componentStore.entity}
                relations={$entityRelationshipStore.entity}
                teams={$teamStore.entity}
                origin={$originStore.entity}
            />
        {/if}

            <Details slot="details" open={$isDetailsPanelOpen} />
    </div>
</Panels>

<style lang="scss">
    .content {
        height: calc(100vh - 55px);
    }
</style>
