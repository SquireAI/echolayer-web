<script lang="ts">
	import { getContext } from "svelte";
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { OrganizationStore, UserStore } from "$lib/types";
	import { CREATE_ORG_PATH, ORGS_PATH, SIGN_IN_PATH } from "$lib/utils/paths";


	let userStore: UserStore;
	userStore = getContext("user") as UserStore;

	let orgStore: OrganizationStore;
	orgStore = getContext("org") as OrganizationStore;

	$: if (browser && !$userStore.loading && !$orgStore.loading) {
		if ($userStore.entity && !$orgStore.entity) {
			goto(CREATE_ORG_PATH);
		} else if ($userStore.entity && $orgStore.entity) {
			goto(ORGS_PATH);
		}
		if (!$userStore.entity) {
			goto(SIGN_IN_PATH);
		}
	}
</script>