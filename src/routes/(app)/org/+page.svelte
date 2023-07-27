<script lang="ts">
	import { getContext } from "svelte";
	import { page } from '$app/stores';
	import type { OrganizationsStore, UserStore } from "$lib/types";
	import { ORGS_STORE_NAME, USER_STORE_NAME } from "$lib/stores";
	import Panels from "$lib/discovery/panels.svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;
	orgsStore.setOrganizations($page.data.orgs);

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;
	userStore.setUser($page.data.user);

    $: hasOrgs = $orgsStore.entity !== undefined && $orgsStore.entity.length > 0;
    $: orgs = $orgsStore.entity;
</script>

<Panels>
    <Navigation slot="nav" />
    <div class="content" slot="content">
        <div>
            {#if $orgsStore.loading}
                <p>Loading...</p>
            {:else if $orgsStore.error }
                <p>Error...</p>
            {:else}
                {#if hasOrgs}
                    {#each (orgs || []) as org}
                        <div>
                            <a href="/org/{org.publicId}/discovery/home">{org.name} -&gt;</a>
                        </div>
                    {/each}
                {/if}
            {/if}
        </div>
    </div>
</Panels>