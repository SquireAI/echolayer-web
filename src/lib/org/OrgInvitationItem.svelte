<script lang="ts">
	import type { Invitation } from '$lib/types';
	import Login from 'svelte-material-icons/Login.svelte';
	import OrgIcon from './OrgIcon.svelte';

	export let invitation: Invitation;
	export let handleSelect: (publicId: string) => void;

	const isSingular = invitation.organization.members.length === 1;
</script>

<button on:click={() => handleSelect(invitation.publicId)}>
	<span
		class={`
        flex flex-row justify-between items-center px-2 rounded-md hover:cursor-pointer bg-echolayer-green-200/80`}
	>
		<span class="flex flex-row gap-2 items-center py-2">
			<OrgIcon text={invitation.organization.publicId} />
			<div class={`flex flex-col items-start`}>
				<p class="font-medium leading-5 text-echolayer-green-900">
					{invitation.organization.name}
				</p>
				<p class="text-sm text-echolayer-green-900">
					{invitation.organization.members.length}
					{isSingular ? 'member' : 'members'}
				</p>
			</div>
		</span>
		<span class="text-echolayer-green-900 font-medium flex flex-row gap-1">
			Accept
			<Login height="24" width="24" />
		</span>
	</span>
</button>
