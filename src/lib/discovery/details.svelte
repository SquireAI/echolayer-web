<script lang="ts">
    import DetailsTitle from "$lib/discovery/components/details/DetailsTitle.svelte";
    import DetailsList from "$lib/discovery/components/details/DetailsList.svelte";
    import CollapsePanelsHeader from "$lib/discovery/components/CollapsePanelsHeader.svelte";
    import SetOriginButton from "$lib/discovery/components/SetOriginButton.svelte";
    import { selectedStore, entityDetailsStore } from "$lib/stores";

    // Panel controls
    export let open: boolean;

    // Panel content
    let properties = [
        {title: 'Sample', value: 'Sample Value', type: 'string', status: 'warning'},
        {title: 'Sample', value: 'Sample Value', type: 'string', status: 'warning'},
        {title: 'Sample', value: 'Sample Value', type: 'string', status: 'error'},
        {title: 'Sample', value: 'Sample Value', type: 'string'},
        {title: 'Sample', value: 'Sample Value', type: 'string'},
        {title: 'Sample', value: 'Sample Value', type: 'string'},
    ];
</script>

<div class="details-panel" class:open={open}>
    <div class="header">
        <CollapsePanelsHeader title="Details" bind:open={open} disabled={!$selectedStore.entity} />
    </div>

    <div class="content divide-neutral-200 divide-solid divide-y">
        <DetailsTitle>{$entityDetailsStore.entity?.name}</DetailsTitle>

        <DetailsList properties={properties} />
    </div>

    {#if $selectedStore.entity}
      <SetOriginButton bind:open={open} />
    {/if}
</div>

<style lang="scss">
  .details-panel {
    @apply w-1/2 h-full top-0;
    @apply flex flex-col absolute;
    left: calc(100% - 120px);
    transition: left 0.1s ease-in-out;

    .header {
      @apply border-l;
      @apply border-neutral-300;
    }

    .content {
      @apply flex-1 flex flex-col;
      @apply bg-white;
      @apply border-l;
      @apply border-neutral-300;
      @apply invisible;
    }

    &.open {
      left: 50%;

      .content {
        @apply visible;
      }
    }
  }
</style>
