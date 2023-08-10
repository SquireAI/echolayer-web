<script lang="ts">
	import type { AccessToken } from '$lib/types';
	import GeneratedKey from './GeneratedKey.svelte';

	export let token: AccessToken;
	export let deleteTokenHandler: (prefix: string) => Promise<void>;
</script>

<GeneratedKey prefix={token.prefix} createdDate={token.createdAt} {deleteTokenHandler} />
