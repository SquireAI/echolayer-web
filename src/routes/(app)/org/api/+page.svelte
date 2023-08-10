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

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col gap-6 w-[400px] mx-auto mt-16">
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
	</div>
</Panels>
