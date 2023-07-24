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
        OriginStore, SelectedStore, BaseEntity
    } from "$lib/types";
    import {getContext} from "svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
    import {
        COMPONENT_STORE_NAME,
        ORIGIN_STORE_NAME,
        RELATIONS_GRAPH_STORE_NAME,
        SELECTED_STORE_NAME,
        TEAM_STORE_NAME
    } from "$lib/stores";

    export let data: OriginAndComponentData;

    let componentStore: ComponentStore = getContext(COMPONENT_STORE_NAME) as ComponentStore;
    let relationStore: EntityRelationshipStore = getContext(RELATIONS_GRAPH_STORE_NAME) as EntityRelationshipStore;
    let teamStore: TeamStore = getContext(TEAM_STORE_NAME) as TeamStore;
    let originStore: OriginStore = getContext(ORIGIN_STORE_NAME) as OriginStore;
    let selectedStore: SelectedStore = getContext(SELECTED_STORE_NAME) as SelectedStore;

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
        {:else}
        <!-- TODO: Should this be a separate page? -->
            <div>
                NO ORIGIN SET VIEW
            </div>
        {/if}
    </div>
    <Details slot="details" />
</Panels>

<style lang="scss">
    .content {
        height: calc(100vh - 65px);
    }
</style>
