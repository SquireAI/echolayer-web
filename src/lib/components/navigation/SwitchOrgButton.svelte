<script lang="ts">
	import { page } from "$app/stores";
	import OrgIcon from "$lib/org/OrgIcon.svelte";
	import { ORG_STORE_NAME } from "$lib/stores";
	import type { OrganizationStore } from "$lib/types";
	import { ORGS_SELECT_PATH } from "$lib/utils/paths";
	import { getContext } from "svelte";
    import Switch from "svelte-material-icons/Cached.svelte";

    const orgStore = getContext(ORG_STORE_NAME) as OrganizationStore;

    $: organization = $orgStore.entity;

    $: isActive = $page.url.pathname === ORGS_SELECT_PATH;
</script>

<a href={`${ORGS_SELECT_PATH}`}>
    <span class={`
        flex flex-row justify-between items-center px-1 rounded-md
        ${isActive ? "bg-echolayer-lightBlue-100 text-echolayer-blue-200 hover:bg-echolayer-lightBlue-100" : "hover:cursor-pointer hover:bg-gray-200"}
    `}>
        <span class="flex flex-row gap-2 items-center py-1">
            {#if organization}
                <OrgIcon text={organization.publicId} />
                <p class="font-medium leading-5">
                    {organization.name}
                </p>
            {:else}
                <span class="block p-4 bg-neutral-400 rounded-md" />
                <p class="font-medium leading-5">
                    Select organization...
                </p>
            {/if}
        </span>
        <Switch height="24" width="24" class={`
            ${isActive ? "text-echolayer-blue-200" : "text-neutral-400"}`} 
        />
    </span>
</a>