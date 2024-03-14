<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import OnboardingTimeline from '$lib/onboarding/OnboardingTimeline.svelte';
	import OnboardingOrg from '$lib/onboarding/steps/OnboardingOrg.svelte';
	import OnboardingGithub from '$lib/onboarding/steps/OnboardingGithub.svelte';
	import OnboardingRepos from '$lib/onboarding/steps/OnboardingRepos.svelte';
	import OnboardingTry from '$lib/onboarding/steps/OnboardingTry.svelte';
	import type { Handlers } from './+page';
	import CenterWrapper from '$lib/layouts/dark/CenterWrapper.svelte';
	import SwitchOrgButton from '$lib/onboarding/SwitchOrgButton.svelte';
	import OnboardingButton from '$lib/onboarding/OnboardingButton.svelte';
	import OnboardingLogout from '$lib/onboarding/OnboardingLogout.svelte';

	export let data: Handlers;

	const steps = [
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
				'Let’s start by installing our GitHub application to enable the EchoLayer assistant in your pull requests.'
		},
		// {
		// 	slug: 'repos',
		// 	component: OnboardingRepos,
		// 	label: 'Hang tight',
		// 	title: 'EchoLayer is now analyzing your repositories',
		// 	description:
		// 		'We’re currently analyzing your contribution history. Once your repositories have been analyzed you can see more details in the list below.'
		// },
		// {
		// 	slug: 'try',
		// 	component: OnboardingTry,
		// 	label: 'Try it out',
		// 	title: 'We’re ready to get started!',
		// 	description:
		// 		'EchoLayer has analyzed your history and is ready to get you the help you need. Get started by requesting a calculated expert from a file path in your repository. '
		// },
		{
			slug: 'complete',
			component: OnboardingOrg,
			label: 'Complete',
			title: 'You’re all set!',
			description:
				"You’re all set! Let's get you started on using the EchoLayer assistant directly in your pull requests."
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

			<OnboardingOrg {data} />
		</div>
	</CenterWrapper>

	<div class="max-w-xl my-6 flex flex-row items-stretch gap-3">
		<div class="w-[210px]"><SwitchOrgButton /></div>
		<OnboardingLogout />
	</div>
</div>
