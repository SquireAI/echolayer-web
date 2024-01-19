<script lang="ts">
	import BugIcon from 'svelte-material-icons/Bug.svelte';
	import DotsHorizontalCircleOutlineIcon from 'svelte-material-icons/DotsHorizontalCircleOutline.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import TableAction from '$lib/components/table/TableAction.svelte';
	import { formatDistance, subDays } from 'date-fns';

	const getFormattedDate = (date: string): string => {
		return formatDistance(subDays(new Date(date), 0), new Date(), { addSuffix: true });
	};

	const severityOptions = [
		{
			label: 'Low',
			value: 'low',
			letter: 'L',
			description: 'Not a priority. Keep an eye on it.',
			color: 'bg-yellow-500'
		},
		{
			label: 'Medium',
			value: 'medium',
			letter: 'M',
			description: 'Might be important to have a look at it.',
			color: 'bg-orange-500'
		},
		{
			label: 'High',
			value: 'high',
			letter: 'H',
			description: 'This is serious, please review.',
			color: 'bg-red-600'
		},
		{
			label: 'Critical',
			value: 'critical',
			letter: '!',
			description: 'Must resolved as soon as possible.',
			color: 'bg-red-800'
		}
	];

	const getSeverityDetails = (severity: string) => {
		return severityOptions.find((option) => option.value === severity);
	};

	export let columns = ['Issue', 'Severity', 'Issue Created', 'Action'];
	export let rows = [];
</script>

<Table {columns} {rows}>
	{#if rows.length !== 0}
		{#each rows as row (row)}
			<TableRow>
				<TableBox>
					<div class="flex flex-row items-center gap-4 font-medium">
						<div
							class={`rounded-md h-6 w-6 flex items-center justify-center text-white font-bold ${
								getSeverityDetails(row.severity)?.color
							}`}
						>
							{getSeverityDetails(row.severity)?.letter}
						</div>
						<div class="flex flex-col">
							{row.title}
						</div>
					</div>
				</TableBox>
				<TableBox><span class="capitalize">{row.severity}</span></TableBox>
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
