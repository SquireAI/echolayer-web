<script lang="ts">
	import { getContext } from "svelte";
	import { page } from '$app/stores';
	import type { OrganizationsStore, UserStore } from "$lib/types";
	import { ORGS_STORE_NAME, USER_STORE_NAME } from "$lib/stores";
	import Panels from "$lib/discovery/panels.svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
	import { goto } from "$app/navigation";
	import Button from "$lib/components/Button.svelte";
    import { setCookie } from 'typescript-cookie'
	import { ORGANIZATION_ID_COOKIE_NAME } from "$lib/constants";
	import { DISCOVERY_HOME_PATH } from "$lib/utils/paths";

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;
	orgsStore.setOrganizations($page.data.orgs);

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;
	userStore.setUser($page.data.user);

    $: hasOrgs = $orgsStore.entity !== undefined && $orgsStore.entity.length > 0;
    $: orgs = $orgsStore.entity;

    const handleSelect = async (publicId: string) => {
        setCookie(ORGANIZATION_ID_COOKIE_NAME, publicId, { expires: 7 });
        goto(DISCOVERY_HOME_PATH);
    }
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
                            <Button 
                                handleClick={() => handleSelect(org.publicId)}
                            >{org.name} -&gt;</Button>
                        </div>
                    {/each}
                {/if}
            {/if}
        </div>
    </div>
</Panels>