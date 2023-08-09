<script type="ts">
	import type { DetailPropery } from '$lib/types';

	export let property: DetailPropery;
	$: status = property?.status ?? null;
</script>

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

<style lang="scss">
	.details-list-row {
		@apply px-3 py-2;
		@apply border-l-2 border-gray-200;
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
