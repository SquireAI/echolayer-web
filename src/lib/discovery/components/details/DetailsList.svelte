<script lang="ts">
	import DetailsListRow from '$lib/discovery/components/details/DetailsListRow.svelte';
	import type { DetailProperty } from '$lib/types';

	export let properties: DetailProperty[] = [];
</script>

<div class="details-list h-full">
	<div class="space-y-1 flex-1 flex flex-col">
		{#each properties as property}
			<DetailsListRow {property} />
		{/each}
	</div>
</div>
