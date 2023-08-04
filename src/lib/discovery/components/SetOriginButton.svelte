<script lang="ts">
  import { originStore, selectedStore } from "$lib/stores";
  import type { GraphedEntity } from "$lib/types";

  export let open = false;

  // set's the currently selected node as the new origin
  const onClick = () => {
      // get the currently selected node
      if (!$selectedStore.entity) {
        return;
      }
      const selectedNode: GraphedEntity = $selectedStore.entity;
      originStore.setEntity(selectedNode);
  }

  $: disabled = !$selectedStore.entity;
</script>

<style lang="scss">
  .set-origin-button {
    @apply pointer-events-auto;
    @apply absolute block bottom-3;
    @apply cursor-pointer;
    @apply z-10 px-2 py-1;
    @apply rounded;
    @apply shadow;
    @apply visible;
    @apply flex flex-row;
    @apply text-left;
    @apply bg-emerald-50;
    @apply border border-emerald-500;
    @apply text-emerald-800;
    right: calc(100% + 1rem);

    &.closed {
      right: auto;
      left: 1rem;
    }

    &.disabled {
      @apply bg-neutral-100;
      @apply border-neutral-400;
      @apply text-neutral-400;
      @apply cursor-not-allowed;
    }
  }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button class="set-origin-button" class:closed={!open} class:disabled={disabled} on:click={onClick} disabled={disabled}>
    <p class="text-xs ">Set&nbsp;as&nbsp;origin</p>
</button>
