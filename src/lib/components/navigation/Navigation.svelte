<script lang="ts">
	import { getContext } from 'svelte';
	import type { Organization, SelectedOrganizationStore, UserStore } from '$lib/types';
	import NavigationItem from './NavigationItem.svelte';
	import HomeIcon from 'svelte-material-icons/Home.svelte';
	import HomeOutlineIcon from 'svelte-material-icons/HomeOutline.svelte';
	import PlusCircleOutlineIcon from 'svelte-material-icons/PlusCircleOutline.svelte';
	import KeyIcon from 'svelte-material-icons/Key.svelte';
	import KeyOutlineIcon from 'svelte-material-icons/KeyOutline.svelte';
	import BugIcon from 'svelte-material-icons/Bug.svelte';
	import BugOutlineIcon from 'svelte-material-icons/BugOutline.svelte';
	import {
		API_KEYS_PATH,
		HOME_PATH,
		INVALIDATED_SIGN_IN_PATH,
		NOTION_GETTING_STARTED_DOCS,
		SUPPORT_URL,
		INTEGRATIONS_PATH,
		REPOSITORIES_PATH,
		COMPONENTS_PATH,
		TEAMS_PATH,
		MEMBERS_PATH,
		ISSUES_PATH
	} from '$lib/utils/paths';
	import { SELECTED_ORG_STORE_NAME, USER_STORE_NAME } from '$lib/stores';
	import { clearStores } from '$lib/stores';
	import { AuthApi } from '$lib/api/auth';
	import { createDefaultContext } from '$lib/http/context';
	import { goto } from '$app/navigation';
	import LogoutIcon from 'svelte-material-icons/Logout.svelte';
	import { removeOrgCookie } from '$lib/utils/cookies';
	import SwitchOrgButton from './SwitchOrgButton.svelte';
	import { modalStore } from '$lib/stores/modal';
	import OrganizationInvites from '../modal/OrganizationInvites.svelte';
	import EchoLayerLogo from '$lib/EchoLayerLogo.svelte';
	import FileDocumentIcon from 'svelte-material-icons/FileDocument.svelte';
	import FileDocumentOutlineIcon from 'svelte-material-icons/FileDocumentOutline.svelte';
	import SourceRepositoryMultipleIcon from 'svelte-material-icons/SourceRepositoryMultiple.svelte';
	import ConnectionIcon from 'svelte-material-icons/Connection.svelte';
	import AccountGroupIcon from 'svelte-material-icons/AccountGroup.svelte';
	import AccountGroupOutlineIcon from 'svelte-material-icons/AccountGroupOutline.svelte';
	import AccountIcon from 'svelte-material-icons/Account.svelte';
	import AccountOutlineIcon from 'svelte-material-icons/AccountOutline.svelte';
	import ShapeIcon from 'svelte-material-icons/Shape.svelte';
	import ShapeOutlineIcon from 'svelte-material-icons/ShapeOutline.svelte';
	import AvatarPlaceholder from '$lib/components/users/AvatarPlaceholder.svelte';

	const userStore = getContext(USER_STORE_NAME) as UserStore;
	const orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	let organization: Organization | undefined;
	$: organization = $orgStore?.entity;

	async function logout() {
		clearStores();
		await new AuthApi(createDefaultContext()).logout();
		removeOrgCookie();
		await goto(INVALIDATED_SIGN_IN_PATH);
	}

	const modalRegistry = {
		organizationInvites: {
			title: 'Organization invites',
			component: OrganizationInvites
		}
	};
</script>

<div class="h-full flex flex-col justify-between bg-neutral-25 divide-neutral-300">
	<!-- Logo -->
	<div class="flex flex-row items-center px-5 pb-3 pt-5">
		<EchoLayerLogo />
	</div>

	<!-- User -->
	<div class="flex items-center flex-row gap-x-3 px-4 py-3">
		<AvatarPlaceholder name={$userStore?.entity?.name} />
		<div class="flex-1 flex flex-col items-start font-medium">
			<small class="text-xs text-neutral-500">Hey!</small>
			<p class="text-xs leading-5 text-neutral-800">{$userStore?.entity?.name}</p>
		</div>
		<button
			class="hover:text-neutral-500 text-neutral-300 cursor-pointer"
			on:click={() => logout()}
		>
			<LogoutIcon width={20} height={20} />
		</button>
	</div>

	<!-- Object -->
	<div class="flex flex-col w-full gap-2 p-3">
		<NavigationItem
			name="Get Started"
			href={`${HOME_PATH}`}
			OutlineIcon={HomeOutlineIcon}
			SolidIcon={HomeIcon}
			disabled={!organization}
		/>
		<!-- <NavigationItem
			name="Issues"
			href={`${ISSUES_PATH}`}
			OutlineIcon={BugOutlineIcon}
			SolidIcon={BugIcon}
			disabled={!organization}
		/> -->
		<NavigationItem
			name="Repositories"
			href={`${REPOSITORIES_PATH}`}
			OutlineIcon={SourceRepositoryMultipleIcon}
			SolidIcon={SourceRepositoryMultipleIcon}
			disabled={!organization}
		/>
		<NavigationItem
			name="Teams"
			href={`${TEAMS_PATH}`}
			OutlineIcon={AccountGroupOutlineIcon}
			SolidIcon={AccountGroupIcon}
			disabled={!organization}
		/>
		<NavigationItem
			name="Members"
			href={`${MEMBERS_PATH}`}
			OutlineIcon={AccountOutlineIcon}
			SolidIcon={AccountIcon}
			disabled={!organization}
		/>
		<NavigationItem
			name="API keys"
			href={`${API_KEYS_PATH}`}
			OutlineIcon={KeyOutlineIcon}
			SolidIcon={KeyIcon}
			disabled={!organization}
		/>
		<NavigationItem
			name="Integrations"
			href={`${INTEGRATIONS_PATH}`}
			OutlineIcon={ConnectionIcon}
			SolidIcon={ConnectionIcon}
			disabled={!organization}
		/>
		<!-- <NavigationItem
			name="Add people"
			onClick={() => modalStore.trigger(modalRegistry.organizationInvites)}
			OutlineIcon={PlusCircleOutlineIcon}
			SolidIcon={PlusCircleOutlineIcon}
			disabled={!organization}
		/> -->
		<NavigationItem
			name="Documentation"
			onClick={() => window.open(NOTION_GETTING_STARTED_DOCS, '_blank')}
			OutlineIcon={FileDocumentOutlineIcon}
			SolidIcon={FileDocumentIcon}
			disabled={!organization}
		/>
	</div>

	<!-- Spacer -->
	<div class="flex-1" />

	<!-- User Navigation -->
	<div class="flex flex-col p-3 gap-2 border-t border-neutral-200">
		<SwitchOrgButton />
	</div>
</div>
