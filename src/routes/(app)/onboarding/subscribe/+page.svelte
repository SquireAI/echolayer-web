<script lang="ts">
	import { page } from '$app/stores';
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import OnboardingTimeline from '$lib/onboarding/OnboardingTimeline.svelte';
	import OnboardingOrg from '$lib/onboarding/steps/OnboardingOrg.svelte';
	import OnboardingGithub from '$lib/onboarding/steps/OnboardingGithub.svelte';
	import type { PageData } from './+page.server';
	import type { Handlers } from './+page';
	import type { RepositoryStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { REPOSITORY_STORE_NAME } from '$lib/stores';
	import CenterWrapper from '$lib/layouts/dark/CenterWrapper.svelte';
	import SwitchOrgButton from '$lib/onboarding/SwitchOrgButton.svelte';
	import OnboardingLogout from '$lib/onboarding/OnboardingLogout.svelte';
	import OnboardingSubscribe from '$lib/onboarding/steps/OnboardingSubscribe.svelte';

	export let data: PageData & Handlers;
	const currentStep = 3;
</script>

<div class="flex flex-col w-full items-center my-auto py-12">
	<CenterWrapper>
		<div class="h-full flex flex-col">
			<div>
				<OnboardingHeader
					title="Select your plan"
					description="You’re all set! Let's get you started on using Squire AI directly in your pull requests."
				/>
				<OnboardingTimeline {currentStep} />
			</div>

			<OnboardingSubscribe {data} />
		</div>
	</CenterWrapper>

	<div class="max-w-xl my-6 flex flex-row items-stretch gap-3">
		<div class="w-[210px]"><SwitchOrgButton /></div>
		<OnboardingLogout />
	</div>
</div>
