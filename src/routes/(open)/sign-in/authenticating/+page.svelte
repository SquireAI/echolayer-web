<script lang="ts">
	import { getContext } from "svelte";
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { OrganizationsStore, UserStore } from "$lib/types";
	import { CREATE_ORG_PATH, ORGS_INDEX_PATH } from "$lib/utils/paths";
	import { ORGS_STORE_NAME } from "$lib/stores/orgs-store";
	import { USER_STORE_NAME } from "$lib/stores";

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;
	orgsStore.setOrganizations($page.data.orgs);

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;
	userStore.setUser($page.data.user);

	$: if (browser) {
		if (!$orgsStore.loading && !$orgsStore.error) {
			if ($orgsStore.entity !== undefined && $orgsStore.entity.length > 0) {
				goto(ORGS_INDEX_PATH);
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
