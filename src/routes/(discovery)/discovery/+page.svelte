<script lang="ts">
	import Canvas from "$lib/discovery/canvas.svelte";
    import type {OriginAndComponentData, ComponentStore} from "$lib/types";
    import {getContext} from "svelte";

    export let data: OriginAndComponentData;

    // Add origin to store
    let componentStore: ComponentStore;
    componentStore = getContext("component") as ComponentStore;
    if (data.origin) componentStore.setOrigin(data.origin);
</script>

<Canvas />
