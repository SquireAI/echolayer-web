<script lang="ts">
	import { goto } from '$app/navigation';
	import NewOrgForm from '$lib/onboarding/NewOrgForm.svelte';
	import { getContext } from 'svelte';
	import type { SelectedOrganizationStore, OrganizationsStore, UserStore } from '$lib/types';
	import type { OrgNewPageData } from './+page';
	import { HOME_PATH } from '$lib/utils/paths';
	import { setOrgCookie } from '$lib/utils/cookies';
	import { ORGS_STORE_NAME, SELECTED_ORG_STORE_NAME, USER_STORE_NAME } from '$lib/stores';
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import CenterWrapper from '$lib/layouts/dark/CenterWrapper.svelte';
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import OnboardingLogout from '$lib/onboarding/OnboardingLogout.svelte';

	/** @type {import('../../../../../.svelte-kit/types/src/routes').PageData} */
	export let data: OrgNewPageData;

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;
	const { createOrgHandler } = data;

	let orgStore: SelectedOrganizationStore;
	orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	async function onCreateOrg(orgName: string): Promise<void> {
		const createdOrg = await createOrgHandler(orgName);
		setOrgCookie(createdOrg.publicId);
		orgsStore.addOrganization(createdOrg);
		orgStore.setOrganization(createdOrg.publicId);
		setTimeout(() => {
			goto(HOME_PATH);
		}, 300);
	}
</script>

<div class="flex flex-col w-full items-center my-auto py-12">
	<CenterWrapper>
		<div class="flex flex-col">
			<div class="flex flex-col gap-6 min-w-[400px]">
				<OnboardingHeader
					title="New Organization"
					description="Please select a name for your new organization."
				/>
			</div>
			<div class="flex flex-col gap-3">
				<NewOrgForm handleSubmit={onCreateOrg} />
			</div>
		</div>
	</CenterWrapper>

	<div class="max-w-xl my-6 flex flex-row items-stretch gap-3">
		<OnboardingLogout />
	</div>
</div>
