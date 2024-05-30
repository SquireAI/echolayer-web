<script lang="ts">
	import { page } from '$app/stores';
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import OnboardingTimeline from '$lib/onboarding/OnboardingTimeline.svelte';
	import type { PageData, Handlers } from './+page';
	import type { SelectedOrganizationStore } from '$lib/types';
	import { getContext, onMount } from 'svelte';
	import { SELECTED_ORG_STORE_NAME } from '$lib/stores';
	import CenterWrapper from '$lib/layouts/dark/CenterWrapper.svelte';
	import SwitchOrgButton from '$lib/onboarding/SwitchOrgButton.svelte';
	import OnboardingLogout from '$lib/onboarding/OnboardingLogout.svelte';
	import OnboardingSubscribe from '$lib/onboarding/steps/OnboardingSubscribe.svelte';
	import type { Subscription } from '$lib/api/billing';
	import OnboardingPlan from '$lib/onboarding/steps/OnboardingPlan.svelte';

	export let data: PageData & Handlers;

	let orgStore: SelectedOrganizationStore;
	orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	let subscription: Subscription | null;
	let isActive: boolean;
	$: isActive = !!subscription;

	onMount(async () => {
		subscription = await data.checkActiveSubscription();
	});

	const currentStep = 3;
</script>

<div class="flex flex-col w-full items-center my-auto py-12">
	<CenterWrapper>
		<div class="h-full flex flex-col">
			{#if isActive}
				<div>
					<OnboardingHeader
						title="Your installation is ready!"
						description="You’re all set! Let's get you started on using Squire AI directly in your pull requests."
					/>
				</div>

				<OnboardingPlan {data} {subscription} />
			{:else}
				<div>
					<OnboardingHeader
						title="Select your plan"
						description="Last step! Choose a plan that suits your needs."
					/>
					<OnboardingTimeline {currentStep} />
				</div>

				<OnboardingSubscribe {data} />
			{/if}
		</div></CenterWrapper
	>

	<div class="max-w-xl my-6 flex flex-row items-stretch gap-3">
		<div class="w-[210px]"><SwitchOrgButton /></div>
		<OnboardingLogout />
	</div>
</div>
