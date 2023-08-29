<script lang="ts">
	import FuzzySearch from 'fuzzy-search';

	import { modalStore } from '$lib/stores/modal';
	import CloseIcon from 'svelte-material-icons/Close.svelte';
	import AccountMultiple from 'svelte-material-icons/AccountMultiple.svelte';
	import Check from 'svelte-material-icons/Check.svelte';
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import TextInput from '../TextInput.svelte';
	import Button from '../Button.svelte';
	import { getContext } from 'svelte';
	import {
		ORG_INVITATION_SERVICE_CONTEXT_NAME,
		type OrgInvitationService
	} from '$lib/invitation/orgInvite.service';
	import { onMount } from 'svelte';
	import type { Invitation } from '$lib/types';
	import * as z from 'zod';
	import { ERROR_TIMEOUT_MILLISECONDS } from '$lib/constants';
	import { entityDetailsStore, teamStore } from '$lib/stores';
	import { getOwners } from '$lib/discovery/components/details/propertyHelpers';
	import DetailsButton from '$lib/discovery/components/details/DetailsButton.svelte';

	$: owners = getOwners(entityDetailsStore, teamStore);
	const emailSchema = z.string().email();

	const inviteService = getContext(ORG_INVITATION_SERVICE_CONTEXT_NAME) as OrgInvitationService;

	let invites: Invitation[] = [];

	onMount(async () => {
		invites = (await inviteService.getInvites()) || [];
	});

	let filter = '';
	let errorMessage = '';
	let formError = false;
	let revokeErrorMessage = new Map<string, string>();
	$: filteredTeams = new FuzzySearch(
		$teamStore.entity?.filter((t) => t.publicId !== $owners[0].publicId) || [],
		['name'],
		{ caseSensitive: false }
	).search(filter);

	const handleSubmit = async (email: string) => {
		errorMessage = '';
		formError = false;
		if (email.trim().length === 0) {
			formError = true;
			errorMessage = 'Please enter an email address';
			return;
		}

		if (!emailSchema.safeParse(email).success) {
			formError = true;
			errorMessage = 'Please enter a valid email address';
			return;
		}
		try {
			const newInvite = await inviteService.createInvite(email);
			invites = invites.concat([newInvite]);
		} catch (error: any) {
			formError = true;
			errorMessage = error.body?.message || 'An error occurred while creating the invite';
		}

		// Reset the form on success
		filter = '';
	};

	const handleRevoke = async (publicId: string) => {
		try {
			await inviteService.deleteInvite(publicId);
			invites = invites.filter((i) => i.publicId !== publicId);
		} catch (error: any) {
			revokeErrorMessage = revokeErrorMessage.set(
				publicId,
				error.body?.message || 'An error occurred while revoking the invite'
			);
			setTimeout(() => {
				revokeErrorMessage.delete(publicId);
				revokeErrorMessage = revokeErrorMessage;
			}, ERROR_TIMEOUT_MILLISECONDS);
		}
	};
</script>

<div class="">
	<div class="flex flex-row justify-between items-center gap-4 min-w-[500px] md:min-w-[750px] p-4">
		<h2 class="text-lg">Change owner for {$entityDetailsStore.entity?.name}</h2>
		<button on:click={() => modalStore.close()}>
			<CloseIcon width="20" height="20" />
		</button>
	</div>
	<div class="pl-3 py-2 pr-2 h-12 border-l-4 border-echolayer-blue-100 bg-echolayer-blue-100/5">
		<div class="flex flex-row justify-start items-center gap-2 h-full">
			<AccountMultiple size="24" />
			<span>
				{$owners[0].name} is the current owner.
			</span>
		</div>
	</div>
	<div class="border-b border-t border-neutral-300 p-3 grid grid-cols-12 align-items-start gap-3">
		<div class="flex flex-col col-span-12">
			<TextInput bind:value={filter} {errorMessage} {formError} placeholder="Filter by name...">
				<span slot="icon" class="text-neutral-400">
					<Magnify size="16" />
				</span>
			</TextInput>
		</div>
	</div>
	<div class="bg-netural-50 p-3 border-neutral-300 border-b bg-neutral-50">
		<h3 class="text-sm text-neutral-500">Select owner...</h3>
	</div>
	<div class="overflow-y-scroll h-64 min-w-[500px] md:min-w-[750px]">
		{#if !filteredTeams.length}
			<div class="w-full items-center text-center pt-4">
				<span class="w-full text-neutral-400"> No team found </span>
			</div>
		{/if}
		{#each filteredTeams as team}
			<div class="flex flex-row justify-between items-center gap-4 p-4 w-full">
				<div class="flex flex-row justify-start items-center gap-2 h-full">
					<AccountMultiple size="24" />
					<span>
						{team.name}
					</span>
				</div>
				<DetailsButton label="Select">
					<span slot="icon" class="text-echolayer-blue"><Check width="20" height="20" /></span>
				</DetailsButton>
			</div>
		{/each}
	</div>
</div>
