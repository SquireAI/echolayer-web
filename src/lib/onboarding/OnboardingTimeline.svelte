<script lang="ts">
	import OnboardingTimelineStep from '$lib/onboarding/OnboardingTimelineStep.svelte';

	export let currentStep = 0;
	export let steps = [
		{
			slug: 'profile',
			label: 'Update your profile',
			title: 'Update your profile',
			description: "Let's create a profile for you to get started."
		},
		{
			slug: 'org',
			label: 'Create your organization',
			title: 'Create your organization',
			description: "Let's create your organization to invite all your team members."
		},
		{
			slug: 'github',
			label: 'Install GitHub application',
			title: 'Install GitHub application on your organization',
			description:
				'Let’s start by installing our GitHub application to enable Squire AI in your pull requests.'
		},
		{
			slug: 'subscribe',
			label: 'Choose your plan',
			title: 'Select your plan',
			description:
				"You’re all set! Let's get you started on using Squire AI directly in your pull requests."
		}
	];

	const getStepType = (index: number, currentStep: number) => {
		if (index < currentStep) return 'done';
		else if (index === currentStep) return 'active';
		else return 'next';
	};
</script>

<div>
	<nav aria-label="Progress">
		<ol role="list" class="md:flex">
			{#each steps as step, i}
				<OnboardingTimelineStep type={getStepType(i, currentStep)} {step} stepIndex={i} />
			{/each}
		</ol>
	</nav>
</div>
