<script>
    import DetailsButton from "$lib/discovery/components/details/DetailsButton.svelte";
    import OpenInNew from "svelte-material-icons/OpenInNew.svelte";
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
    <div class="rounded-sm h-14 w-14 bg-neutral-200 mb-2">
    </div>

    <div class="font-medium text-2xl -mb-1">
        <slot />
    </div>

    <div class="mb-1">
        <span class="text-neutral-500 text-xs">Created 2023</span>
    </div>

    <div class="actions">
        <DetailsButton label="Main Channel">
            <span slot="icon"><OpenInNew width={15} height={15} color="#2654F4" /></span>
        </DetailsButton>
        <DetailsButton label="Message DRI">
            <span slot="icon"><OpenInNew width={15} height={15} color="#2654F4" /></span>
        </DetailsButton>
    </div>
</div>
