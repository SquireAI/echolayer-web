<script lang="ts">
	import Canvas from "$lib/discovery/canvas.svelte";
    import type {OriginAndComponentData, ComponentStore} from "$lib/types";
    import {getContext} from "svelte";

    /** @type {import('./$types').PageData} */
    export let data: OriginAndComponentData;
    console.log("$ browser: origin =>", data.origin);

    // Add origin to store
    let componentStore: ComponentStore;
    componentStore = getContext("component") as ComponentStore;
    if (data.origin) componentStore.setOrigin(data.origin);
</script>

<Canvas />
