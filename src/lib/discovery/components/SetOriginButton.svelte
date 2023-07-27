<script lang="ts">
  import { selectedStore, originStore } from "$lib/stores";
	import type { BaseEntity } from "$lib/types";

  export let open = false;

  // set's the currently selected node as the new origin
  const onClick = () => {
      // get the currently selected node
      if (!$selectedStore.entity) {
        return;
      }
      const selectedNode: BaseEntity = $selectedStore.entity;
      originStore.setEntity(selectedNode);
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="set-origin-button" class:open={open} on:click={onClick}>
    <p class="text-xs text-emerald-800">Set&nbsp;selected&nbsp;as&nbsp;origin</p>
</div>
