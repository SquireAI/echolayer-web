<script>
    export let property = null;
    let status = property?.status ?? null;
</script>

<style lang="scss">
    .details-list-row {
      @apply px-3 py-2;
      @apply border-l-2 border-gray-200;
      @apply grid;
      @apply text-xs;
      grid-template-columns: 1fr 2fr;

      &.warning {
        @apply border-echolayer-yellow;
        @apply bg-echolayer-yellow-100;
      }

      &.error {
        @apply border-echolayer-red;
        @apply bg-echolayer-red-100;
      }
    }
</style>

{#if property}
    <div class="details-list-row {status}">
        <div>
            <span>
                {property.title}
            </span>
        </div>

        <div>
            <span>
                {property.value}
            </span>
        </div>
    </div>
{/if}
