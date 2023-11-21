<script>
	import CheckCircle from 'svelte-material-icons/CheckCircle.svelte';
	import Shape from 'svelte-material-icons/Shape.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';

	export let columns = [];
	export let rows = [];
	export let emptyMessage = 'No results found.';
</script>

<table class="w-full table-auto text-neutral-500 border-0">
	<thead>
		<tr class="pl-6 w-full uppercase text-left text-xs leading-6">
			{#each columns as column}
				<th>{column}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#if rows.length === 0}
			<tr>
				<td colspan="6" class="text-center p-8">{emptyMessage}</td>
			</tr>
		{:else}
			<slot />
		{/if}
	</tbody>
</table>

<style lang="scss">
	th {
		@apply font-semibold py-2;

		&:first-child {
			@apply pl-5;
		}
	}
</style>
