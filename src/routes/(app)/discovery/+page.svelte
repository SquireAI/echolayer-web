<script lang="ts">
    import Panels from "$lib/discovery/panels.svelte";
	import Canvas from "$lib/discovery/canvas.svelte";
    import PanelsHeader from "$lib/discovery/components/PanelsHeader.svelte";
    import Details from "$lib/discovery/details.svelte";
    import type {
        ComponentStore,
        TeamStore,
        BaseEntity
    } from "$lib/types";
    import {getContext} from "svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
    import {
        COMPONENT_STORE_NAME,
        TEAM_STORE_NAME,
        selectedStore,
        originStore,
        entityRelationshipStore,
    } from "$lib/stores";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import type { DiscoveryPage } from "./+page";

    export let data: DiscoveryPage;

    const { teams, origin, components, relations, getRelationsGraph } = data;

    let componentStore: ComponentStore = getContext(COMPONENT_STORE_NAME) as ComponentStore;
    let teamStore: TeamStore = getContext(TEAM_STORE_NAME) as TeamStore;

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

    let toggleSelected = (entity: BaseEntity) => selectedStore.setEntity(entity);

    async function updateRelationsOnOriginChange() {
        const nextOrigin = $originStore.entity;
        if (!nextOrigin) {
            return;
        }
        const relations = await getRelationsGraph(nextOrigin);
        entityRelationshipStore.setEntityRelationships(relations);
    }

    function updateQueryParameters({ originPublicId, selectedPublicId }: { originPublicId?: string, selectedPublicId?: string}) {
        if (!browser) {
            return;
        }
        const ORIGIN_KEY = "origin";
        const SELECTED_KEY = "selected";
        const searchParams: URLSearchParams = $page.url.searchParams;
        if (searchParams.has(ORIGIN_KEY) && originPublicId === undefined) {
            $page.url.searchParams.delete(ORIGIN_KEY);
        }
        if (searchParams.has(SELECTED_KEY) && selectedPublicId === undefined) {
            $page.url.searchParams.delete(SELECTED_KEY);
        }
        if (originPublicId !== undefined) {
            $page.url.searchParams.set(ORIGIN_KEY, originPublicId);
        }
        if (selectedPublicId !== undefined) {
            $page.url.searchParams.set(SELECTED_KEY, selectedPublicId);
        }
        goto(`?${$page.url.searchParams.toString()}`);
    }

    // when originStore updates, fetch the new downstream relations
    $: $originStore, updateRelationsOnOriginChange();
    $: $originStore || $selectedStore, updateQueryParameters({ originPublicId: $originStore.entity?.publicId, selectedPublicId: $selectedStore.entity?.publicId });
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
            />
        {/if}
    </div>
</Panels>

<style lang="scss">
    .content {
        height: calc(100vh - 65px);
    }
</style>
