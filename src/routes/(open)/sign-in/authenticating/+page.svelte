<script lang="ts">
	import { getContext } from "svelte";
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { OrganizationStore, OrganizationsStore, UserStore } from "$lib/types";
	import { CREATE_ORG_PATH, DISCOVERY_HOME_PATH, ORGS_SELECT_PATH, ORGS_PATH } from "$lib/utils/paths";
	import { ORGS_STORE_NAME } from "$lib/stores/orgs-store";
	import { ORG_STORE_NAME, USER_STORE_NAME } from "$lib/stores";
	import { PUBLIC_DISCOVERY_ENABLED, PUBLIC_MULTI_ORG_ENABLED } from "$env/static/public";

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;
	orgsStore.setOrganizations($page.data.orgs);

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;
	userStore.setUser($page.data.user);

	let orgStore: OrganizationStore;
	orgStore = getContext(ORG_STORE_NAME) as OrganizationStore;
	orgStore.setOrganization($page.data.org);

	$: if (browser) {
		if (!$orgsStore.loading && !$orgsStore.error) {
			if ($orgsStore.entity !== undefined && $orgsStore.entity.length > 0) {
				if(PUBLIC_MULTI_ORG_ENABLED === "true" && PUBLIC_DISCOVERY_ENABLED === "true") {
					if($orgStore.entity !== undefined && $orgStore.entity.publicId !== undefined) {
						goto(DISCOVERY_HOME_PATH);
					} else {
						goto(ORGS_SELECT_PATH);
					}
				} else {
					if($orgStore.entity !== undefined && $orgStore.entity.publicId !== undefined) {
						// We don't allow the user to set a specific org, so just take the first one.
						orgStore.setOrganization($orgsStore.entity[0]);
					}
					goto(ORGS_PATH);
				}
			} else {
				goto(CREATE_ORG_PATH);
			}
		}
	}
</script>

{#if $orgsStore.loading}
	<p>Loading...</p>
{:else if $orgsStore.error }
	<p>Error...</p>
{/if}
