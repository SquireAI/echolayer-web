<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		CREATE_ORG_PATH,
		HOME_PATH,
		INVALIDATE_QUERY_PARAMETER_NAME,
		ONBOARDING_PATH,
		ONBOARDING_SUBSCRIBE_PATH
	} from '$lib/utils/paths';
	import { goto, invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import Github from 'svelte-material-icons/Github.svelte';
	import IntegrationListItem from '$lib/components/integrations/IntegrationListItem.svelte';
	import type {
		IntegrationInstallStatus,
		Organization,
		OrganizationsStore,
		SelectedOrganizationStore
	} from '$lib/types';
	import OnboardingIntegrationItem from '../OnboardingIntegrationItem.svelte';
	import { ORGS_STORE_NAME, SELECTED_ORG_STORE_NAME, type organizationsStore } from '$lib/stores';
	import OnboardingHeader from '../OnboardingHeader.svelte';
	import OrgItem from '$lib/org/OrgItem.svelte';
	import OnboardingBackButton from '../OnboardingBackButton.svelte';
	import OnboardingButton from '../OnboardingButton.svelte';
	import PlusCircleOutline from 'svelte-material-icons/PlusCircleOutline.svelte';
	import { setOrgCookie } from '$lib/utils/cookies';

	export let onSelect: (org: Organization | undefined) => void;

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;

	$: hasOrgs = $orgsStore.entity !== undefined && $orgsStore.entity.length > 0;
	$: orgs = $orgsStore.entity;

	let orgStore: SelectedOrganizationStore;
	orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	// Selecting org
	let selecting = false;

	const handleSelect = async (publicId: string) => {
		if (selecting) return;
		selecting = true;
		setOrgCookie(publicId);
		const selectedOrg = $orgsStore.entity?.find((org) => org.publicId === publicId);
		selectedOrg && orgStore.setOrganization(publicId);
		onSelect(selectedOrg);
	};

	const handleAction = async (path: string) => {
		if (path) goto(path);
	};
</script>

<div class="flex flex-col">
	{#if $orgsStore.loading}
		<p>Loading...</p>
	{:else if $orgsStore.error}
		<p>Error...</p>
	{:else if hasOrgs}
		<div class="flex flex-col gap-6 min-w-[400px]">
			<div class="flex flex-col gap-3">
				{#each orgs || [] as org}
					<OrgItem organization={org} {handleSelect} />
				{/each}
			</div>
			<div class="flex flex-row w-full gap-6">
				<div>
					<OnboardingBackButton>
						<OnboardingButton
							class="w-full"
							templates="transparent"
							disabled={selecting || $orgsStore.loading}
						>
							Go Back
						</OnboardingButton>
					</OnboardingBackButton>
				</div>
				<div class="flex-1">
					<OnboardingButton
						templates="transparent"
						class="w-full"
						disabled={selecting || $orgsStore.loading}
						handleClick={() => handleAction(`${ONBOARDING_PATH}${CREATE_ORG_PATH}`)}
					>
						<PlusCircleOutline size="18" class="mr-1" />
						Add new...
					</OnboardingButton>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex flex-col text-center items-center justify-center">
			<OnboardingHeader
				title="You have no organizations"
				description="Your invites and organizations will appear here. You can get started creating an
                organization by clicking “Add new...” below. If you were invited, please contact your
                administrator to resend the invite."
			/>
			<div class="flex flex-row w-full gap-6">
				<div>
					<OnboardingBackButton>
						<OnboardingButton templates="transparent" disabled={selecting || $orgsStore.loading}>
							Go Back
						</OnboardingButton>
					</OnboardingBackButton>
				</div>
				<div class="flex-1">
					<OnboardingButton
						templates="transparent"
						class="w-full"
						href={`${ONBOARDING_PATH}${CREATE_ORG_PATH}`}
					>
						<PlusCircleOutline size="18" class="mr-1" />
						Add new...
					</OnboardingButton>
				</div>
			</div>
		</div>
	{/if}
</div>
