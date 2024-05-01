<script lang="ts">
	import { goto } from '$app/navigation';
	import NewOrgForm from '$lib/org/NewOrgForm.svelte';
	import { getContext } from 'svelte';
	import type { SelectedOrganizationStore, OrganizationsStore, UserStore } from '$lib/types';
	import type { OrgNewPageData } from './+page';
	import { HOME_PATH } from '$lib/utils/paths';
	import { setOrgCookie } from '$lib/utils/cookies';
	import { ORGS_STORE_NAME, SELECTED_ORG_STORE_NAME, USER_STORE_NAME } from '$lib/stores';
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';

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

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col gap-6 w-96 mx-auto mt-16">
			<div class="flex flex-col items-center">
				<h2 class="font-medium text-2xl">Set up new organization</h2>
				<p class="text-neutral-400 text-center">
					Let’s get started with Squire AI! Please enter your organization’s name below.
				</p>
			</div>
			<div class="flex flex-col gap-3">
				<NewOrgForm handleSubmit={onCreateOrg} />
			</div>
		</div>
	</div>
</Panels>
