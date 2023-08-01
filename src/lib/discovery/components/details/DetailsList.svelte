<script>
    import DetailsListRow from "$lib/discovery/components/details/DetailsListRow.svelte";
    import DetailsSectionHeader from "$lib/discovery/components/details/DetailsSectionHeader.svelte";

    export let label = "Properties";
    export let properties = [];
</script>

<div class="details-list h-full">
    <div class="space-y-1 flex-1 flex flex-col">
        {#each properties as property}
            <DetailsListRow {property} />
        {/each}
    </div>
</div>
