<script lang="ts">
	import type { CreatedAccessToken } from '$lib/types';
	import GeneratedKey from './GeneratedKey.svelte';

	export let token: CreatedAccessToken;
	export let deleteTokenHandler: (prefix: string) => Promise<void>;
	export let error = false;
</script>

{#if error}
	<div class="flex justify-center p-6 my-6 bg-red-400">
		<p>There was an error when generating a new API key. Please try again.</p>
	</div>
{:else if token}
	<div class="flex flex-col w-full">
		<div class="flex justify-center p-6 mb-3 border bg-blue-200 border-blue-300">
			<p>Make sure to copy your new key address now. You won’t be able to see it again.</p>
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
