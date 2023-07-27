<script lang="ts">
    import EntityListItem from "$lib/discovery/components/entities/EntityListItem.svelte";

    export let entities = [];
</script>

<style lang="scss">
  .component-list {
    @apply flex flex-col gap-4 items-stretch;
  }
</style>

<div class="component-list">
    {#each entities as entity (entity.publicId)}
        <EntityListItem {entity}/>
    {/each}
</div>
