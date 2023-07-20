<script lang="ts">
    import Panels from "$lib/discovery/panels.svelte";
	import Canvas from "$lib/discovery/canvas.svelte";
    import PanelsHeader from "$lib/discovery/components/PanelsHeader.svelte";
    import Details from "$lib/discovery/details.svelte";
    import type {OriginAndComponentData, ComponentStore, EntityRelationshipStore, TeamStore} from "$lib/types";
    import {getContext} from "svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
	import { COMPONENT_STORE_NAME, RELATIONS_GRAPH_STORE_NAME, TEAM_STORE_NAME } from "$lib/stores";

    export let data: OriginAndComponentData;

    let componentStore: ComponentStore = getContext(COMPONENT_STORE_NAME) as ComponentStore;
    let relationsStore = getContext(RELATIONS_GRAPH_STORE_NAME) as EntityRelationshipStore;
    let teamStore = getContext(TEAM_STORE_NAME) as TeamStore;

    if(data.components) {
        componentStore.setComponents(data.components);
    }
    if(data.teams) {
        teamStore.setTeams(data.teams);
    }
    if(data.relations) {
        relationsStore.setEntityRelationships(data.relations);
    }
    $ : {
        if(origin && !data.relations) {
            // TODO: load relations when origin is set.
        }
    }
    
    if (data.origin) {
        console.log("SET ORIGIN HERE", data.origin);
        // componentStore.setOrigin(data.origin);
    }

    $: origin = componentStore.origin;
</script>

<Panels>
    <Navigation slot="nav" />
    <div class="content" slot="content">
        <PanelsHeader title="Content" />
        {#if $origin}
            <Canvas
                components={$componentStore.entity}
                relations={$relationsStore.entity}
                teams={$teamStore.entity}
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
