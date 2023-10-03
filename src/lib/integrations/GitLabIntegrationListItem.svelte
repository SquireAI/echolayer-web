<script lang="ts">
	import Gitlab from 'svelte-material-icons/Gitlab.svelte';
	import { GITLAB_SETUP_PATH } from '$lib/utils/paths';

	import IntegrationListItem from './IntegrationListItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { IntegrationStatus } from '$lib/types';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';

	export let status: IntegrationStatus;
	export let handleUninstallGitlab: () => Promise<void>;
	let isRemoveLoading = false;
	let attemptedRemove = false;
	const handleRemove = async () => {
		if (attemptedRemove) {
			isRemoveLoading = true;
			handleUninstallGitlab();
		} else {
			attemptedRemove = true;
		}
	};
</script>

<IntegrationListItem
	label="GitLab"
	installStatus={status.status}
	errors={status.errors}
	handleInstall={() => goto(`${GITLAB_SETUP_PATH}?step=token`)}
	disabled={!!status.status}
>
	<Gitlab size="24" slot="icon" />
	<div slot="footnote" class={`text-neutral-500 font-medium ${status.status ? '' : 'hidden'}`}>
		<Button
			type="link"
			class="text-echolayer-blue"
			disabled={isRemoveLoading}
			href={`${GITLAB_SETUP_PATH}?step=token`}>Edit group access token</Button
		> •
		<Button
			type="link"
			class="text-echolayer-blue"
			disabled={isRemoveLoading}
			href={`${GITLAB_SETUP_PATH}?step=webhook`}>New secret token</Button
		> •

		<Button type="link" class="text-echolayer-red" handleClick={handleRemove}>
			{#if isRemoveLoading}
				<Loader size={12} classes="text-neutral-800" />
			{:else if attemptedRemove}
				Confirm remove?
			{:else}
				Remove
			{/if}</Button
		>
	</div>
</IntegrationListItem>
