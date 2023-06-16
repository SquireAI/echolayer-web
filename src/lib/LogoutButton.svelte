<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from "./components/Button.svelte";
	import { clearStores } from "$lib/stores";
	import { logout as logoutFn } from '$lib/api/auth';

	async function logout() {
		clearStores();
		await logoutFn();
		await goto("/");
	}
</script>

<Button handleClick={logout}>Log out</Button>