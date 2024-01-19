<script lang="ts">
	import TextArea from '../TextArea.svelte';
	import { page } from '$app/stores';
	import AccountMultipleIcon from 'svelte-material-icons/AccountMultiple.svelte';
	import LoadingIcon from 'svelte-material-icons/Loading.svelte';
	import TableRow from '../table/TableRow.svelte';
	import TableBox from '../table/TableBox.svelte';
	import Table from '../table/Table.svelte';
	import TableUser from '../table/TableUser.svelte';
	import Button from '../Button.svelte';
	import TextInput from '../TextInput.svelte';
	import TableLabel from '../table/TableLabel.svelte';

	let string = '';
	let errorMessage = '';
	let formError = false;
	let results: any[] = [];
	let formSubmitted = false;
	let formCompleted = false;
	$: invalid = string.trim().length < 6;
	$: loading = formSubmitted && !formCompleted;
	$: disabled = invalid || loading || results.length > 0;

	const getResults = async (path: string) => {
		if (disabled) return;
		if (!$page?.data?.apis?.locationOwnersApi) return;
		const api = $page.data.apis.locationOwnersApi;
		results = (await api.getOwners(path)) || [];
		formCompleted = true;
	};

	const handleSubmit = async (input: string) => {
		if (disabled) return;
		formSubmitted = true;
		await getResults(input);
	};
</script>

<div class="flex-1 flex flex-col">
	{#if results.length < 1}
		<div class="relative flex-1 flex flex-row gap-3 items-stretch p-3">
			<TextInput
				bind:value={string}
				{errorMessage}
				{formError}
				placeholder="ie. /src/modules/auth/utils"
			/>
			{#key invalid}
				<div>
					<Button
						type="grey"
						handleClick={() => handleSubmit(string)}
						class={`${
							invalid ? 'text-neutral-400' : 'text-neutral-800'
						} col-span-4 md:col-span-2 h-full px-5`}
					>
						<span class="flex flex-row gap-2 justify-center items-center">
							<AccountMultipleIcon
								height="20"
								width="20"
								class={`${invalid ? 'text-neutral-400' : 'text-echolayer-blue'}`}
							/>
							Find
						</span>
					</Button>
				</div>
			{/key}

			{#if loading}
				<div
					class="absolute top-0 left-0 w-full h-full bg-neutral-300/50 z-10 flex justify-center items-center"
				>
					<span class="animate-spin text-neutral-600"><LoadingIcon size="40px" /></span>
				</div>
			{/if}
		</div>
	{:else}
		<div class="text-left">
			<Table columns={['Expert', 'Status']} rows={results}>
				{#each results as result}
					<TableRow>
						<TableBox>
							<TableUser name={result.name} />
						</TableBox>
						<TableBox>
							<TableLabel label={result.isActive ? 'Active' : 'Inactive'} />
						</TableBox>
					</TableRow>
				{/each}
			</Table>
		</div>
	{/if}
	{#if formCompleted && results.length < 1}
		<div class="flex flex-row justify-center gap-3 p-3 border-t border-neutral-300">
			No experts could be found for this path.
		</div>
	{/if}
</div>
