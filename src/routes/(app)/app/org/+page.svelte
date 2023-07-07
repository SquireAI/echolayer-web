<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import WorldWideWeb from "$lib/svgs/WorldWideWeb.svg?component";
	import OpenNewTab from "$lib/svgs/OpenNewTab.svg?component";
	import GroupsIcon from "$lib/svgs/GroupsIcon.svg?component";
	import DataIcon from "$lib/svgs/DataIcon.svg?component";
	import WarningAmberIcon from "$lib/svgs/WarningAmberIcon.svg?component";
	import WhiteCheckIcon from "$lib/svgs/WhiteCheckIcon.svg?component";
	import type { ComponentEntity, Issue, OrgAndUserData, Organization } from "$lib/types";
	import { API_KEYS_PATH } from "$lib/utils/paths";

	/** @type {import('./$types').PageData} */  
	export let data: OrgAndUserData;

	let hasIssues: boolean;
	$: hasIssues = false;

	let organization: Organization;
	$: organization = data.org;


	let components: ComponentEntity[] = [];
	let issues: Issue[] = [];
</script>

<div class="flex content-center items-center flex-col h-full pt-9">
	<div class="flex flex-col lg:flex-row gap-y-6 w-full h-full lg:divide-x-2 lg:divide-y-0 divide-y-2 text-neutral-900">
		<div class="flex flex-col lg:w-1/4 w-full">
			<span class="text-neutral-700 text-xs uppercase">Joined {new Date(organization.createdAt).getFullYear()}</span>
			<span class="text-3xl text-inherit">{organization.name}</span>
		</div>
		<div class="flex flex-col lg:w-3/4 lg:pl-4 lg:pt-0 gap-16 w-full pt-4">
			<div class="flex flex-col">
				<span class="text-xl text-inherit">Links</span>
				<div class="flex md:flex-row flex-col md:my-9 my-6">
					<div class="md:w-1/2 md:pr-2 md:pb-0 w-full pb-2">
						<Button type="special" href={API_KEYS_PATH} full class="items-center justify-between">
							<div class="flex flex-row items-center justify-start gap-2">
								<WorldWideWeb />
								<span class="text-lg text-inherit">API Keys</span>
							</div>
						</Button>
					</div>
					<div class="md:w-1/2 md:pl-2 md:pt-0 w-full pt-2">
						<Button type="special" href="https://codexbuild.notion.site/Getting-Started-with-EchoLayer-45a7d6384b56477b9d25862a6c7398d7?pvs=4" target="_blank" full class="items-center justify-between">
							<div class="flex flex-row items-center justify-start gap-2">
								<WorldWideWeb />
								<span class="text-lg text-inherit">Documentation</span>
							</div>
							<OpenNewTab />
						</Button>
					</div>
				</div>
				<div class="flex flex-col gap-1">
					<p class="text-inherit uppercase text-xs">Need Support?</p>
					<p><span class="text-neutral-500">Contact us at </span><a href="mailto:support@echolayer.com" class="underline text-echolayer-blue">support@echolayer.com</a><span class="text-neutral-500"> on email or Slack for assistance in any issues you may be facing.</span></p>
				</div>
			</div>
			<div class="flex flex-col gap-9">
				<span class="text-xl text-inherit">Details</span>
				<div class="flex flex-col">
					<div class="grid grid-cols-2 gap-y-1">
						<div class="border-l-4 border-neutral-300 pl-3 py-1 flex flex-row items-center gap-1 text-inherit">
							<GroupsIcon />
							Members
						</div>
						<div class="py-1 pr-3 text-inherit md:text-start text-end">
							{organization.members.length}
						</div>
						<div class="border-l-4 border-neutral-300 pl-3 py-1 flex flex-row items-center gap-1 text-inherit">
							<DataIcon />
							Components
						</div>
						<div class="py-1 pr-3 text-inherit md:text-start text-end">
							{components.length}
						</div>
						<div class={`border-l-4 ${hasIssues ? "border-echolayer-yellow bg-echolayer-yellow/25": "border-green-700 bg-green-700/25" } pl-3 py-1 flex flex-row items-center gap-1 text-inherit`}>
							{#if hasIssues}
								<WarningAmberIcon />
							{:else}
								<WhiteCheckIcon />
							{/if}
							Issues
						</div>
						<div class={`${hasIssues ? "bg-echolayer-yellow/25": "bg-green-700/25" } py-1 pr-3 text-inherit md:text-start text-end`}>
							{issues.length} issue{ issues.length === 1 ? "" : "s"} marked
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>