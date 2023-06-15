<script lang="ts">
	import { getContext } from "svelte";
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { OrganizationStore } from "../../../types";

	let orgStore: OrganizationStore;
	orgStore = getContext("org") as OrganizationStore;
	orgStore.setOrganization($page.data.org);
	$: if (browser) {
		if (!$orgStore.loading && !$orgStore.error) {
			if ($orgStore.entity !== undefined) {
				goto("/org/details");
			} else {
				goto("/org/");
			}
		}
	}
</script>

{#if $orgStore.loading}
	<p>Loading...</p>
{:else if $orgStore.error }
	<p>Error...</p>
{/if}