<script lang="ts">
    import Panels from "$lib/discovery/panels.svelte";
	import Canvas from "$lib/discovery/canvas.svelte";
    import PanelsHeader from "$lib/discovery/components/PanelsHeader.svelte";
    import Details from "$lib/discovery/details.svelte";
    import type {OriginAndComponentData} from "$lib/types";

    // export let data: OriginAndComponentData;
</script>

<style lang="scss">
    .main-content {
      overflow: auto;
      width: 100%;
      height: 100%;
      @apply bg-neutral-50;
      display: flex;
      flex-direction: column;
    }
</style>

<Panels>
    <div slot="nav"></div>
    <div class="main-content" slot="content">
        <PanelsHeader title="Content" />
        <Canvas />
    </div>
    <Details slot="details" />
</Panels>
