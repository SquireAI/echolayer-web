<script lang="ts">
    export let tabs = [];
    export let selected = 0;
    export let onSelect: (tab: string, position: number) => void = () => undefined;
    let _onSelect = (i) => {
        selected = i;
        if (onSelect) onSelect(tabs[selected], selected);
    };
</script>

<style lang="scss">
  .tabs {
    @apply border-neutral-200 border bg-white rounded-md;
    @apply flex flex-row w-full gap-1;

    button {
      @apply relative flex-1 items-center;
      @apply bg-white border-0 px-3 py-1 font-medium text-center text-gray-900 hover:bg-neutral-200 rounded-md shadow-none drop-shadow-none ring-0 capitalize;

      &.selected {
        @apply bg-echolayer-lightBlue text-echolayer-blue-200 border-echolayer-lightBlue border;
      }
    }
  }
</style>

<span class="tabs isolate rounded-md shadow-sm text-sm">
  {#each tabs as tab, i}
    <button type="button" class:selected="{tab === tabs[selected]}" on:click={() => _onSelect(i)}>
      {tab}
    </button>
  {/each}
</span>
