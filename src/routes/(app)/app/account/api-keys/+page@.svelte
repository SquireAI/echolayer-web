<script lang="ts">
	import type { OrgNewPageData } from './+page';
	import type {
		AccessToken,
		CreatedAccessToken as CreatedAccessTokenType,
		OrgAndUserData,
		SelectedOrganizationStore
	} from '$lib/types';
	import { SELECTED_ORG_STORE_NAME } from '$lib/stores';
	import { getContext } from 'svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import { PUBLIC_DISCOVERY_ENABLED } from '$env/static/public';
	import DiscoveryLayout from '$lib/layouts/discovery/DiscoveryLayout.svelte';
	import AdminLayout from '$lib/layouts/admin/AdminLayout.svelte';
	import ApiKeysForm from '$lib/account/APIKeysForm.svelte';

	export let data: OrgNewPageData & OrgAndUserData;
	const { createAccessTokenHandler, deleteAccessTokenHandler, accessTokens } = data;
	const orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;
	if (data.org) {
		orgStore.setOrganization(data.org.publicId);
	}

	let createdAccessToken: CreatedAccessTokenType | undefined;
	$: createdAccessToken = undefined;

	let readOnlyAccessTokens: AccessToken[] = accessTokens;
	$: readOnlyAccessTokens;

	let hasTokens: boolean;
	$: hasTokens = createdAccessToken !== undefined || readOnlyAccessTokens.length > 0;

	let isCreating: boolean;
	$: isCreating = false;

	let isDeleting: boolean;
	$: isDeleting = false;

	let isErrorCreatingToken: boolean;
	$: isErrorCreatingToken = false;

	let isErrorDeletingToken: boolean;
	$: isErrorDeletingToken = false;

	function clearCreatedAccessToken() {
		if (!createdAccessToken) {
			return;
		}
		const { token: _token, ...rest } = createdAccessToken;
		readOnlyAccessTokens = [...readOnlyAccessTokens, rest];
		createdAccessToken = undefined;
	}

	async function createAccessToken() {
		isCreating = true;
		isErrorCreatingToken = false;
		clearCreatedAccessToken();
		try {
			const accessToken = await createAccessTokenHandler();
			createdAccessToken = accessToken;
		} catch (error) {
			isErrorCreatingToken = true;
		} finally {
			isCreating = false;
		}
	}

	async function deleteAccessToken(prefix: string) {
		isDeleting = true;
		isErrorDeletingToken = false;
		try {
			await deleteAccessTokenHandler(prefix);
			if (createdAccessToken?.prefix === prefix) {
				createdAccessToken = undefined;
			} else {
				const tokensToKeep = readOnlyAccessTokens.filter((token) => token.prefix !== prefix);
				readOnlyAccessTokens = [...tokensToKeep];
			}
		} catch (error) {
			isErrorDeletingToken = true;
		} finally {
			isDeleting = false;
		}
	}

	function sortDates(a: AccessToken, b: AccessToken): number {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	}

	let sortedAccessTokens: AccessToken[];
	$: sortedAccessTokens = readOnlyAccessTokens.sort(sortDates);
</script>

{#if PUBLIC_DISCOVERY_ENABLED === 'true'}
	<DiscoveryLayout>
		<Panels>
			<Navigation slot="nav" />
			<div class="flex content-center items-center flex-col h-full pt-9 px-9" slot="content">
				<ApiKeysForm
					{createAccessToken}
					{deleteAccessToken}
					{isCreating}
					{createdAccessToken}
					{isErrorCreatingToken}
					{sortedAccessTokens}
					{hasTokens}
				/>
			</div>
		</Panels>
	</DiscoveryLayout>
{:else}
	<AdminLayout>
		<div class="flex content-center items-center flex-col h-full pt-9">
			<ApiKeysForm
				{createAccessToken}
				{deleteAccessToken}
				{isCreating}
				{createdAccessToken}
				{isErrorCreatingToken}
				{sortedAccessTokens}
				{hasTokens}
			/>
		</div>
	</AdminLayout>
{/if}
