<script lang="ts">
	import { goto } from '$app/navigation';
	import NewOrgForm from '$lib/org/NewOrgForm.svelte';
	import { getContext } from 'svelte';
	import type { SelectedOrganizationStore, OrganizationsStore, UserStore } from '$lib/types';
	import { HOME_PATH } from '$lib/utils/paths';
	import { setOrgCookie } from '$lib/utils/cookies';
	import { ORGS_STORE_NAME, SELECTED_ORG_STORE_NAME, USER_STORE_NAME } from '$lib/stores';
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Gitlab from 'svelte-material-icons/Gitlab.svelte';
	import AccessTokenForm from '$lib/integrations/AccessTokenForm.svelte';
	import { page } from '$app/stores';
	import type { GitlabIntegrationsPageData } from './+page.server';
	import type { GitlabIntegrationsPageHandlers } from './page';

	export let data: GitlabIntegrationsPageData & GitlabIntegrationsPageHandlers;
	let step: 'setup' | 'success' = 'setup';

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;

	let orgStore: SelectedOrganizationStore;
	orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	async function onContinueSetup(accessToken: string): Promise<void> {
		const secretToken = await data.installGitlabHandler(accessToken);
	}
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col gap-6 w-[600px] mx-auto mt-64">
			<div class="flex flex-col items-center">
				<Gitlab size="36" />
				<h2 class="font-medium text-2xl mt-8">Please enter your Group Access Token.</h2>
				<p class="text-neutral-400 text-center">
					In order to connect to GitLab, you will need to enter a Group Access Token and set up a
					webhook with our API. To start, enter your token below.
				</p>
			</div>
			<div class="flex flex-col gap-3">
				<AccessTokenForm handleSubmit={onContinueSetup} />
			</div>
		</div>
	</div>
</Panels>
