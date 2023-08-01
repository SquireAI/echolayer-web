<script lang="ts">
    import { onMount } from "svelte";
    import {browser} from "$app/environment";
    import JSONFormatter from "json-formatter-js";

    export let metadata: any;

    const renderJson = (json) => {
        const formatter = new JSONFormatter(json);
        document.getElementById("json")?.replaceChildren(formatter.render());
    };

    onMount(async () => {
        if (browser) {
            renderJson(metadata);
        }
    });

    $: metadata && renderJson(metadata);
</script>

{#if metadata}
    <div id="json"></div>
{/if}

<style lang="scss">
    #json {
      @apply min-h-full p-2;
      @apply bg-neutral-100;
    }
</style>
