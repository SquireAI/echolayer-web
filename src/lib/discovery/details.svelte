<script>
    import DetailsTitle from "$lib/discovery/components/details/DetailsTitle.svelte";
    import DetailsList from "$lib/discovery/components/details/DetailsList.svelte";
    import CollapsePanelsHeader from "$lib/discovery/components/CollapsePanelsHeader.svelte";

    // Panel controls
    export let open = true;

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

<style lang="scss">
  .details {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: calc(100% - 110px);
    transition: left 0.1s ease-in-out;

    &.open {
      left: 50%;

      .content {
        @apply visible;
      }
    }

    .header {
      @apply border-l;
      @apply border-neutral-300;
    }

    .content {
      @apply flex-1;
      @apply bg-white;
      @apply border-l;
      @apply border-neutral-300;
      @apply divide-neutral-200 divide-solid divide-y;
      @apply invisible;
    }
  }
</style>

<div class="details" class:open={open}>
    <div class="header">
        <CollapsePanelsHeader title="Details" bind:open={open} />
    </div>

    <div class="content">
        <DetailsTitle></DetailsTitle>

        <DetailsList properties={properties} />
    </div>
</div>
