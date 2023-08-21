<script lang="ts">
	import { getContext } from 'svelte';
	import type {
		SelectedOrganizationStore,
		OrganizationsStore,
		UserStore,
		UserInvitationStore
	} from '$lib/types';
	import {
		ORGS_STORE_NAME,
		SELECTED_ORG_STORE_NAME,
		USER_INVITATION_STORE_NAME,
		USER_STORE_NAME
	} from '$lib/stores';
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import {
		CREATE_ORG_PATH,
		HOME_PATH,
		INVALIDATE_SELECTED_ORG,
		ORGS_PATH,
		ORGS_SELECT_PATH
	} from '$lib/utils/paths';
	import { removeOrgCookie, setOrgCookie } from '$lib/utils/cookies';
	import { PUBLIC_DISCOVERY_ENABLED } from '$env/static/public';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import OrgItem from '$lib/org/OrgItem.svelte';
	import type { OrgsLayoutLoad } from './+page';
	import OrgInvitationItem from '$lib/org/OrgInvitationItem.svelte';
	import AccountGroup from 'svelte-material-icons/AccountGroup.svelte';

	export let data: OrgsLayoutLoad;

	onMount(() => {
		if ($page.url.searchParams.has(INVALIDATE_SELECTED_ORG)) {
			removeOrgCookie();
		}
	});

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;

	let orgStore: SelectedOrganizationStore;
	orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	let userInvitationStore: UserInvitationStore;
	userInvitationStore = getContext(USER_INVITATION_STORE_NAME) as UserInvitationStore;
	userInvitationStore.setInvitations(data.userInvitations);

	$: hasOrgs =
		($orgsStore.entity !== undefined && $orgsStore.entity.length > 0) ||
		($userInvitationStore.entity !== undefined && $userInvitationStore.entity.length > 0);
	$: orgs = $orgsStore.entity;
	$: invitations = $userInvitationStore.entity;

	const handleSelect = async (publicId: string) => {
		setOrgCookie(publicId);
		const selectedOrg = $orgsStore.entity?.find((org) => org.publicId === publicId);
		selectedOrg && orgStore.setOrganization(publicId);
		if (PUBLIC_DISCOVERY_ENABLED) {
			goto(HOME_PATH);
		} else {
			goto(ORGS_PATH);
		}
	};

	const handleAcceptInvite = async (publicId: string) => {
		try {
			const invitation = await data.acceptInvitationHandler(publicId);
			setOrgCookie(invitation.organization.publicId);
			userInvitationStore.setInvitations(
				$userInvitationStore.entity?.filter((inv) => inv.publicId !== publicId) || []
			);
			orgsStore.addOrganization(invitation.organization);
			const selectedOrg = $orgsStore.entity?.find(
				(org) => org.publicId === invitation.organization.publicId
			);
			selectedOrg && orgStore.setOrganization(invitation.organization.publicId);
			if (PUBLIC_DISCOVERY_ENABLED) {
				goto(HOME_PATH);
			} else {
				goto(ORGS_PATH);
			}
		} catch (e) {
			setTimeout(async () => {
				const updatedInvitations = await data.reloadInvitationsHandler();
				userInvitationStore.setInvitations(updatedInvitations);
			}, 2000);
			throw e;
		}
	};

	let previousPage: string = base;

	afterNavigate(({ from }) => {
		if (from?.url.pathname.includes(ORGS_SELECT_PATH)) {
			previousPage = PUBLIC_DISCOVERY_ENABLED ? HOME_PATH : ORGS_PATH;
		} else {
			previousPage = from?.url.pathname || previousPage;
		}
	});
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content bg-neutral-100 h-full flex flex-col items-center pt-16 w-full" slot="content">
		<div class="">
			{#if $orgsStore.loading}
				<p>Loading...</p>
			{:else if $orgsStore.error}
				<p>Error...</p>
			{:else if $userInvitationStore.loading}
				<p>Loading...</p>
			{:else if $userInvitationStore.error}
				<p>Error...</p>
			{:else if hasOrgs}
				<div class="flex flex-col gap-6 min-w-[400px]">
					<div class="flex flex-col items-center">
						<h2 class="font-medium text-2xl">Select Organization</h2>
						<p class="text-neutral-400">Please select an organization to view.</p>
					</div>
					<div class="flex flex-col gap-3">
						{#each orgs || [] as org}
							<OrgItem organization={org} {handleSelect} />
						{/each}
						{#each invitations || [] as invitation}
							<OrgInvitationItem {invitation} handleSelect={handleAcceptInvite} />
						{/each}
					</div>
					<div class="flex flex-row w-full gap-6">
						{#if $orgStore.entity && !$orgStore.loading}
							<Button
								type="grey"
								class="px-8 py-3"
								full={true}
								handleClick={() => goto(previousPage)}
							>
								Cancel
							</Button>
						{/if}
						<Button type="primary" full={true} href={`${CREATE_ORG_PATH}`}>Add new...</Button>
					</div>
				</div>
			{:else}
				<div class="pt-48 flex flex-col gap-y-12 text-center items-center justify-center w-[600px]">
					<span class="text-neutral-300">
						<AccountGroup size="48" />
					</span>
					<div class="flex flex-col gap-4">
						<h2 class="font-medium text-3xl text-neutral-800">You have no organizations.</h2>
						<p class="text-neutral-500">
							Your invites and organizations will appear here. You can get started creating an
							organization by clicking “Add new...” below. If you were invited, please contact your
							administrator to resend the invite.
						</p>
					</div>
					<Button type="primary" class="w-[400px]" href={`${CREATE_ORG_PATH}`}>Add new...</Button>
				</div>
			{/if}
		</div>
	</div>
</Panels>
