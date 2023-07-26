<script lang="ts">
    import Panels from "$lib/discovery/panels.svelte";
	import Canvas from "$lib/discovery/canvas.svelte";
    import PanelsHeader from "$lib/discovery/components/PanelsHeader.svelte";
    import Details from "$lib/discovery/details.svelte";
    import type {
        OriginAndComponentData,
        ComponentStore,
        EntityRelationshipStore,
        TeamStore,
        BaseEntity
    } from "$lib/types";
    import {getContext} from "svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
    import {
        COMPONENT_STORE_NAME,
        ORIGIN_STORE_NAME,
        RELATIONS_GRAPH_STORE_NAME,
        SELECTED_STORE_NAME,
        TEAM_STORE_NAME,
        selectedStore,
        originStore
    } from "$lib/stores";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";

    export let data: OriginAndComponentData;

    let componentStore: ComponentStore = getContext(COMPONENT_STORE_NAME) as ComponentStore;
    let relationStore: EntityRelationshipStore = getContext(RELATIONS_GRAPH_STORE_NAME) as EntityRelationshipStore;
    let teamStore: TeamStore = getContext(TEAM_STORE_NAME) as TeamStore;
    // let originStore: OriginStore = getContext(ORIGIN_STORE_NAME) as OriginStore;
    // let selectedStore: SelectedStore = getContext(SELECTED_STORE_NAME) as SelectedStore;

    if(data.components) {
        componentStore.setComponents(data.components);
    }
    if(data.teams) {
        teamStore.setTeams(data.teams);
    }
    if (data.origin) {
        originStore.setEntity(data.origin);
    }
    if(data.relations) {
        relationStore.setEntityRelationships(data.relations);
    }

    let toggleSelected = (entity: BaseEntity) => selectedStore.setEntity(entity);

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

    $: $originStore || $selectedStore, updateQueryParameters({ originPublicId: $originStore.entity?.publicId, selectedPublicId: $selectedStore.entity?.publicId });
</script>

<Panels>
    <Navigation slot="nav" />
    <div class="content" slot="content">
        <PanelsHeader title="Content" />
        {#if $originStore.entity}
            <Canvas
                components={$componentStore.entity}
                relations={$relationStore.entity}
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
