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

<div class="flex flex-col items-center">
	<h2 class="font-medium text-2xl">API Keys</h2>
	<p class="text-neutral-400 text-center">
		You can use this section to generate API Keys to use our API. Learn how to use the EchoLayer API
		in our <a href={NOTION_GETTING_STARTED_DOCS} target="_blank" class="underline">documentation</a
		>.
	</p>
</div>
<div class="flex flex-col gap-3">
	<Button class="w-full" type="primary" handleClick={createAccessToken} disabled={isCreating}>
		Generate key for {$orgStore.entity?.name}
	</Button>
</div>
<div class="flex flex-col w-full gap-4">
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
