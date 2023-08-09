<script lang="ts">
	import { getContext } from 'svelte';
	import type { SelectedOrganizationStore, OrganizationsStore, UserStore } from '$lib/types';
	import { ORGS_STORE_NAME, SELECTED_ORG_STORE_NAME, USER_STORE_NAME } from '$lib/stores';
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import {
		CREATE_ORG_PATH,
		DISCOVERY_HOME_PATH,
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
	import { browser } from '$app/environment';

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

	$: hasOrgs = $orgsStore.entity !== undefined && $orgsStore.entity.length > 0;
	$: orgs = $orgsStore.entity;

	const handleSelect = async (publicId: string) => {
		setOrgCookie(publicId);
		const selectedOrg = $orgsStore.entity?.find((org) => org.publicId === publicId);
		selectedOrg && orgStore.setOrganization(publicId);
		if (PUBLIC_DISCOVERY_ENABLED) {
			goto(DISCOVERY_HOME_PATH);
		} else {
			goto(ORGS_PATH);
		}
	};

	let previousPage: string = base;

	afterNavigate(({ from }) => {
		if (from?.url.pathname.includes(ORGS_SELECT_PATH)) {
			previousPage = PUBLIC_DISCOVERY_ENABLED ? DISCOVERY_HOME_PATH : ORGS_PATH;
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
			{/if}
		</div>
	</div>
</Panels>
