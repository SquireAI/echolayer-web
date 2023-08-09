<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { getContext } from 'svelte';
	import CreatedAccessToken from './CreatedAccessToken.svelte';
	import DisabledKey from './DisabledKey.svelte';
	import ReadOnlyAccessToken from './ReadOnlyAccessToken.svelte';
	import { SELECTED_ORG_STORE_NAME } from '$lib/stores';
	import type {
		AccessToken,
		CreatedAccessToken as CreatedAccessTokenType,
		SelectedOrganizationStore
	} from '$lib/types';
	import { NOTION_GETTING_STARTED_DOCS } from '$lib/utils/paths';

	const orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	export let createAccessToken: () => Promise<void>;
	export let deleteAccessToken: (prefix: string) => Promise<void>;
	export let isCreating: boolean;
	export let createdAccessToken: CreatedAccessTokenType | undefined;
	export let isErrorCreatingToken: boolean;
	export let sortedAccessTokens: AccessToken[];
	export let hasTokens: boolean;
</script>

<div class="flex flex-col gap-y-6 items-center w-full">
	<h2>{$orgStore.entity?.name} Settings</h2>
	<div class="flex flex-col w-full">
		<div class="row flex flex-row items-center w-full pb-4 border-b border-neutral-700">
			<h3>Keys</h3>
			<Button class="self-end ml-auto" handleClick={createAccessToken} disabled={isCreating}
				>Generate a new key for {$orgStore.entity?.name}</Button
			>
		</div>
	</div>
	<div class="flex w-full">
		<div class="flex flex-col sm:w-full lg:w-2/3">
			<p>You can use this section to generate API Keys to use our API.</p>
			<p>
				Learn how to use the EchoLayer API in our <a
					href={`${NOTION_GETTING_STARTED_DOCS}`}
					target="_blank"
					class="underline">documentation.</a
				>
			</p>
		</div>
	</div>
	<div class="flex flex-col w-full">
		{#if createdAccessToken !== undefined}
			<CreatedAccessToken
				token={createdAccessToken}
				error={isErrorCreatingToken}
				deleteTokenHandler={deleteAccessToken}
			/>
		{/if}
		{#if sortedAccessTokens.length > 0}
			{#each sortedAccessTokens as token (token.prefix)}
				<ReadOnlyAccessToken {token} deleteTokenHandler={deleteAccessToken} />
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
