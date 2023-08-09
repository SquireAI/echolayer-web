<script type="ts">
	import DetailsListRow from '$lib/discovery/components/details/DetailsListRow.svelte';
	import type { DetailPropery } from '$lib/types';

	export let properties: DetailPropery[] = [];
</script>

<div class="details-list h-full">
	<div class="space-y-1 flex-1 flex flex-col">
		{#each properties as property}
			<DetailsListRow {property} />
		{/each}
	</div>
</div>
