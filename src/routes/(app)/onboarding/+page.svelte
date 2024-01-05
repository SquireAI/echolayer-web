<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import OnboardingTimeline from '$lib/onboarding/OnboardingTimeline.svelte';

	let onboardingStep = 0;
</script>

<Panels>
	<Navigation slot="nav" />
	<div slot="content" class="h-full bg-neutral-100">
		<div class="border-b border-b-neutral-300 divide-y divide-neutral-300">
			<OnboardingHeader />
			<OnboardingTimeline />
		</div>
	</div>
</Panels>
