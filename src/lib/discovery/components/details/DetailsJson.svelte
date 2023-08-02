<script lang="ts">
    import { onMount } from "svelte";
    import {browser} from "$app/environment";

    export let metadata: any;

    const renderJson = async (json) => {
        if (browser) {
            const JSONFormatter = (await import("json-formatter-js")).default;
            const formatter = new JSONFormatter(json);
            document.getElementById("json")?.replaceChildren(formatter.render());
        }
    };

    onMount(async () => {
        renderJson(metadata);
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
