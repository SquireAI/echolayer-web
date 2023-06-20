<script lang="ts">
	import { getContext } from "svelte";
	import { goto } from '$app/navigation';
	import type { UserStore } from "./types";
	import Button from "./components/Button.svelte";

	const userStore = getContext("user") as UserStore;

	export let logoutHandler: () => Promise<void>;
</script>

<Button handleClick={logoutHandler}>Log out</Button>