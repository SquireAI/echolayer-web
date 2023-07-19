<script>
    export let open;

    const onClick = () => {
        console.log('Set as origin based on selected node');
    }
</script>

<style lang="scss">
  .set-origin-button {
    @apply absolute block bottom-3;
    @apply cursor-pointer;
    @apply z-10 px-2 py-1;
    @apply rounded;
    @apply shadow;
    @apply invisible;
    @apply flex flex-row;
    @apply text-left;
    @apply bg-emerald-50;
    @apply border border-emerald-500;
    right: calc(100% + 1rem);

    &.open {
      @apply visible;
    }
  }
</style>

<div class="set-origin-button" class:open={open} on:click={onClick}>
    <p class="text-xs text-emerald-800">Set&nbsp;selected&nbsp;as&nbsp;origin</p>
</div>
