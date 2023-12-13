<script lang="ts">
	import { modalStore } from '$lib/stores/modal';
	import CloseIcon from 'svelte-material-icons/Close.svelte';
	import AccountMultipleIcon from 'svelte-material-icons/AccountMultiple.svelte';
	import TextInput from '../TextInput.svelte';
	import Button from '../Button.svelte';
	import { onMount } from 'svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableBox from '$lib/components/table/TableBox.svelte';
	import TableUser from '$lib/components/table/TableUser.svelte';
	import TableLabel from '$lib/components/table/TableLabel.svelte';

	let errorString = '';
	let errorMessage = '';
	let formError = false;
	$: inactive = errorString.trim().length === 0;

	const handleSubmit = async (error: string) => {
		result = true;
	};

	let result = false;
</script>

<div class="">
	<div
		class="flex flex-row justify-between items-center gap-4 min-w-[500px] md:min-w-[750px] max-w-lg p-4"
	>
		<div class="flex-col">
			<h2 class="text-lg mb-3 font-normal">Find an Expert</h2>
			<p class="text-neutral-500">
				Enter your security vulnerability, error details or any diagnotic information about your
				source code and EchLayer will identify the person to talk to.
			</p>
		</div>
		<button on:click={() => modalStore.close()}>
			<CloseIcon width="20" height="20" />
		</button>
	</div>
	<div class="border-b border-t border-neutral-300 p-3 gap-3 flex flex-row items-stretch">
		<div class="flex-1 flex flex-col col-span-8 md:col-span-10">
			<TextArea
				bind:value={errorString}
				{errorMessage}
				{formError}
				rows={4}
				placeholder="Enter your error details, file paths..."
			/>
		</div>
		{#key inactive}
			<div>
				<Button
					type="grey"
					handleClick={() => handleSubmit(errorString)}
					class={`${
						inactive ? 'text-neutral-400' : 'text-neutral-800'
					} col-span-4 md:col-span-2 h-full px-5`}
				>
					<span class="flex flex-row gap-2 justify-center items-center">
						<AccountMultipleIcon
							height="20"
							width="20"
							class={`${inactive ? 'text-neutral-400' : 'text-echolayer-blue'}`}
						/>
						Find
					</span>
				</Button>
			</div>
		{/key}
	</div>
	{#if result}
		<div>
			<Table columns={['Domain', 'Expert']} rows={['Domain', 'Expert']}>
				<TableRow>
					<TableBox>
						<div class="flex flex-row gap-3">
							<input type="radio" />
							<TableLabel label="AUTH" />
						</div>
					</TableBox>
					<TableBox>
						<TableUser name="@saumilp" />
					</TableBox>
				</TableRow>
				<TableRow>
					<TableBox>
						<div class="flex flex-row gap-3 py-1">
							<input type="radio" />
							<TableLabel label="SSO" />
						</div>
					</TableBox>
					<TableBox>
						<TableUser name="@saumilp" />
					</TableBox>
				</TableRow>
				<TableRow>
					<TableBox>
						<div class="flex flex-row gap-3 py-1">
							<input type="radio" />
							<TableLabel label="AUTHORIZATION" />
						</div>
					</TableBox>
					<TableBox>
						<TableUser name="@security-team" />
					</TableBox>
				</TableRow>
			</Table>
		</div>
		<div>
			<Table columns={['File Path', 'Expert']} rows={['File Path', 'Expert']}>
				<TableRow>
					<TableBox>
						<div class="flex flex-row gap-3">
							<input type="radio" />
							<div>/src/services/auth</div>
						</div>
					</TableBox>
					<TableBox>
						<TableUser name="@security-team" />
					</TableBox>
				</TableRow>
				<TableRow>
					<TableBox>
						<div class="flex flex-row gap-3 py-1">
							<input type="radio" />
							<div>/src/services/auth/validation.ts</div>
						</div>
					</TableBox>
					<TableBox>
						<TableUser name="@core-team" />
					</TableBox>
				</TableRow>
				<TableRow>
					<TableBox>
						<div class="flex flex-row gap-3 py-1">
							<input type="radio" />
							<div>/src/services/auth/admin-guard.ts</div>
						</div>
					</TableBox>
					<TableBox>
						<TableUser name="@saumilp" />
					</TableBox>
				</TableRow>
			</Table>
		</div>
		<div class="p-3 text-right">
			<Button
				type="grey"
				handleClick={() => {
					console.log('remediate');
				}}
				class={`text-neutral-800 col-span-4 md:col-span-2 h-full px-5 w-full`}
			>
				<span class="flex flex-row gap-2 justify-center items-center py-2"> Remediate </span>
			</Button>
		</div>
	{/if}
</div>
