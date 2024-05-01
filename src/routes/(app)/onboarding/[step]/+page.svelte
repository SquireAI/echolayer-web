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
	import OnboardingComplete from '$lib/onboarding/steps/OnboardingComplete.svelte';
	import CenterWrapper from '$lib/layouts/dark/CenterWrapper.svelte';
	import SwitchOrgButton from '$lib/onboarding/SwitchOrgButton.svelte';
	import OnboardingLogout from '$lib/onboarding/OnboardingLogout.svelte';

	export let data: PageData & Handlers;

	let repositoryStore: RepositoryStore = getContext(REPOSITORY_STORE_NAME) as RepositoryStore;
	if (data.repositories) repositoryStore.setRepositories(data.repositories);

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

	const getCurrentStepBySlug = (slug: string) => {
		if (!slug) return 0;
		return steps.findIndex((step) => step.slug === slug);
	};

	$: currentStep = getCurrentStepBySlug($page.params.step) || 0;
</script>

<div class="flex flex-col w-full items-center my-auto py-12">
	<CenterWrapper>
		<div class="h-full flex flex-col">
			<div>
				<OnboardingHeader
					title={steps[currentStep].title}
					description={steps[currentStep].description}
				/>
				<OnboardingTimeline {steps} {currentStep} />
			</div>

			<svelte:component this={steps[currentStep].component} {data} />
		</div>
	</CenterWrapper>

	<div class="max-w-xl my-6 flex flex-row items-stretch gap-3">
		<div class="w-[210px]"><SwitchOrgButton /></div>
		<OnboardingLogout />
	</div>
</div>
