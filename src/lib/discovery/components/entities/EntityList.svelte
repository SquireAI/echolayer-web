<script>
    import EntityListItem from "$lib/discovery/components/entities/EntityListItem.svelte";

    export let entities = [];
</script>

<div class="component-list flex flex-col gap-4 items-stretch">
    {#each entities as entity}
        <EntityListItem {entity} />
    {/each}
</div>
