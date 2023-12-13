<script>
	import FileMultipleOutlineIcon from 'svelte-material-icons/FileMultipleOutline.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import TableUser from '$lib/components/table/TableUser.svelte';

	export let columns = ['Path', 'Owner', 'Expert', 'Repository'];
	export let rows = [];
</script>

<Table {columns} {rows}>
	{#if rows.length !== 0}
		{#each rows as row (row)}
			<TableRow>
				<TableBox>
					<div class="flex flex-row items-center gap-4 font-medium">
						<div class="rounded-sm h-6 w-6 bg-echolayer-orange flex items-center justify-center">
							<FileMultipleOutlineIcon color="white" class="w-4 h-4" />
						</div>
						<div class="flex flex-col">
							{row.path}
						</div>
					</div>
				</TableBox>
				<TableBox><TableUser name={row.owner} /></TableBox>
				<TableBox><TableUser name={row.expert} /></TableBox>
				<TableBox>{row.repo}</TableBox>
			</TableRow>
		{/each}
	{/if}
</Table>
