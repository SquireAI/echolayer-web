<script>
    import DetailsListRow from "$lib/discovery/components/details/DetailsListRow.svelte";

    export let label = "Properties";
    export let properties = [];
</script>

<style lang="scss">
  .details-list {
    .header {
      @apply border-b;
      @apply px-3 py-2.5;
      @apply text-neutral-500;
      @apply border-l-2 border-l-transparent;
      @apply text-xs;
    }

    .list {
      @apply flex flex-col space-y-1;
    }
  }
</style>

<div class="details-list">
    <div class="header">
        <span>{label}</span>
    </div>

    <div class="list">
        {#each properties as property}
            <DetailsListRow {property} />
        {/each}
    </div>
</div>
