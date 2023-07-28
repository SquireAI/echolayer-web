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
	import { debounceUpdateQueryParams, updateQueryParameters } from "$lib/discovery/utils";

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

    // let toggleSelected = (entity: BaseEntity) => selectedStore.setEntity(entity);

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
    $: $originStore || $selectedStore, debounceUpdateQueryParams(originStore, selectedStore)();

    // TODO: refactor this to a new home in $lib
    let timer: NodeJS.Timeout;
	const debounceNodeSelectionChange = (shouldBeOpen: boolean) => {
        clearTimeout(timer);
		timer = setTimeout(() => {
            isDetailsPanelOpen.set(shouldBeOpen);
        }, 100);
	}

    // Toggle the details panel open / closed if there's a node selected or not, respectively
    $: $selectedStore.entity, debounceNodeSelectionChange($selectedStore.entity !== undefined);

    $selectedStore.entity, console.log("CHANGED! ", $selectedStore.entity?.publicId);
</script>

<Panels>
    <Navigation slot="nav" />
    <div class="content" slot="content">
        <PanelsHeader title="Content" />
        {#if $originStore.entity}
            <Canvas
                components={$componentStore.entity}
                relations={$entityRelationshipStore.entity}
                teams={$teamStore.entity}
                origin={$originStore.entity}
                selected={$selectedStore.entity}
            />
        {/if}
    </div>
    <Details slot="details" open={$isDetailsPanelOpen} />
</Panels>

<style lang="scss">
    .content {
        height: calc(100vh - 65px);
    }
</style>
