<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { INVALIDATE_QUERY_PARAMETER_NAME, ONBOARDING_PATH } from '$lib/utils/paths';
	import { goto, invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import Github from 'svelte-material-icons/Github.svelte';
	import IntegrationListItem from '$lib/components/integrations/IntegrationListItem.svelte';
	import type { IntegrationInstallStatus } from '$lib/types';
	import OnboardingIntegrationItem from '../OnboardingIntegrationItem.svelte';

	export let data: any;

	let githubUrl = '';
	let githubInstallStatus: IntegrationInstallStatus;
	let isLoaded = false;
	let isInstallError = false;

	const handleInstall = async (url: string) => {
		try {
			if (browser) {
				window.open(url, '_blank');
			}
		} catch {
			isInstallError = true;
		}
	};

	onMount(async () => {
		githubUrl = await data.installGithubAppHandler();
		githubInstallStatus = await data.checkGithubAppHandler();
		// if (githubInstallStatus === 'connected') goto(`${ONBOARDING_PATH}/complete`);

		if ($page.url.searchParams.get(INVALIDATE_QUERY_PARAMETER_NAME)) {
			invalidateAll();
		}
		isLoaded = true;
	});
</script>

<div class="flex-1 flex flex-row justify-center items-center py-12">
	<div class="flex flex-col gap-6 items-center max-w-sm text-center">
		<span class="text-neutral-500"><Github size="70" slot="icon" /></span>
		<p>
			Follow the link below to install the app and select the repositories you'd like to analyze:
		</p>
		<div class="w-64">
			<OnboardingIntegrationItem
				class="block w-full"
				label="Install"
				installStatus={githubInstallStatus}
				handleInstall={() => handleInstall(githubUrl)}
			>
				<Github size="24" slot="icon" />
			</OnboardingIntegrationItem>
		</div>
	</div>
</div>
