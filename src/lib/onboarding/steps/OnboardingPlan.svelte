<script lang="ts">
	import ArmFlexIcon from 'svelte-material-icons/ArmFlex.svelte';
	import OpenInNewIcon from 'svelte-material-icons/OpenInNew.svelte';
	import OnboardingButton from '../OnboardingButton.svelte';
	import type { Subscription } from '$lib/api/billing';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';

	export let data = $page.data;
	let checkoutStatus = $page.data.checkoutStatus;

	let loading = false;
	async function getPortalSession(): Promise<void> {
		loading = true;
		const portalSession = await data.createPortalSession();
		goto(portalSession);
	}
</script>

<div class="flex-1 flex flex-row justify-center items-center">
	<div class="flex flex-col gap-6 items-center max-w-md my-6">
		<span class="text-neutral-500"><ArmFlexIcon size="70" slot="icon" /></span>
		<h3 class="font-display font-normal">Your Plan: <span class="font-semibold">Pro Plan</span></h3>

		{#if checkoutStatus === 'change'}
			<p class="text-neutral-300">Your plan changes have been saved.</p>
		{/if}

		<OnboardingButton handleClick={getPortalSession}>
			{#if loading}
				<Loader size={20} /><span class="ml-2">Loading...</span>
			{:else}
				Manage Plan <OpenInNewIcon size="16" class="ml-2" />
			{/if}
		</OnboardingButton>
		<div class="max-w-sm text-center gap-6 flex flex-col text-neutral-300">
			<p>Squire will now automatically create summaries for you on your pull requests.</p>
			<p>
				If you'd like to find out more, check out our documentation or try the <span
					class="bg-neutral-900 text-xs font-semibold font-mono px-1 py-0.5 rounded text-echolayer-orange-50"
					>/squire help</span
				> command on a pull request.
			</p>
			<div class="flex flex-row justify-center gap-3 flex-wrap">
				<OnboardingButton href="docs.squire.ai?ref=plan-page" templates="transparent">
					Documentation <OpenInNewIcon size="16" class="ml-2" />
				</OnboardingButton>
				<OnboardingButton href="https://github.com" templates="transparent">
					Github <OpenInNewIcon size="16" class="ml-2" />
				</OnboardingButton>
			</div>
			<p class="text-neutral-400 text-sm italic">
				If you have any issues with your plan, or would like to make changes, feel free to send a
				message to <a class="font-semibold text-neutral-200" href="mailto:support@squire.ai"
					>support@squire.ai</a
				>
			</p>
		</div>
	</div>
</div>
