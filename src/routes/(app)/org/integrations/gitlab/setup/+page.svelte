<script lang="ts">
	import { goto } from '$app/navigation';
	import NewOrgForm from '$lib/org/NewOrgForm.svelte';
	import { getContext, onMount } from 'svelte';
	import type {
		SelectedOrganizationStore,
		OrganizationsStore,
		UserStore,
		IntegrationStatus
	} from '$lib/types';
	import { GITLAB_SETUP_PATH, HOME_PATH, INTEGRATIONS_PATH } from '$lib/utils/paths';
	import { setOrgCookie } from '$lib/utils/cookies';
	import { ORGS_STORE_NAME, SELECTED_ORG_STORE_NAME, USER_STORE_NAME } from '$lib/stores';
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Gitlab from 'svelte-material-icons/Gitlab.svelte';
	import Webhook from 'svelte-material-icons/Webhook.svelte';
	import AccessTokenForm from '$lib/integrations/AccessTokenForm.svelte';
	import type { GitlabIntegrationsPageData } from './+page.server';
	import type { GitlabIntegrationsPageHandlers } from './+page';
	import { page } from '$app/stores';
	import CopyToken from '$lib/account/CopyToken.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data: GitlabIntegrationsPageData & GitlabIntegrationsPageHandlers;
	let secretToken: string;
	let status: IntegrationStatus;
	let isLoaded = false;

	let checklistCompleted = false;

	$: $page.url, handleUrlChange();

	async function handleUrlChange(): Promise<void> {
		if ($page.url.searchParams.get('step') === 'webhook') {
			secretToken = await data.getGitlabSecretTokenHandler();
		}
	}

	onMount(async () => {
		status = await data.checkGitlabHandler();
		isLoaded = true;
	});

	async function onContinueSetup(accessToken: string): Promise<void> {
		if (status.status) {
			// It's already installed. Just update the token.
			await data.updateGitlabAccessTokenHandler(accessToken);
			goto(INTEGRATIONS_PATH);
		} else {
			await data.installGitlabHandler(accessToken);
			goto(`${GITLAB_SETUP_PATH}?step=webhook`);
		}
	}
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		{#if isLoaded}
			{#if data.step === 'token'}
				<div class="flex flex-col gap-6 w-[600px] mx-auto mt-64">
					<div class="flex flex-col items-center">
						<Gitlab size="36" />
						<h2 class="font-medium text-2xl mt-8">Please enter your Group Access Token.</h2>
						<p class="text-neutral-500 text-center">
							In order to connect to GitLab, you will need to enter a Group Access Token and set up
							a webhook with our API. To start, enter your token below.
						</p>
					</div>
					<div class="flex flex-col gap-3">
						<AccessTokenForm handleSubmit={onContinueSetup} />
					</div>
				</div>
			{:else}
				<div class="flex flex-col gap-12 w-[600px] mx-auto mt-64">
					<div class="flex flex-col items-center gap-1">
						<Webhook size="36" class="text-neutral-300" />
						<h2 class="font-medium text-2xl mt-8">Insert secret token into webhook</h2>
						<p class="text-neutral-500 text-center">
							Please create a GitLab webhook using the provided secret token below to allow
							synchronization with members and entities. Click here to learn more.
						</p>
						<p class="text-neutral-500 text-center mt-4">
							This is a required step to keep your GitLab data on EchoLayer in-sync.
						</p>
					</div>
					<div
						class="flex items-center justify-start w-full lg:gap-x-4 rounded-md px-4 py-2 bg-echolayer-green-100/20"
					>
						<Webhook size="32" />
						<div class="flex w-full border border-neutral-300 h-8">
							<div class="w-16">
								<CopyToken token={secretToken} />
							</div>
							<input
								type="text"
								value={secretToken}
								class="border-0 px-2 text-sm w-full font-mono leading-9"
								readOnly
							/>
						</div>
					</div>
					<div class="w-full flex flex-col gap-3">
						<div class="flex flex-row gap-2 justify-center items-center text-neutral-500">
							<input
								id="webhook-check"
								bind:checked={checklistCompleted}
								type="checkbox"
								class="w-4 h-4"
							/>
							<label for="webhook-check">I have set up the webhook.</label>
						</div>
						<Button
							class="w-full"
							disabled={!checklistCompleted}
							handleClick={() => goto(INTEGRATIONS_PATH)}
						>
							Finish setup process
						</Button>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</Panels>
