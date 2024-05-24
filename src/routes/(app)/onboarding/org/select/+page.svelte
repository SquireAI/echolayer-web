<script lang="ts">
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import CenterWrapper from '$lib/layouts/dark/CenterWrapper.svelte';
	import SwitchOrgButton from '$lib/onboarding/SwitchOrgButton.svelte';
	import OnboardingButton from '$lib/onboarding/OnboardingButton.svelte';
	import { getContext, onMount } from 'svelte';
	import type {
		OrganizationsStore,
		SelectedOrganizationStore,
		UserInvitationStore,
		UserStore
	} from '$lib/types';
	import {
		ORGS_STORE_NAME,
		SELECTED_ORG_STORE_NAME,
		USER_INVITATION_STORE_NAME,
		USER_STORE_NAME,
		organizationsStore
	} from '$lib/stores';
	import {
		CREATE_ORG_PATH,
		HOME_PATH,
		INVALIDATE_SELECTED_ORG,
		ONBOARDING_GITHUB_PATH,
		ONBOARDING_PATH,
		ORGS_PATH,
		ORGS_SELECT_PATH
	} from '$lib/utils/paths';
	import { goto } from '$app/navigation';
	import { setOrgCookie } from '$lib/utils/cookies';
	import { page } from '$app/stores';
	import OrgItem from '$lib/org/OrgItem.svelte';
	import OrgInvitationItem from '$lib/org/OrgInvitationItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import AccountGroup from 'svelte-material-icons/AccountGroup.svelte';
	import PlusCircleOutline from 'svelte-material-icons/PlusCircleOutline.svelte';
	import type { OrgsLayoutLoad } from './+page';
	import OnboardingLogout from '$lib/onboarding/OnboardingLogout.svelte';
	import OnboardingBackButton from '$lib/onboarding/OnboardingBackButton.svelte';
	import OnboardingOrgSelect from '$lib/onboarding/steps/OnboardingOrgSelect.svelte';

	export let data: OrgsLayoutLoad;

	const RELOAD_TIMEOUT_MILLISECONDS = 2000;

	onMount(() => {
		if ($page.url.searchParams.has(INVALIDATE_SELECTED_ORG)) {
			// removeOrgCookie();
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

	// Selecting org
	let selecting = false;

	const handleSelect = async (publicId: string) => {
		if (selecting) return;
		selecting = true;
		setOrgCookie(publicId);
		const selectedOrg = $orgsStore.entity?.find((org) => org.publicId === publicId);
		selectedOrg && orgStore.setOrganization(publicId);
		goto(HOME_PATH);
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
			goto(HOME_PATH);
		} catch (e) {
			setTimeout(async () => {
				const updatedInvitations = await data.reloadInvitationsHandler();
				userInvitationStore.setInvitations(updatedInvitations);
			}, RELOAD_TIMEOUT_MILLISECONDS);
			throw e;
		}
	};

	const handleAction = async (path: string) => {
		if (path) goto(path);
	};

	let previousPage: string = HOME_PATH;
</script>

<div class="flex flex-col w-full items-center my-auto py-12">
	<CenterWrapper>
		<div class="flex flex-col">
			<OnboardingOrgSelect {data} onSelect={() => goto(ONBOARDING_GITHUB_PATH)} />
		</div>
	</CenterWrapper>

	<div class="max-w-xl my-6 flex flex-row items-stretch gap-3">
		<OnboardingLogout />
	</div>
</div>
