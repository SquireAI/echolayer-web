<script lang="ts">
    import {getContext} from 'svelte';
    import type {Organization, OrganizationStore, UserStore} from '$lib/types';
    import NavigationItem from './NavigationItem.svelte';
    import Home from 'svelte-material-icons/Home.svelte';
    import HomeOutline from 'svelte-material-icons/HomeOutline.svelte';
    import Cog from 'svelte-material-icons/Cog.svelte';
    import CogOutline from 'svelte-material-icons/CogOutline.svelte';
    import Button from '../Button.svelte';
    import HelpCircle from 'svelte-material-icons/HelpCircle.svelte';
    import OpenInNew from 'svelte-material-icons/OpenInNew.svelte';
    import LogoutIcon from 'svelte-material-icons/Logout.svelte';
    import {API_KEYS_PATH, DISCOVERY_HOME_PATH, INVALIDATED_SIGN_IN_PATH, NOTION_GETTING_STARTED_DOCS, SUPPORT_URL} from '$lib/utils/paths';
	import { clearStores } from '$lib/stores';
	import { AuthApi } from '$lib/api/auth';
	import { createDefaultContext } from '$lib/http/context';
	import { goto } from '$app/navigation';

    const userStore = getContext('user') as UserStore;
    const orgStore = getContext('org') as OrganizationStore;
    let userInitials: string;
    $: userInitials =
        $userStore?.entity?.name
            .trim()
            .split(' ')
            .map((part) => part[0])
            .join('')
            .toUpperCase() || '';

    let organization: Organization | undefined;
    $: organization = $orgStore?.entity;


	async function logout() {
		clearStores();
		await new AuthApi(createDefaultContext()).logout();
		await goto(INVALIDATED_SIGN_IN_PATH);
	}

</script>

<div class="h-full flex flex-col justify-between bg-neutral-25">
    <div class="p-3 flex flex-col gap-4 border-b border-solid border-neutral-200">
        {#if $userStore.entity}
            <div class="flex items-center flex-row gap-x-3 px-3">
                <div class="flex items-center justify-center w-8 h-8 rounded-2xl bg-neutral-400 sm:hidden lg:flex">
                    <span class="text-white">{userInitials}</span>
                </div>
                <div class="flex flex-col items-start">
                    <p class="font-medium leading-5 text-neutral-800">{$userStore.entity?.name}</p>
                    {#if organization}
                        <p class="font-medium leading-4 text-sm text-neutral-400">{organization.name}</p>
                    {/if}
                </div>
            </div>
        {/if}
        <div>
            <div class="flex flex-col w-full gap-2">
                <NavigationItem name="Home" href={DISCOVERY_HOME_PATH} OutlineIcon={HomeOutline} SolidIcon={Home}/>
                <NavigationItem name="Settings" href={API_KEYS_PATH} OutlineIcon={CogOutline} SolidIcon={Cog} reload/>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center justify-end p-3 gap-2">
        <Button full={true} type="grey" href={SUPPORT_URL} target="_blank">
            <div class="flex gap-2 justify-start items-center w-full leading-4 font-medium">
                <HelpCircle width={20} height={20} class={'text-echolayer-blue'}/>
                Support
            </div>
        </Button>
        <Button
                full={true}
                type="grey"
                href={NOTION_GETTING_STARTED_DOCS}
                target="_blank"
        >
            <div class="flex gap-2 justify-start items-center w-full leading-4 font-medium">
                <OpenInNew width={20} height={20} class={'text-echolayer-blue'}/>
                Documentation
            </div>
        </Button>
        <Button full={true} type="grey" handleClick={logout}>
            <div class="flex gap-2 justify-start items-center w-full leading-4 font-medium">
                <LogoutIcon width={20} height={20} class={'text-echolayer-blue'}/>
                Logout
            </div>
        </Button>
    </div>
</div>
