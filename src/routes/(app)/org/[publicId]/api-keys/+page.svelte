<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import DisabledKey from "$lib/account/DisabledKey.svelte";
	import CreatedAccessToken from "$lib/account/CreatedAccessToken.svelte";
	import ReadOnlyAccessTokens from "$lib/account/ReadOnlyAccessToken.svelte";

	import type { OrgNewPageData } from "./+page";
	import type { AccessToken, CreatedAccessToken as CreatedAccessTokenType, OrgAndUserData } from "$lib/types";
	import type { SpecificOrgLayoutServerLoad } from "../+layout.server";

	export let data: OrgNewPageData & OrgAndUserData & SpecificOrgLayoutServerLoad;
	const { createAccessTokenHandler, deleteAccessTokenHandler, accessTokens, org } = data;

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
		readOnlyAccessTokens = [...readOnlyAccessTokens, rest]
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

<div class="flex content-center items-center flex-col h-full pt-9">
	<div class="flex flex-col gap-y-6 items-center w-full">
		<h2>Settings</h2>
		<div class="flex flex-col w-full">
			<div class="row flex flex-row items-center w-full pb-4 border-b border-neutral-700">
				<h3>{org.name}'s Keys</h3>
				<Button class="self-end ml-auto" handleClick={createAccessToken} disabled={isCreating}>Generate a new key for {org.name}</Button>
			</div>
		</div>
		<div class="flex w-full">
			<div class="flex flex-col sm:w-full lg:w-2/3">
				<p>You can use this section to generate API Keys to use our API.</p>
				<p>Learn how to use the EchoLayer API in our <a href="https://www.echolayer.com" class="underline">documentation.</a></p>
			</div>
		</div>
		<div class="flex flex-col w-full">
			{#if createdAccessToken !== undefined}
				<CreatedAccessToken token={createdAccessToken} error={isErrorCreatingToken} deleteTokenHandler={deleteAccessToken} />
			{/if}
			{#if sortedAccessTokens.length > 0}
				{#each sortedAccessTokens as token (token.prefix)}
					<ReadOnlyAccessTokens token={token} deleteTokenHandler={deleteAccessToken} />
				{/each}
			{/if}
			{#if !hasTokens}
				<div class="flex justify-center p-6 my-6 gap-x-2 items-center">
					<DisabledKey class="h-4" />
					<p class="text-neutral-500">You do not have any access tokens.</p>
				</div>
			{/if}
		</div>
	</div>
</div>