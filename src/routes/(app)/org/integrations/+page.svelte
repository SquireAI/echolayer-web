<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Loader from '$lib/components/Loader.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import GitLabIntegrationListItem from '$lib/components/integrations/GitLabIntegrationListItem.svelte';
	import IntegrationListItem from '$lib/components/integrations/IntegrationListItem.svelte';
	import type { IntegrationInstallStatus, IntegrationStatus } from '$lib/types.js';
	import { INVALIDATE_QUERY_PARAMETER_NAME } from '$lib/utils/paths.js';
	import { onMount } from 'svelte';
	import Github from 'svelte-material-icons/Github.svelte';
	import Slack from 'svelte-material-icons/Slack.svelte';
	import type { IntegrationsPageHandlers } from './+page';
	import type { IntegrationsPageData } from './+page.server.js';

	export let data: IntegrationsPageData & IntegrationsPageHandlers;

	let slackUrl = '';
	let githubUrl = '';
	let githubInstallStatus: IntegrationInstallStatus;
	let gitlabStatus: IntegrationStatus;
	let isLoaded = false;

	onMount(async () => {
		slackUrl = await data.installSlackHandler();
		githubUrl = await data.installGithubAppHandler();
		githubInstallStatus = await data.checkGithubAppHandler();
		gitlabStatus = await data.checkGitlabHandler();

		if ($page.url.searchParams.get(INVALIDATE_QUERY_PARAMETER_NAME)) {
			invalidateAll();
		}
		isLoaded = true;
	});

	// Slack error
	$: isInstallError = false;

	const handleInstall = async (url: string) => {
		try {
			if (browser) {
				window.open(url, '_blank');
			}
		} catch {
			isInstallError = true;
		}
	};

	const handleUninstallGitlab = async () => {
		await data.uninstallGitlabHandler();
		gitlabStatus = await data.checkGitlabHandler();
	};
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col gap-6 w-[400px] mx-auto mt-16">
			<div class="flex flex-col items-center">
				<h2 class="font-medium text-2xl">Integrations</h2>
				<p class="text-neutral-400 text-center">
					Our integrations are easily available for you. Click below for our options.
				</p>
			</div>
			{#if isLoaded}
				<div class="flex flex-col gap-3">
					<IntegrationListItem
						label="Slack Notifications"
						handleInstall={() => handleInstall(slackUrl)}
					>
						<Slack size="24" slot="icon" />
					</IntegrationListItem>
					<IntegrationListItem
						label="GitHub"
						installStatus={githubInstallStatus}
						handleInstall={() => handleInstall(githubUrl)}
					>
						<Github size="24" slot="icon" />
					</IntegrationListItem>
					<!-- <GitLabIntegrationListItem status={gitlabStatus} {handleUninstallGitlab} /> -->
					{#if isInstallError}
						<p class="text-red-700 select-none mt-1">
							Something went wrong. Please try again later or <a
								href="mailto:support@echolayer.com"
								class="ext-blue-600 dark:text-blue-500 hover:underline">contact support</a
							>.
						</p>
					{/if}
				</div>
			{:else}
				<div class="flex items-center justify-center">
					<Loader size={40} />
				</div>
			{/if}
		</div>
	</div>
</Panels>
