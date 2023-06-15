<script lang="ts">
	import { getContext } from "svelte";
	import type { UserStore } from "../types";
	const userStore: UserStore = getContext("user") as UserStore;

	let userName = "";
	$: userName = $userStore.name;
	function changeName(): void {
		userStore.update(user => ({ ...user, name: userName }))
	}

	function onInputChange(e: Event & { currentTarget: EventTarget & HTMLInputElement }): void {
		userName = (e.target as HTMLInputElement).value;
	}
</script>

<div>
	<p>Your current username:</p>
	<p>{$userStore.name}</p>
	<div class="my-4 flex flex-col items-start gap-y-4 p-4 border">
		<div class="flex gap-x-4">
			<label for="change-name">User name:</label>
			<input id="change-name" class="border w-52" type="text" value={userName} on:input={onInputChange} />
		</div>
		<button class="border rounded-md px-4 py-2" on:click={changeName}>Change name</button>
	</div>
</div>