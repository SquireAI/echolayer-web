<script lang="ts">
	import { goto } from "$app/navigation";
	import NewOrgForm from "$lib/org/NewOrgForm.svelte";
	import SetupOrg from "$lib/svgs/SetupOrg.svg?component";
	import { getContext } from "svelte";
	import type { OrganizationStore, UserStore } from "$lib/types";
	import type { OrgNewPageData } from "./+page";
	import { DISCOVERY_HOME_PATH, ORGS_PATH } from "$lib/utils/paths";
	import { PUBLIC_DISCOVERY_ENABLED } from "$env/static/public";
	import { setOrgCookie } from "$lib/utils/cookies";
	import { ORG_STORE_NAME, USER_STORE_NAME } from "$lib/stores";

	/** @type {import('./$types').PageData} */
	export let data: OrgNewPageData;

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;
	const { createOrgHandler } = data;

	let orgStore: OrganizationStore;
	orgStore = getContext(ORG_STORE_NAME) as OrganizationStore;

	async function onCreateOrg(orgName: string): Promise<void> {
		const createdOrg = await createOrgHandler(orgName);
		orgStore.setOrganization(createdOrg);
		setOrgCookie(createdOrg.publicId);
		setTimeout(() => {
			if(PUBLIC_DISCOVERY_ENABLED) {
				goto(DISCOVERY_HOME_PATH);
			} else {
				goto(ORGS_PATH);
			}
		}, 300);
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