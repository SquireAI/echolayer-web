<script>
	import Shape from 'svelte-material-icons/Shape.svelte';
	import CheckCircle from 'svelte-material-icons/CheckCircle.svelte';
	import DotsCircle from 'svelte-material-icons/DotsCircle.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import DotsHorizontalCircleOutlineIcon from 'svelte-material-icons/DotsHorizontalCircleOutline.svelte';
	import AlertOutlineIcon from 'svelte-material-icons/AlertOutline.svelte';
	import TableAction from '$lib/components/table/TableAction.svelte';
	import TableTag from '$lib/components/table/TableTag.svelte';
	import TooltipArrow from '$lib/components/TooltipArrow.svelte';

	export let columns = [
		'Repository',
		'Default Branch',
		'Owner',
		'Knowledge Owner',
		'Status',
		'Actions'
	];
	export let rows = [];
</script>

<Table {columns} {rows}>
	{#if rows.length !== 0}
		{#each rows as row (row)}
			<TableRow>
				<TableBox>
					<div class="flex flex-row items-center gap-4 font-medium">
						<div class="rounded-sm h-6 w-6 bg-echolayer-blue flex items-center justify-center">
							<Shape size={24} color="white" />
						</div>
						<div class="flex flex-col">
							{row.name}
						</div>
					</div>
				</TableBox>

				<TableBox>{row.default_branch}</TableBox>
				<TableBox>{row.owner}</TableBox>
				<TableBox>{row.knowledge_owner}</TableBox>
				<TableBox>
					<div class="flex flex-row gap-1">
						<TooltipArrow content="You must merge the GitHub PR to install the Action.">
							<TableTag
								icon={AlertOutlineIcon}
								color="yellow"
								label="Pending PR"
								href={`/repos/${row.publicId}`}
							/>
						</TooltipArrow>
					</div>
				</TableBox>
				<TableBox>
					<div class="flex flex-row gap-1">
						<TableAction
							icon={DotsHorizontalCircleOutlineIcon}
							label="Details"
							href={`/repos/${row.publicId}`}
						/>
					</div>
				</TableBox>
			</TableRow>
		{/each}
	{/if}
</Table>
