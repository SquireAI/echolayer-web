<script lang="ts">
	import { goto } from "$app/navigation";
	import NewOrgForm from "$lib/org/NewOrgForm.svelte";
	import SetupOrg from "$lib/svgs/SetupOrg.svg?component";
	import { getContext } from "svelte";
	import type { OrganizationStore, UserStore } from "../../../types";
	import type { OrgNewPageData } from "./+page";
	import type { OrgNewPageServerData } from "./+page.server";

	/** @type {import('./$types').PageData} */  
	export let data: OrgNewPageData & OrgNewPageServerData;

	let userStore: UserStore;
	userStore = getContext("user") as UserStore;
	const { user, createOrgHandler } = data;

	if (user) {
		userStore.setUser(user);
	}

	let orgStore: OrganizationStore;
	orgStore = getContext("org") as OrganizationStore;
	
	async function onCreateOrg(orgName: string): Promise<void> {
		try {
			const createdOrg = await createOrgHandler(orgName);
			orgStore.setOrganization(createdOrg);
			setTimeout(() => {
				goto("/org/")
			}, 300);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="flex content-center justify-center items-center flex-col h-full">
	<div class="flex flex-col gap-y-12 items-center w-96">
		<SetupOrg />
		<div class="flex flex-col gap-y-6 items-center text-center">
			<span class="text-3xl text-neutral-900">Set up new organization</span>
			<span class="text-neutral-500">Let’s get started with EchoLayer! Please enter your organization’s name below.</span>
		</div>
		<NewOrgForm handleSubmit={onCreateOrg} />
	</div>
</div>