<script>
	import Shape from 'svelte-material-icons/Shape.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import TableAction from '$lib/components/table/TableAction.svelte';
	import DotsHorizontalCircleOutlineIcon from 'svelte-material-icons/DotsHorizontalCircleOutline.svelte';

	export let columns = ['Team', 'Members', 'Components', 'Actions'];
	export let rows = [];
	$: rows, console.log(rows);
</script>

<Table {columns} {rows}>
	{#if rows.length !== 0}
		{#each rows as row (row)}
			<TableRow>
				<TableBox>
					<div class="flex flex-row items-center gap-4 font-medium">
						<div class="rounded-sm h-6 w-6 bg-yellow-500 flex items-center justify-center">
							<Shape size={24} color="white" />
						</div>
						<div class="flex flex-col">
							{row.name}
						</div>
					</div>
				</TableBox>
				<TableBox>{row.default_branch}</TableBox>
				<TableBox>{row.owner}</TableBox>
				<TableBox>
					<div class="flex flex-row gap-1">
						<TableAction
							icon={DotsHorizontalCircleOutlineIcon}
							label="Details"
							href={`/teams/${row.publicId}`}
						/>
					</div>
				</TableBox>
			</TableRow>
		{/each}
	{/if}
</Table>
