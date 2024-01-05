<script lang="ts">
	export let tabs: string[] = [];
	export let selected = 0;
	export let onSelect: (tab: string, position: number) => void = () => undefined;
	let _onSelect = (index: number) => {
		selected = index;
		if (onSelect) onSelect(tabs[selected], selected);
	};
</script>

<div class="tabs text-sm border-b border-neutral-300">
	{#each tabs as tab, i}
		<button
			type="button"
			class:selected={tab === tabs[selected]}
			on:click={() => _onSelect(i)}
			class="font-medium text-center capitalize px-4 pt-5 pb-2 text-neutral-500 border-b-2 border-neutral-300/0 hover:border-neutral-300"
		>
			{tab}
		</button>
	{/each}
</div>

<style lang="scss">
	.tabs {
		button {
			&.selected {
				@apply border-b-2 text-neutral-800 border-neutral-300;
			}
		}
	}
</style>
