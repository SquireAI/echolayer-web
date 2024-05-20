<script lang="ts">
	import PartyPopperIcon from 'svelte-material-icons/PartyPopper.svelte';
	import OpenInNewIcon from 'svelte-material-icons/OpenInNew.svelte';
	import OnboardingButton from '../OnboardingButton.svelte';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';

	export let data: any;

	let loading = false;

	async function getCheckoutSession(): Promise<void> {
		loading = true;
		const checkoutSession = await data.createCheckoutSession();
		goto(checkoutSession);
	}
</script>

<div class="flex-1 flex flex-row justify-center items-center">
	<div class="flex flex-col gap-6 items-center max-w-md my-12">
		<span class="text-neutral-500"><PartyPopperIcon size="70" slot="icon" /></span>
		<h3 class="font-display font-normal">Fantastic! Let's start your Free Trial</h3>
		<div class="max-w-sm text-center gap-3 flex flex-col">
			<p class="mb-6">
				Let's head over to your repository on GitHub to start using Squire directly in your pull
				requests.
			</p>
			<div class="flex flex-row justify-center">
				<OnboardingButton handleClick={getCheckoutSession}>
					{#if loading}
						<Loader size={20} /><span class="ml-2">Loading...</span>
					{:else}
						Start your Free Trial <OpenInNewIcon size="16" class="ml-2" />
					{/if}
				</OnboardingButton>
			</div>
		</div>
	</div>
</div>
