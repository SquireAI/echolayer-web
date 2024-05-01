<script lang="ts">
	import OnboardingTimelineStep from '$lib/onboarding/OnboardingTimelineStep.svelte';

	export let currentStep = 0;
	export let steps = [];

	const getStepType = (index: number, currentStep: number) => {
		if (index < currentStep) return 'done';
		else if (index === currentStep) return 'active';
		else return 'next';
	};
</script>

<div>
	<nav aria-label="Progress">
		<ol
			role="list"
			class="divide-x divide-neutral-700 rounded-md md:flex border border-neutral-700"
		>
			{#each steps as step, i}
				<OnboardingTimelineStep type={getStepType(i, currentStep)} {step} stepIndex={i} />
			{/each}
		</ol>
	</nav>
</div>
