<script lang="ts">
    import Panels from "$lib/discovery/panels.svelte";
	import Canvas from "$lib/discovery/canvas.svelte";
    import PanelsHeader from "$lib/discovery/components/PanelsHeader.svelte";
    import Details from "$lib/discovery/details.svelte";
    import type {OriginAndComponentData} from "$lib/types";

    export let data: OriginAndComponentData;
</script>

<Panels>
    <div slot="nav"></div>
    <div class="content" slot="content">
        <PanelsHeader title="Content" />
        <Canvas />
    </div>
    <Details slot="details" />
</Panels>
