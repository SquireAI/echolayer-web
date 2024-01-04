<script>
	import Shape from 'svelte-material-icons/Shape.svelte';
	import DotsHorizontalCircleOutlineIcon from 'svelte-material-icons/DotsHorizontalCircleOutline.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import TableAction from '$lib/components/table/TableAction.svelte';
	import TableUser from '$lib/components/table/TableUser.svelte';

	export let columns = ['Component', 'Actions'];
	export let rows = [];
</script>

<Table {columns} {rows}>
	{#if rows.length !== 0}
		{#each rows as row (row)}
			<TableRow>
				<TableBox>
					<div class="flex flex-row items-center gap-4 font-medium">
						<div class="rounded-sm h-6 w-6 bg-echolayer-blue flex items-center justify-center">
							<Shape color="white" class="w-4 h-4" />
						</div>
						<div class="flex flex-col">
							{row.name}
						</div>
					</div>
				</TableBox>
				<!--				<TableBox><TableUser name={row.owner} /></TableBox>-->
				<!--				<TableBox><TableUser name={row.expert} /></TableBox>-->
				<TableBox>
					<div class="flex flex-row gap-1">
						<TableAction
							icon={DotsHorizontalCircleOutlineIcon}
							label="Details"
							href={`/components/${row.publicId}`}
						/>
					</div>
				</TableBox>
			</TableRow>
		{/each}
	{/if}
</Table>
