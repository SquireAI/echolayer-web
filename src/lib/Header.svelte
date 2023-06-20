<script lang="ts">
	import { getContext } from "svelte";
	import type { Organization, OrganizationStore, UserStore } from "./types";
	import EchoLayerNameBranding from "./EchoLayerNameBranding.svelte";
	import EchoLayerLogo from "./EchoLayerLogo.svelte";
	import LogoutButton from "./LogoutButton.svelte";
	import { createDefaultContext } from "$lib/http/context";
	import { AuthApi } from "./api/auth";
	import { SIGN_IN_PATH } from "./utils/paths";
	import { goto } from "$app/navigation";

	const userStore = getContext("user") as UserStore;
	const orgStore = getContext("org") as OrganizationStore;
	let userInitials: string;
	$: userInitials = $userStore.entity?.name.trim().split(" ").map((part) => part[0]).join("").toUpperCase() || "";

	let organization: Organization | undefined;
	$: organization = $orgStore.entity;

	async function logoutHandler(): Promise<void> {
		await new AuthApi(createDefaultContext()).logout();
		userStore.clear();
		await goto(SIGN_IN_PATH);
	}
</script>

<div class="w-full h-full flex justify-center">
	<div class="flex w-full sm:h-full items-center px-6">
		<div class={`flex items-center h-full ${!$userStore.entity ? "w-full justify-center" : ""}`}>
			<div class="flex shrink-0">
				<div class="hidden sm:hidden md:block h-6"><a href="/"><EchoLayerNameBranding /></a></div>
				<div class="block sm:block md:hidden h-6"><a href="/"><EchoLayerLogo /></a></div>
			</div>
		</div>
		{#if $userStore.entity !== undefined}
			<div class="flex items-center h-full mr-6 ml-auto sm:border-0 md:border-l border-neutral-300">
				<div class="ml-auto flex gap-x-4 pl-6 items-center">
					<div class="flex h-full items-center flex-row-reverse gap-x-3">
						<div class="flex items-center justify-center w-8 h-8 rounded-2xl bg-neutral-400 sm:hidden lg:flex">
							<span class="text-white">{userInitials}</span>
						</div>
						<div class="flex flex-col h-full items-end">
							<p class="font-medium leading-4">{$userStore.entity.name}</p>
							{#if organization}
								<p class="font-normal leading-4">{organization.name}</p>
							{/if}
						</div>
					</div>
					<LogoutButton logoutHandler={logoutHandler}/>
				</div>
			</div>
		{:else}
			<div></div>
		{/if}
	</div>
</div>
