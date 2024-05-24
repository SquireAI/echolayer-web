<script lang="ts">
	import ArmFlexIcon from 'svelte-material-icons/ArmFlex.svelte';
	import OpenInNewIcon from 'svelte-material-icons/OpenInNew.svelte';
	import OnboardingButton from '../OnboardingButton.svelte';
	import type { Subscription } from '$lib/api/billing';

	let loading = false;
</script>

<div class="flex-1 flex flex-row justify-center items-center">
	<div class="flex flex-col gap-6 items-center max-w-md my-12">
		<span class="text-neutral-500"><ArmFlexIcon size="70" slot="icon" /></span>
		<h3 class="font-display font-normal">Your Plan: <span class="font-semibold">Pro Plan</span></h3>
		<div class="max-w-sm text-center gap-3 flex flex-col text-neutral-300">
			<p>Squire will now automatically create summaries for you on your pull requests.</p>
			<p>
				If you'd like to find out more, check out our documentation or try the <span
					class="bg-neutral-900 text-xs font-semibold font-mono px-1 py-0.5 rounded text-echolayer-orange-50"
					>/squire help</span
				> command on a pull request.
			</p>
			<div class="flex flex-row justify-center gap-5 flex-wrap mt-8">
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
