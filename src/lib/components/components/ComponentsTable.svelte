<script>
	import Shape from 'svelte-material-icons/Shape.svelte';
	import CheckCircle from 'svelte-material-icons/CheckCircle.svelte';
	import DotsCircle from 'svelte-material-icons/DotsCircle.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';

	export let columns = ['Repository'];
	export let rows = [];
</script>

<Table {columns} {rows}>
	{#if rows.length !== 0}
		{#each rows as row (row)}
			<TableRow>
				<TableBox first={true}>
					<div class="flex flex-row items-center gap-4 font-medium">
						<div class="rounded-sm h-6 w-6 bg-echolayer-blue flex items-center justify-center">
							<Shape size={24} color="white" />
						</div>
						<div class="flex flex-col">
							{row.name}
						</div>
					</div>
				</TableBox>

				<TableBox>{row.owner}</TableBox>
				<TableBox>{row.knowledge_owner}</TableBox>
			</TableRow>
		{/each}
	{/if}
</Table>
