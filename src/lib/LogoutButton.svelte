<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from "./components/Button.svelte";
	import { clearStores } from "$lib/stores";
	import { AuthApi } from '$lib/api/auth';
	import { createDefaultContext } from './http/context';

	async function logout() {
		clearStores();
		await new AuthApi(createDefaultContext()).logout();
		await goto("/");
	}
</script>

<Button handleClick={logout}>Log out</Button>