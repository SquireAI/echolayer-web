<script lang="ts">
	type TableColumn = {
		key?: string;
		label: string;
	};

	export let columns: TableColumn[] | string[] = [];
	export let rows = [];
	export let emptyMessage = 'No results found.';
</script>

<table class="w-full table-auto text-neutral-500 border-0">
	<thead>
		<tr class="pl-6 w-full uppercase text-left text-xs leading-6">
			{#each columns as column}
				<th>{typeof column === 'object' ? column.label : column}</th>
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

		&:last-child {
			width: 0.1%;
			white-space: nowrap;
			@apply pr-5;
		}
	}
</style>
