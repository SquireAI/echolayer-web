<script lang="ts">
	import type { ComponentEntity, Repo, TeamEntity } from '$lib/types';

	export let entity: ComponentEntity | TeamEntity | Repo | undefined;
</script>

{#if entity}
	<div class="overflow-hidden rounded-xl border border-gray-200">
		<a href="/">
			<div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-3">
				<img
					src="https://tailwindui.com/img/logos/48x48/tuple.svg"
					alt="Tuple"
					class="h-8 w-8 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
				/>
				<div class="text-sm font-medium leading-6 text-gray-900">{entity.name}</div>
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
			<dl class="bg-white text-sm leading-6 divide-y divide-neutral-100">
				<div class="flex justify-between gap-x-4 py-2 px-3">
					<dt class="text-gray-500">First variable</dt>
					<dd class="text-gray-700">Value</dd>
				</div>
				<div class="flex justify-between gap-x-4 py-2 px-3">
					<dt class="text-gray-500">Second Variable</dt>
					<dd class="text-gray-700">Value</dd>
				</div>
			</dl>
		</a>
	</div>
{/if}
