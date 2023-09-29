<script lang="ts">
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Slack from 'svelte-material-icons/Slack.svelte';
	import Github from 'svelte-material-icons/Github.svelte';
	import Gitlab from 'svelte-material-icons/Gitlab.svelte';
	import { browser } from '$app/environment';
	import type { IntegrationsPageData } from './+page.server.js';
	import type { IntegrationsPageHandlers } from './+page';
	import { onMount } from 'svelte';
	import IntegrationListItem from '$lib/integrations/IntegrationListItem.svelte';
	import { page } from '$app/stores';
	import {
		GITLAB_SETUP_PATH,
		INTEGRATIONS_PATH,
		INVALIDATE_QUERY_PARAMETER_NAME
	} from '$lib/utils/paths.js';
	import { goto, invalidateAll } from '$app/navigation';
	import type { IntegrationInstallStatus, IntegrationStatus } from '$lib/types.js';
	import Button from '$lib/components/Button.svelte';

	export let data: IntegrationsPageData & IntegrationsPageHandlers;

	let slackUrl = '';
	let githubUrl = '';
	let githubInstallStatus: IntegrationInstallStatus;
	let gitlabStatus: IntegrationStatus = {};

	onMount(async () => {
		slackUrl = await data.installSlackHandler();
		githubUrl = await data.installGithubAppHandler();
		githubInstallStatus = await data.checkGithubAppHandler();
		gitlabStatus = await data.checkGitlabHandler();

		if ($page.url.searchParams.get(INVALIDATE_QUERY_PARAMETER_NAME)) {
			invalidateAll();
		}
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
		<div class="flex flex-col gap-6 w-[600px] mx-auto mt-16">
			<div class="flex flex-col items-center">
				<h2 class="font-medium text-2xl">Integrations</h2>
				<p class="text-neutral-400 text-center">
					Our integrations are easily available for you. Click below for our options.
				</p>
			</div>
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
				<IntegrationListItem
					label="GitLab"
					installStatus={gitlabStatus.status}
					errors={gitlabStatus.errors}
					handleInstall={() => goto(`${GITLAB_SETUP_PATH}?step=token`)}
				>
					<Gitlab size="24" slot="icon" />
					<div
						slot="footnote"
						class={`text-neutral-500 font-medium ${gitlabStatus.status ? '' : 'hidden'}`}
					>
						<Button
							type="link"
							class="text-echolayer-blue"
							href={`${GITLAB_SETUP_PATH}?step=webhook`}>New secret token</Button
						> •
						<Button type="link" class="text-echolayer-blue" href={`${GITLAB_SETUP_PATH}?step=token`}
							>Edit group access token</Button
						> •
						<Button type="link" class="text-echolayer-red" handleClick={handleUninstallGitlab}
							>Remove</Button
						>
					</div>
				</IntegrationListItem>
				{#if isInstallError}
					<p class="text-red-700 select-none mt-1">
						Something went wrong. Please try again later or <a
							href="mailto:support@echolayer.com"
							class="ext-blue-600 dark:text-blue-500 hover:underline">contact support</a
						>.
					</p>
				{/if}
			</div>
		</div>
	</div>
</Panels>
