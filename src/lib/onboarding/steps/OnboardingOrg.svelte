<script lang="ts">
	import { goto } from '$app/navigation';
	import NewOrgForm from '$lib/org/NewOrgForm.svelte';
	import { ORGS_STORE_NAME, SELECTED_ORG_STORE_NAME, USER_STORE_NAME } from '$lib/stores';
	import type { OrganizationsStore, SelectedOrganizationStore, UserStore } from '$lib/types';
	import { setOrgCookie } from '$lib/utils/cookies';
	import { HOME_PATH, ONBOARDING_PATH } from '$lib/utils/paths';
	import { getContext, onMount } from 'svelte';

	export let data: any;
	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;
	const { createOrgHandler } = data;

	let orgStore: SelectedOrganizationStore;
	orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;
	$: organization = $orgStore.entity;

	async function onCreateOrg(orgName: string): Promise<void> {
		const createdOrg = await createOrgHandler(orgName);
		setOrgCookie(createdOrg.publicId);
		orgsStore.addOrganization(createdOrg);
		orgStore.setOrganization(createdOrg.publicId);
		setTimeout(() => {
			goto(`${ONBOARDING_PATH}/github`);
		}, 300);
	}

	onMount(() => {
		console.log('organization', organization);
		if (organization) goto(`${ONBOARDING_PATH}/github`);
	});
</script>

<div class="flex-1 flex flex-col items-center justify-center min-h-fit pt-6 pb-12">
	<div class="flex flex-col gap-6 w-96">
		<p class="text-neutral-800 text-center">
			Create an organization to start syncing your repositories with your team members.
		</p>
		<NewOrgForm handleSubmit={onCreateOrg} />
	</div>
</div>
