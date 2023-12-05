<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import OnboardingTimeline from '$lib/onboarding/OnboardingTimeline.svelte';
	import OnboardingOrg from '$lib/onboarding/steps/OnboardingOrg.svelte';
	import OnboardingGithub from '$lib/onboarding/steps/OnboardingGithub.svelte';
	import OnboardingRepos from '$lib/onboarding/steps/OnboardingRepos.svelte';
	import OnboardingTry from '$lib/onboarding/steps/OnboardingTry.svelte';
	import type { PageData } from './+page.server';
	import type { Handlers } from './+page';

	export let data: PageData & Handlers;

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
			description: 'Let’s start by installing our GitHub application to analyze your repositories.'
		},
		{
			slug: 'repos',
			component: OnboardingRepos,
			label: 'Hang tight',
			title: 'EchoLayer is now analyzing your repositories',
			description:
				'We’re currently analyzing your contribution history. Once your repositories have been analyzed you can see more details in the list below.'
		},
		{
			slug: 'try',
			component: OnboardingTry,
			label: 'Try it out',
			title: 'We’re ready to get started!',
			description:
				'EchoLayer has analyzed your history and is ready to get you the help you need. Get started by requesting a calculated expert from a file path in your repository. '
		}
	];

	const getCurrentStepBySlug = (slug: string) => {
		if (!slug) return 0;
		return steps.findIndex((step) => step.slug === slug);
	};

	$: currentStep = getCurrentStepBySlug($page.params.step) || 0;
</script>

<Panels>
	<Navigation slot="nav" />
	<div slot="content" class="h-full bg-neutral-100 flex flex-col">
		<div class="border-b border-b-neutral-300 divide-y divide-neutral-300">
			<OnboardingHeader
				title={steps[currentStep].title}
				description={steps[currentStep].description}
			/>
			<OnboardingTimeline {steps} {currentStep} />
		</div>

		<svelte:component this={steps[currentStep].component} {data} />
	</div>
</Panels>
