<script lang="ts">
	export let tabs: string[] = [];
	export let selected = 0;
	export let onSelect: (tab: string, position: number) => void = () => undefined;
	let _onSelect = (index: number) => {
		selected = index;
		if (onSelect) onSelect(tabs[selected], selected);
	};
</script>

<span class="tabs isolate rounded-md shadow-sm text-sm">
	{#each tabs as tab, i}
		<button
			type="button"
			class:selected={tab === tabs[selected]}
			on:click={() => _onSelect(i)}
			class="bg-white hover:bg-neutral-200"
		>
			{tab}
		</button>
	{/each}
</span>

<style lang="scss">
	.tabs {
		@apply border-neutral-200 border bg-white rounded-md;
		@apply flex flex-row w-full gap-1;

		button {
			@apply relative flex-1 items-center;
			@apply border-0 px-3 py-0.5 font-medium text-center text-gray-900 rounded-md shadow-none drop-shadow-none ring-0 capitalize;

			&.selected {
				@apply bg-echolayer-lightBlue text-echolayer-blue-200 border-echolayer-lightBlue border;
			}
		}
	}
</style>
