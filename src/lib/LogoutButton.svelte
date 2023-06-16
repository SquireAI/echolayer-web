<script lang="ts">
	import { getContext } from "svelte";
	import { goto } from '$app/navigation';
	import type { UserStore } from "./types";
	import Button from "./components/Button.svelte";

	const userStore = getContext("user") as UserStore;

	function logout() {
		userStore.clear();
		goto("/sign-in");
	}
</script>

<Button handleClick={logout}>Log out</Button>