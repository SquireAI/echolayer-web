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
	<div class="flex flex-col gap-6 items-center my-12">
		<span class="text-neutral-500"><PartyPopperIcon size="70" slot="icon" /></span>
		<h3 class="font-display font-normal">
			Fantastic! Let's start your <span class="font-bold">7 day free trial</span>
		</h3>
		<div class="text-center gap-6 flex flex-col">
			<div class="flex flex-row justify-center gap-3">
				<div class="flex flex-1 justify-center rounded flex-col">
					<span class="text-4xl font-semibold">$20</span>
					<span class="text-md text-neutral-400">/user/month</span>
				</div>
			</div>
			<p class="text-neutral-300">
				Pricing is calculated based on the number of users in your GitHub organization. <span
					class="font-bold"
					>You will not be charged till the end of your trial.
				</span>
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
			<p class="text-neutral-400 text-sm italic">
				If you have any issues with your plan, or would like to make changes, feel free to send a
				message to <a class="font-semibold text-neutral-200" href="mailto:support@squire.ai"
					>support@squire.ai</a
				>
			</p>
		</div>
	</div>
</div>
