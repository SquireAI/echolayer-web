<script lang="ts">
	import { modalStore } from '$lib/stores/modal';
	import CloseIcon from 'svelte-material-icons/Close.svelte';
	import AccountMultiplePlusIcon from 'svelte-material-icons/AccountMultiplePlus.svelte';
	import EmailIcon from 'svelte-material-icons/Email.svelte';
	import MinusIcon from 'svelte-material-icons/Minus.svelte';
	import TextInput from '../TextInput.svelte';
	import Button from '../Button.svelte';
	import { getContext } from 'svelte';
	import {
		ORG_INVITATION_SERVICE_CONTEXT_NAME,
		type OrgInvitationService
	} from '$lib/services/orgInvite.service';
	import { onMount } from 'svelte';
	import type { Invitation } from '$lib/types';
	import * as z from 'zod';
	import { ERROR_TIMEOUT_MILLISECONDS } from '$lib/constants';

	const emailSchema = z.string().email();

	const inviteService = getContext(ORG_INVITATION_SERVICE_CONTEXT_NAME) as OrgInvitationService;

	let invites: Invitation[] = [];

	onMount(async () => {
		invites = (await inviteService?.getInvites()) || [];
	});

	let invitationEmail = '';
	let errorMessage = '';
	let formError = false;
	$: inactive = invitationEmail.trim().length === 0;
	$: invites;

	let revokeErrorMessage = new Map<string, string>();

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
		invitationEmail = '';
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
		<h2 class="text-lg">Invite members to organization</h2>
		<button on:click={() => modalStore.close()}>
			<CloseIcon width="20" height="20" />
		</button>
	</div>
	<div class="border-b border-t border-neutral-300 p-3 grid grid-cols-12 align-items-start gap-3">
		<div class="flex flex-col col-span-8 md:col-span-10">
			<TextInput
				bind:value={invitationEmail}
				{errorMessage}
				{formError}
				placeholder="Enter an email address..."
			/>
		</div>
		{#key inactive}
			<Button
				type="grey"
				handleClick={() => handleSubmit(invitationEmail)}
				class={`${
					inactive ? 'text-neutral-400' : 'text-neutral-800'
				} col-span-4 md:col-span-2 h-min`}
			>
				<span class="flex flex-row gap-2 justify-center items-center">
					<AccountMultiplePlusIcon
						height="20"
						width="20"
						class={`${inactive ? 'text-neutral-400' : 'text-echolayer-blue'}`}
					/>
					Invite
				</span>
			</Button>
		{/key}
	</div>
	<div class="bg-netural-50 p-3 border-neutral-300 border-b bg-neutral-50">
		<h3 class="text-sm text-neutral-500">Invited/Pending users ({invites.length})</h3>
	</div>
	<div>
		{#if invites.length === 0}
			<div
				class="flex flex-col items-center justify-center w-full p-8 text-neutral-500 text-sm bg-neutral-50"
			>
				No pending invitations
			</div>
		{:else}
			{#each invites || [] as invite (invite.publicId)}
				<div class="flex flex-row justify-between first:pt-0 py-1 gap-2 bg-neutral-50">
					<div
						class="border-l-4 border-neutral-300 pl-4 py-2 flex flex-row w-full justify-between pr-4 gap-2 md:gap-4"
					>
						<div class="text-neutral-800 flex flex-row items-center justify-center gap-1">
							<EmailIcon width="20" height="20" class="text-neutral-400" />
							{invite.invitedEmail}
						</div>
						<div
							class="flex flex-col md:flex-row justify-end md:justify-center items-end md:items-center gap-2 md:gap-4"
						>
							{#if revokeErrorMessage.has(invite.publicId)}
								<div class="text-echolayer-red text-sm">
									{revokeErrorMessage.get(invite.publicId)}
								</div>
							{/if}
							<Button type="grey" handleClick={() => handleRevoke(invite.publicId)}>
								<span class="flex flex-row gap-2 justify-center items-center">
									<MinusIcon height="20" width="20" class="text-echolayer-red" />
									Revoke
								</span>
							</Button>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
