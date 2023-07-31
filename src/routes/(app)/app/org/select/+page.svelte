<script lang="ts">
	import { getContext } from "svelte";
	import type { OrganizationStore, OrganizationsStore } from "$lib/types";
	import { ORGS_STORE_NAME, ORG_STORE_NAME } from "$lib/stores";
	import Panels from "$lib/discovery/panels.svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
	import { afterNavigate, goto } from "$app/navigation";
	import Button from "$lib/components/Button.svelte";
	import { DISCOVERY_HOME_PATH, INVALIDATE_SELECTED_ORG, ORGS_PATH, ORGS_SELECT_PATH } from "$lib/utils/paths";
	import { removeOrgCookie, setOrgCookie } from "$lib/utils/cookies";
	import { PUBLIC_DISCOVERY_ENABLED } from "$env/static/public";
    import { base } from '$app/paths'
	import { page } from "$app/stores";
    import { onMount } from "svelte";

    onMount(() => {
        if($page.url.searchParams.has(INVALIDATE_SELECTED_ORG)) {
            removeOrgCookie();
        }
    });

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;

    let orgStore: OrganizationStore;
    orgStore = getContext(ORG_STORE_NAME) as OrganizationStore;

    $: hasOrgs = $orgsStore.entity !== undefined && $orgsStore.entity.length > 0;
    $: orgs = $orgsStore.entity;

    const handleSelect = async (publicId: string) => {
        setOrgCookie(publicId);
        const selectedOrg = $orgsStore.entity?.find((org) => org.publicId === publicId);
        selectedOrg && orgStore.setOrganization(selectedOrg);
        if(PUBLIC_DISCOVERY_ENABLED) {
            goto(DISCOVERY_HOME_PATH);
        } else {
            goto(ORGS_PATH);
        }
    }

    let previousPage: string = base;

    afterNavigate(({from}) => {
        if(from?.url.pathname.includes(ORGS_SELECT_PATH)) {
            previousPage = PUBLIC_DISCOVERY_ENABLED ? DISCOVERY_HOME_PATH : ORGS_PATH;
        } else {
            previousPage = from?.url.pathname || previousPage
        }
    }) 
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
            {#if $orgStore.entity && !$orgStore.loading}
                <Button handleClick={() => goto(previousPage)}>
                    Cancel
                </Button>
            {/if}
        </div>
    </div>
</Panels>