<script lang="ts">
	import BugIcon from 'svelte-material-icons/Bug.svelte';
	import DotsHorizontalCircleOutlineIcon from 'svelte-material-icons/DotsHorizontalCircleOutline.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import TableAction from '$lib/components/table/TableAction.svelte';
	import { formatDistance, subDays } from 'date-fns';

	function getFormattedDate(date: string): string {
		return formatDistance(subDays(new Date(date), 0), new Date(), { addSuffix: true });
	}

	export let columns = ['Issue', 'Score', 'Source', 'Issue Created', 'Action'];
	export let rows = [];
</script>

<Table {columns} {rows}>
	{#if rows.length !== 0}
		{#each rows as row (row)}
			<TableRow>
				<TableBox>
					<div class="flex flex-row items-center gap-4 font-medium">
						<div class="rounded-md h-6 w-6 bg-green-700 flex items-center justify-center">
							<BugIcon color="white" class="w-4 h-4" />
						</div>
						<div class="flex flex-col">
							{row.title}
						</div>
					</div>
				</TableBox>
				<TableBox>{row.score}</TableBox>
				<TableBox>{row.source}</TableBox>
				<TableBox>{getFormattedDate(row.createdAt)}</TableBox>
				<TableBox>
					<div class="flex flex-row gap-1">
						<TableAction
							icon={DotsHorizontalCircleOutlineIcon}
							label="Details"
							href={`/issues/${row.publicId}`}
						/>
					</div>
				</TableBox>
			</TableRow>
		{/each}
	{/if}
</Table>
