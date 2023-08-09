<script lang="ts">
	import Panels from "$lib/discovery/panels.svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
	import Slack from "svelte-material-icons/Slack.svelte";
	import {browser} from "$app/environment";
	import type {IntegrationsPageData} from "./+page.server.js";
	import type {IntegrationsPageHandlers} from "./+page";
	import SelectListItem from "$lib/components/list/SelectListItem.svelte";

	export let data: IntegrationsPageData & IntegrationsPageHandlers;

	// Slack error
	$: isSlackInstallationError = false;

	const installSlack = async () => {
		try {
			const url = await data.installSlackHandler();
			if (browser) {
				window.open(url, "_blank");
			}
		} catch {
			isSlackInstallationError = true;
		}

	}
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col gap-6 w-96 mx-auto mt-16">
			<div class="flex flex-col items-center">
				<h2 class="font-medium text-2xl">Integrations</h2>
				<p class="text-neutral-400 text-center">Our integrations are easily available for you. Click below for our options.</p>
			</div>
			<div class="flex flex-col gap-3">
				<SelectListItem label="Slack Notifications" handleClick={installSlack}>
					<Slack size=24 slot="icon" />
				</SelectListItem>
				{#if isSlackInstallationError}
					<p class="text-red-700 select-none mt-1">Something went wrong. Please try again later or <a href="mailto:support@echolayer.com" class="ext-blue-600 dark:text-blue-500 hover:underline">contact support</a>.</p>
				{/if}
			</div>
		</div>
	</div>
</Panels>
	

