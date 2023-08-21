<script lang="ts">
	import type { Invitation } from '$lib/types';
	import Login from 'svelte-material-icons/Login.svelte';
	import AlertCircle from 'svelte-material-icons/AlertCircle.svelte';
	import OrgIcon from './OrgIcon.svelte';
	import { ERROR_TIMEOUT_MILLISECONDS } from '$lib/constants';

	export let invitation: Invitation;
	export let handleSelect: (publicId: string) => Promise<void> | void;
	let isError = false;
</script>

<button
	on:click={async () => {
		if (isError) return;
		try {
			await handleSelect(invitation.publicId);
		} catch {
			isError = true;
			setTimeout(() => {
				isError = false;
			}, ERROR_TIMEOUT_MILLISECONDS);
		}
	}}
>
	<span
		class={`
        flex flex-row justify-between items-center px-2 rounded-md hover:cursor-pointer ${
					isError
						? 'bg-echolayer-red-200/80 text-echolayer-red-900'
						: 'bg-echolayer-green-200/80 text-echolayer-green-900 hover:bg-neutral-200 hover:text-neutral-500'
				} `}
	>
		<span class="flex flex-row gap-2 items-center py-2">
			<OrgIcon text={invitation.organization.publicId} />
			<div class={`flex flex-col items-start`}>
				<p class="font-medium leading-5">
					{invitation.organization.name}
				</p>
				<p class="text-sm">Invited to organization</p>
			</div>
		</span>
		<span class="font-medium flex flex-row gap-1">
			{#if isError}
				Failed to accept
				<AlertCircle height="24" width="24" />
			{:else}
				Accept
				<Login height="24" width="24" />
			{/if}
		</span>
	</span>
</button>
