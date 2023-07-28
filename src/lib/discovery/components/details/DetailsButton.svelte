<script lang="ts">
    export let label: string = "";
    export let onClick: () => void = () => {};
    export let href: string = "";
    export let target: string = "";
</script>

<style lang="scss">
    .button {
      @apply border border-neutral-300;
      @apply rounded-sm;
      @apply text-xs text-neutral-800;
      @apply bg-neutral-100;
      @apply px-2 py-1;
      @apply flex items-center flex-row gap-1;
    }
</style>

{#if !href}
    <button class="button" on:click={onClick}>
        <slot name="icon"></slot>
        {label}
    </button>
{:else}
	<a href={href} class="button" data-sveltekit-preload-data="hover" on:click={onClick} target={target}>
        <slot name="icon"></slot>
        {label}
    </a>
{/if}


