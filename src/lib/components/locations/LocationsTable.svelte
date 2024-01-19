<script>
	import FileMultipleOutlineIcon from 'svelte-material-icons/FileMultipleOutline.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import TableUser from '../table/TableUser.svelte';

	export let columns = ['Path', 'Expert'];
	export let rows = [];

	const getLocation = (obj) => {
		if (obj.path) return obj;
		else return obj.location;
	};

	const getExpert = (obj) => {
		const location = getLocation(obj);
		if (!location.owners || location.owners.length < 1) return null;
		else return location.owners[0];
	};
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
							{getLocation(row).path}
						</div>
					</div>
				</TableBox>
				<TableBox>
					{#if getExpert(row)}
						<TableUser name={getExpert(row).name} />
					{/if}
				</TableBox>
			</TableRow>
		{/each}
	{/if}
</Table>
