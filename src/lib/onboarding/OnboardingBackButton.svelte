<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import OnboardingButton from './OnboardingButton.svelte';

	// Back button
	let previousPage: string = base;
	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<div class="w-full" on:click={() => goto(previousPage)} role="presentation">
	<slot>
		<OnboardingButton class="w-full flex-1" templates="transparent">Go Back</OnboardingButton>
	</slot>
</div>
