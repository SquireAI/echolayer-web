<script lang="ts">
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import OnboardingTimeline from '$lib/onboarding/OnboardingTimeline.svelte';
	import OnboardingOrg from '$lib/onboarding/steps/OnboardingOrgNew.svelte';
	import OnboardingGithub from '$lib/onboarding/steps/OnboardingGithub.svelte';
	import CenterWrapper from '$lib/layouts/dark/CenterWrapper.svelte';
	import SwitchOrgButton from '$lib/onboarding/SwitchOrgButton.svelte';
	import OnboardingLogout from '$lib/onboarding/OnboardingLogout.svelte';
	import OnboardingComplete from '$lib/onboarding/steps/OnboardingComplete.svelte';
	import OnboardingProfile from '$lib/onboarding/steps/OnboardingProfile.svelte';
	import type { Profile } from '$lib/types';
	import { onMount } from 'svelte';

	export let data: any;
	let profile: Profile;

	const steps = [
		{
			slug: 'profile',
			component: OnboardingProfile,
			label: 'Update your profile',
			title: 'Update your profile',
			description: "Let's create a profile for you to get started."
		},
		{
			slug: 'org',
			component: OnboardingOrg,
			label: 'Create your organization',
			title: 'Create your organization',
			description: "Let's create your organization to invite all your team members."
		},
		{
			slug: 'github',
			component: OnboardingGithub,
			label: 'Install GitHub application',
			title: 'Install GitHub application on your organization',
			description:
				'Let’s start by installing our GitHub application to enable Squire AI in your pull requests.'
		},
		{
			slug: 'complete',
			component: OnboardingComplete,
			label: 'Complete',
			title: 'You’re all set!',
			description:
				"You’re all set! Let's get you started on using Squire AI directly in your pull requests."
		}
	];
	const currentStep = 0;
</script>

<div class="flex flex-col w-full items-center my-auto py-12">
	<CenterWrapper>
		<div class="flex flex-col">
			<div>
				<OnboardingHeader title={steps[0].title} description={steps[0].description} />
				<OnboardingTimeline {steps} {currentStep} />
			</div>

			<OnboardingProfile {data} />
		</div>
	</CenterWrapper>

	<div class="max-w-xl my-6 flex flex-row items-stretch gap-3">
		<div class="w-[210px]"><SwitchOrgButton /></div>
		<OnboardingLogout />
	</div>
</div>
