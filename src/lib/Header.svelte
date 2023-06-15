<script lang="ts">
	import { getContext } from "svelte";
	import type { UserStore } from "../types";
	import EchoLayerNameBranding from "./EchoLayerNameBranding.svelte";
	import EchoLayerLogo from "./EchoLayerLogo.svelte";
	const userStore = getContext("user") as UserStore;
	let userInitials: string;
	$: userInitials = $userStore.name.trim().split(" ").map((part) => part[0]).join("").toUpperCase();
</script>

<!-- <div class="flex h-full items-center px-4 border-b">
	<div class="flex">EchoLayer</div>
	<div class="flex ml-auto">{$userStore.name || ""}</div>
</div> -->

<div class="w-full h-full flex justify-center">
	<div class="flex w-full sm:h-full items-center">
		<div class={`flex items-center h-full ml-6 ${!$userStore ? "w-full justify-center" : ""}`}>
			<div class="flex shrink-0">
				<div class="hidden sm:hidden md:block h-6"><a href="/"><EchoLayerNameBranding /></a></div>
				<div class="block sm:block md:hidden h-6"><a href="/"><EchoLayerLogo /></a></div>
			</div>
		</div>
		{#if $userStore !== undefined}
			<div class="flex items-center h-full mr-6 ml-auto sm:border-0 md:border-l border-neutral-300">
				<div class="ml-auto flex gap-x-4 pl-6 items-center">
					<div class="flex h-full items-center flex-row-reverse gap-x-3">
						<div class="flex items-center justify-center w-8 h-8 rounded-2xl bg-neutral-400 sm:hidden lg:flex">
							<span class="text-white">{userInitials}</span>
						</div>
						<div class="flex flex-col h-full items-end">
							<p class="font-medium leading-4">{$userStore.name}</p>
							<p class="font-normal leading-4">{"Foo Org"}</p>
						</div>
					</div>
					<!-- <LogoutButton logout={logout} /> -->
				</div>
			</div>
		{:else}
			<div></div>
		{/if}
	</div>
</div>
