<script>
    import titlelize from "titleize";

    import DetailsButton from "$lib/discovery/components/details/DetailsButton.svelte";
	import { entityDetailsStore } from "$lib/stores";
    import OpenInNew from "svelte-material-icons/OpenInNew.svelte";
    import AccountMultiple from 'svelte-material-icons/AccountMultiple.svelte';
    import Shape from 'svelte-material-icons/Shape.svelte';
</script>

<style lang="scss">
    .details-header {
      @apply px-3 py-4;
      @apply flex flex-col gap-1;

      .actions {
        @apply flex flex-row gap-3;
      }
    }
</style>

<div class="details-header">
    {#if $entityDetailsStore.entity?.type === "Team"}
        <div class="rounded-sm h-16 w-16 bg-neutral-200 mb-2 flex items-center justify-center">
            <AccountMultiple size=40 />
        </div>
    {:else if $entityDetailsStore.entity?.type === "Component"}
        <div class="rounded-sm h-16 w-16 bg-echolayer-blue mb-2 flex items-center justify-center">
            <Shape size=40 color="white"/>
        </div>
    {/if}

    <div class="font-medium text-2xl -mb-1">
        <slot />
    </div>

    <div class="mb-1">
        <span class="text-neutral-500 text-xs">Created 2023</span>
    </div>

    {#if $entityDetailsStore.entity?.links?.length}
        <div class="actions">
            {#each $entityDetailsStore.entity.links as link}
                <DetailsButton label={titlelize(link.name)} href={link.url} target="_blank">
                    <span slot="icon"><OpenInNew width={15} height={15} color="#2654F4" /></span>     
                </DetailsButton>
            {/each}
        </div>
    {/if}
</div>
