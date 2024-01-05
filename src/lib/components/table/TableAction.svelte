<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	export let label: string | undefined;
	export let icon: SvelteComponent | undefined;

	export let href: string | undefined;
	export let onClick: () => void;
</script>

<a
	class="action inline-flex flex-row items-center border bg-neutral-200 border border-neutral-200 text-neutral-800 cursor-pointer"
	on:click={onClick}
	{href}
>
	<span class="action-content h-6 inline-flex flex-row items-center">
		{#if icon}
			<span class="w-6 flex justify-center"><svelte:component this={icon} /></span>
		{/if}
		{#if label}
			<span class="px-2 text-xs font-medium">{label}</span>
		{/if}
	</span>
</a>

<style lang="scss">
	.action {
		.action-content {
			span:nth-child(2) {
				padding-left: 0;
			}
		}
	}
</style>
