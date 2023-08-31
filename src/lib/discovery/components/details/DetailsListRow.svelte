<script lang="ts">
	import type { DetailProperty } from '$lib/types';

	export let property: DetailProperty;
	$: status = property?.status ?? null;
</script>

{#if property}
	<div class="details-list-row {status}">
		<div class="flex flex-row justify-start items-center gap-2 h-full">
			<svelte:component this={property.fieldIcon} />
			<span>
				{property.title}
			</span>
		</div>

		<div class="flex flex-row">
			<!-- Using button for plain text for formatting consistency -->
			<button
				on:click={property.clickHandler}
				class={`h-full w-full text-start px-2 ${
					property.clickHandler ? 'hover:bg-neutral-100' : 'cursor-default'
				} ${property.classes}`}
			>
				<span class="flex flex-row gap-2 items-center">
					<svelte:component this={property.itemIcon} />
					{property.value}
				</span>
			</button>
		</div>
	</div>
{/if}

<style lang="scss">
	.details-list-row {
		@apply pl-3 py-2 pr-2;
		@apply h-12;
		@apply border-l-4 border-gray-200;
		@apply grid;
		@apply text-xs;
		@apply grid-cols-1/3-2/3;

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
