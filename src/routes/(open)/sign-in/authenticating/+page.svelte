<script lang="ts">
	import { getContext } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type {
		SelectedOrganizationStore,
		OrganizationsStore,
		UserStore,
		UserInvitationStore
	} from '$lib/types';
	import { HOME_PATH, ORGS_SELECT_PATH, ONBOARDING_PATH } from '$lib/utils/paths';
	import { ORGS_STORE_NAME } from '$lib/stores/orgs-store';
	import {
		SELECTED_ORG_STORE_NAME,
		USER_INVITATION_STORE_NAME,
		USER_STORE_NAME
	} from '$lib/stores';
	import { setOrgCookie } from '$lib/utils/cookies';

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;

	let orgStore: SelectedOrganizationStore;
	orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	let userInvitationStore: UserInvitationStore;
	userInvitationStore = getContext(USER_INVITATION_STORE_NAME) as UserInvitationStore;

	$: if (browser) {
		if (
			!$orgsStore.loading &&
			!$orgsStore.error &&
			!$userInvitationStore.loading &&
			!$userInvitationStore.error
		) {
			if (
				($orgsStore.entity !== undefined && $orgsStore.entity.length > 0) ||
				($userInvitationStore.entity !== undefined && $userInvitationStore.entity.length > 0)
			) {
				if ($orgStore.entity !== undefined && $orgStore.entity.publicId !== undefined) {
					goto(ONBOARDING_PATH);
				} else {
					goto(ORGS_SELECT_PATH);
				}
			} else {
				goto(ONBOARDING_PATH);
			}
		}
	}
</script>

{#if $orgsStore.loading}
	<p>Loading...</p>
{:else if $orgsStore.error}
	<p>Error...</p>
{/if}
