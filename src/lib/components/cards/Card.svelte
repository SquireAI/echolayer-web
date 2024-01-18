<script lang="ts">
	import type { ComponentEntity, Repository, TeamEntity } from '$lib/types';
	import type { SvelteComponent } from 'svelte';
	import CardDetailRow from './CardDetailRow.svelte';

	export let title: string | undefined;
	export let subtitle: string | undefined;
	export let image: string | undefined;
	export let icon: SvelteComponent | undefined = undefined;
	export let iconColor: string | undefined = 'bg-neutral-400';
	export let href = '#';
</script>

<div class="overflow-hidden rounded-xl border border-neutral-300 shadow-sm">
	<a {href}>
		{#if title}
			<div class="flex items-center gap-x-4 border-b border-neutral-300 bg-gray-50 p-3">
				{#if image}
					<img
						src={image}
						alt={title}
						class="h-10 w-10 flex-none rounded-lg bg-gray-300 object-cover ring-gray-900/10"
					/>
				{:else if icon}
					<span
						class={`w-10 h-10 flex justify-center items-center rounded-lg ring-neutral-200 ${iconColor}`}
					>
						<svelte:component this={icon} class="w-6 h-6 text-white" />
					</span>
				{/if}
				<div class="text-sm font-medium leading-5 text-gray-900 truncate">
					{title}
					{#if subtitle}
						<div class="text-gray-400 text-xs">{subtitle}</div>
					{/if}
				</div>
				<div class="relative ml-auto">
					<button
						type="button"
						class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500"
						id="options-menu-0-button"
						aria-expanded="false"
						aria-haspopup="true"
					>
						<span class="sr-only">Open options</span>
						<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
							/>
						</svg>
					</button>
				</div>
			</div>
		{/if}

		<dl class="bg-white text-sm leading-6 divide-y divide-neutral-100">
			<slot>
				<CardDetailRow key="First variable">Value</CardDetailRow>
			</slot>
		</dl>
	</a>
</div>
