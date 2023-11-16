<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { INVALIDATE_QUERY_PARAMETER_NAME } from '$lib/utils/paths';
	import { invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import Github from 'svelte-material-icons/Github.svelte';
	import IntegrationListItem from '$lib/integrations/IntegrationListItem.svelte';

	export let data;

	let githubUrl = '';
	let githubInstallStatus: string | undefined;
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

		if ($page.url.searchParams.get(INVALIDATE_QUERY_PARAMETER_NAME)) {
			invalidateAll();
		}
		isLoaded = true;
	});
</script>

<div class="flex-1 flex flex-row justify-center items-center">
	<div class="flex flex-col gap-6 items-center max-w-md">
		<span class="text-neutral-500"><Github size="70" slot="icon" /></span>
		<p>
			Follow the link below to install the app and select the repositories you'd like to analyze:
		</p>
		<div class="w-64">
			<IntegrationListItem
				class="block w-full"
				label="Install"
				installStatus={githubInstallStatus}
				handleInstall={() => handleInstall(githubUrl)}
			>
				<Github size="24" slot="icon" />
			</IntegrationListItem>
		</div>
	</div>
</div>
