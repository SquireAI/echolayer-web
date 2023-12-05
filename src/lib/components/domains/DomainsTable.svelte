<script>
	import DotsHorizontalCircleOutlineIcon from 'svelte-material-icons/DotsHorizontalCircleOutline.svelte';
	import CodeArrayIcon from 'svelte-material-icons/CodeArray.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import TableAction from '$lib/components/table/TableAction.svelte';

	export let columns = ['Tag', 'Expert', 'Files', 'Repos', 'Actions'];
	export let rows = [];
</script>

<Table {columns} {rows}>
	{#if rows.length !== 0}
		{#each rows as row (row)}
			<TableRow>
				<TableBox>
					<div class="flex flex-row items-center gap-4 font-medium">
						<div class="rounded-sm h-6 w-6 bg-echolayer-green-100 flex items-center justify-center">
							<CodeArrayIcon color="white" class="w-4 h-4" />
						</div>
						<div class="flex flex-col">
							{row.name}
						</div>
					</div>
				</TableBox>
				<TableBox>{row.expert}</TableBox>
				<TableBox>{row.files.length}</TableBox>
				<TableBox>{row.repos.length}</TableBox>
				<TableBox>
					<div class="flex flex-row gap-1">
						<TableAction
							icon={DotsHorizontalCircleOutlineIcon}
							label="Details"
							href={`/domains/${row.id}`}
						/>
					</div>
				</TableBox>
			</TableRow>
		{/each}
	{/if}
</Table>
