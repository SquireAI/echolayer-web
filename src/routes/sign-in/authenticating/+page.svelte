<script lang="ts">
	import { getContext } from "svelte";
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { OrganizationStore, UserStore } from "../../../lib/types";
	import { CREATE_ORG_PATH, ORGS_PATH } from "$lib/utils/paths";

	let orgStore: OrganizationStore;
	orgStore = getContext("org") as OrganizationStore;
	orgStore.setOrganization($page.data.org);

	let userStore: UserStore;
	userStore = getContext("user") as UserStore;
	userStore.setUser($page.data.user);

	$: if (browser) {
		if (!$orgStore.loading && !$orgStore.error) {
			if ($orgStore.entity !== undefined) {
				goto(ORGS_PATH);
			} else {
				goto(CREATE_ORG_PATH);
			}
		}
	}
</script>

<svelte:head>
	<title>Signing-In | EchoLayer</title>
</svelte:head>

{#if $orgStore.loading}
	<p>Loading...</p>
{:else if $orgStore.error }
	<p>Error...</p>
{/if}
