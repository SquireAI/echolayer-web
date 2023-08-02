<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from "./components/Button.svelte";
	import { clearStores } from "$lib/stores";
	import { AuthApi } from '$lib/api/auth';
	import { createDefaultContext } from './http/context';
	import { INVALIDATED_SIGN_IN_PATH } from './utils/paths';
	import { removeOrgCookie } from './utils/cookies';

	async function logout() {
		clearStores();
		await new AuthApi(createDefaultContext()).logout();
		removeOrgCookie();
		await goto(INVALIDATED_SIGN_IN_PATH);
	}
</script>

<Button handleClick={logout}>Log out</Button>