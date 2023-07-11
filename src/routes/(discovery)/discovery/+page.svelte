<script lang="ts">
    import Panels from "$lib/discovery/panels.svelte";
	import Canvas from "$lib/discovery/canvas.svelte";
    import Header from "$lib/discovery/components/header.svelte";
    import type {OriginAndComponentData, ComponentStore} from "$lib/types";
    import {getContext} from "svelte";

    export let data: OriginAndComponentData;

    // Add origin to store
    let componentStore: ComponentStore;
    componentStore = getContext("component") as ComponentStore;
    if (data.origin) componentStore.setOrigin(data.origin);
</script>

<Panels>
    <div slot="nav">NAV</div>
    <div class="content" slot="content">
        <Header title="Content" />
        <Canvas />
    </div>
    <div class="details" slot="details">
        <Header title="Details" />
    </div>
</Panels>
