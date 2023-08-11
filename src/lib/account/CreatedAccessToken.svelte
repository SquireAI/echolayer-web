<script lang="ts">
	import type { CreatedAccessToken } from '$lib/types';
	import GeneratedKey from './GeneratedKey.svelte';
	import Alert from 'svelte-material-icons/Alert.svelte';

	export let token: CreatedAccessToken;
	export let deleteTokenHandler: (prefix: string) => Promise<void>;
	export let error = false;
</script>

{#if error}
	<div class="flex justify-center p-1 my-1 bg-red-400">
		<p>There was an error when generating a new API key. Please try again.</p>
	</div>
{:else if token}
	<div class="flex flex-col w-full">
		<div
			class="flex flex-row justify-center px-1 py-2 mb-3 border-l-4 gap-2 rounded-md border-echolayer-orange-500 bg-echolayer-orange-50/20 text-echolayer-orange-900"
		>
			<Alert size="32" />
			<span class="text-sm"
				>Make sure to copy your new key address now. You won't be able to see it again after you
				leave this page.</span
			>
		</div>
		<GeneratedKey
			isNew={true}
			token={token.token}
			prefix={token.prefix}
			createdDate={token.createdAt}
			{deleteTokenHandler}
		/>
	</div>
{/if}
