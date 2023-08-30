<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';

	export let label = '';
	export let onClick: () => void = () => {
		return;
	};
	export let href = '';
	export let target = '';
	export let disabled = false;
	export let loading = false;
</script>

{#if !href}
	<button class="button" on:click={onClick} {disabled}>
		{#if loading}
			<Loader size={20} />
		{:else}
			<slot name="icon" />
		{/if}
		{label}
	</button>
{:else}
	<a {href} class="button" data-sveltekit-preload-data="hover" on:click={onClick} {target}>
		{#if loading}
			<Loader size={20} />
		{:else}
			<slot name="icon" />
		{/if}
		{label}
	</a>
{/if}

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
