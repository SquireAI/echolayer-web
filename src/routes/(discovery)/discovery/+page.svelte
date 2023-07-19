<script lang="ts">
    import Panels from "$lib/discovery/panels.svelte";
	import Canvas from "$lib/discovery/canvas.svelte";
    import PanelsHeader from "$lib/discovery/components/PanelsHeader.svelte";
    import Details from "$lib/discovery/details.svelte";
    import type {OriginAndComponentData, ComponentStore} from "$lib/types";
    import {getContext} from "svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";

    export let data: OriginAndComponentData;

    // Add origin to store
    let componentStore: ComponentStore;
    componentStore = getContext("component") as ComponentStore;
    if (data.origin) componentStore.setOrigin(data.origin);
</script>

<Panels>
    <Navigation slot="nav" />
    <div class="content" slot="content">
        <PanelsHeader title="Content" />
        <Canvas />
    </div>
    <Details slot="details" />
</Panels>
