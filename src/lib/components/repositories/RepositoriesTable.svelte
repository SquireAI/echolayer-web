<script>
	import Shape from 'svelte-material-icons/Shape.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import DotsHorizontalCircleOutlineIcon from 'svelte-material-icons/DotsHorizontalCircleOutline.svelte';
	import AlertOutlineIcon from 'svelte-material-icons/AlertOutline.svelte';
	import TableAction from '$lib/components/table/TableAction.svelte';
	import TableTag from '$lib/components/table/TableLabel.svelte';
	import TooltipArrow from '$lib/components/TooltipArrow.svelte';
	import SourceRepositoryMultipleIcon from 'svelte-material-icons/SourceRepositoryMultiple.svelte';
	import TableUser from '$lib/components/table/TableUser.svelte';
	import { REPOSITORIES_PATH } from '$lib/utils/paths';

	export let columns = ['Repository', 'Default Branch', 'Expert', 'Status', 'Actions'];
	export let rows = [];
</script>

<Table {columns} {rows}>
	{#if rows.length !== 0}
		{#each rows as row (row)}
			<TableRow>
				<TableBox>
					<div class="flex flex-row items-center gap-4 font-medium">
						<div class="rounded-sm h-6 w-6 bg-neutral-400 flex items-center justify-center">
							<SourceRepositoryMultipleIcon color="white" class="w-4 h-4" />
						</div>
						<div class="flex flex-col">
							<a href={`${REPOSITORIES_PATH}/${row.owner}/${row.name}`}>{row.owner} / {row.name}</a>
						</div>
					</div>
				</TableBox>

				<TableBox>{row.default_branch}</TableBox>
				<TableBox><TableUser name={row.expert} /></TableBox>
				<TableBox>
					<div class="flex flex-row gap-1">
						<TooltipArrow content="You must merge the GitHub PR to install the Action.">
							<TableTag
								icon={AlertOutlineIcon}
								color="yellow"
								label="Pending PR"
								href={`${REPOSITORIES_PATH}/${row.owner}/${row.name}`}
							/>
						</TooltipArrow>
					</div>
				</TableBox>
				<TableBox>
					<div class="flex flex-row gap-1">
						<TableAction
							icon={DotsHorizontalCircleOutlineIcon}
							label="Details"
							href={`${REPOSITORIES_PATH}/${row.owner}/${row.name}`}
						/>
					</div>
				</TableBox>
			</TableRow>
		{/each}
	{/if}
</Table>
