<script lang="ts">
    import DetailsTitle from "$lib/discovery/components/details/DetailsTitle.svelte";
    import CollapsePanelsHeader from "$lib/discovery/components/CollapsePanelsHeader.svelte";
    import SetOriginButton from "$lib/discovery/components/SetOriginButton.svelte";
    import { selectedStore, entityDetailsStore } from "$lib/stores";
	  import MembersList from "./components/details/MembersList.svelte";
	  import { EntityTypes, type ComponentEntity, type TeamEntity } from "$lib/types";
    import DetailsJson from "$lib/discovery/components/details/DetailsJson.svelte";
    import DetailsSectionHeader from "$lib/discovery/components/details/DetailsSectionHeader.svelte";

    // Panel controls
    export let open: boolean;
    $: entity = $entityDetailsStore.entity;

    const hasMetadata = (entity?: TeamEntity|ComponentEntity) => {
        if (!entity || !entity.metadata) return false;
        if (Array.isArray(entity.metadata) && !entity.metadata.length) return false;
        if (Object.keys(entity.metadata).length === 0) return false;
        return true;
    }
</script>

<div class="details-panel" class:open={open}>
    <div class="header">
        <CollapsePanelsHeader title="Details" bind:open={open} disabled={!$selectedStore.entity} />
    </div>

    <div class="content divide-neutral-200 divide-solid divide-y flex-1 flex flex-col">
        <DetailsTitle>{$entityDetailsStore.entity?.name}</DetailsTitle>
        {#if entity?.type === EntityTypes.TEAM}
          <MembersList members={entity.members}></MembersList>
        {/if}

        {#if hasMetadata($entityDetailsStore.entity)}
            <DetailsSectionHeader label="Metadata" />
            <div class="flex-1 overflow-y-scroll basis-0" >
                <DetailsJson metadata={$entityDetailsStore.entity?.metadata} />
            </div>
        {/if}
    </div>

    <SetOriginButton open={open} />
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
