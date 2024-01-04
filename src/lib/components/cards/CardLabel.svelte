<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	export let label: string | undefined;
	export let icon: SvelteComponent | undefined = undefined;
	export let color: string | undefined = 'neutral';
	export let href: string | undefined = '#';
	export let onClick: () => void;

	let colorClasses = {
		neutral: `text-neutral-500 border-neutral-500 hover:bg-neutral-500/5`,
		yellow: `text-yellow-900 border-yellow-900 hover:bg-yellow-900/5`,
		red: `text-red-900 border-red-900 hover:bg-red-900/5`,
		green: `text-green-900 border-green-900 hover:bg-green-900/5`
	};
</script>

<a
	class={`tag inline-flex flex-row items-center border bg-white/0 cursor-pointer rounded-full ${
		color ? colorClasses[color] : ''
	}`}
	on:click={onClick}
	{href}
>
	<span class="tag-content h-6 inline-flex flex-row items-center">
		{#if icon}
			<span class="w-6 flex justify-center"><svelte:component this={icon} /></span>
		{/if}
		{#if label}
			<span class="px-2 text-xs font-medium">{label}</span>
		{/if}
	</span>
</a>

<style lang="scss">
	.tag {
		.tag-content {
			span:nth-child(2) {
				padding-left: 0;
			}
		}
	}
</style>
