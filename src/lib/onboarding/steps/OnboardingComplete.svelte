<script lang="ts">
	import PartyPopperIcon from 'svelte-material-icons/PartyPopper.svelte';
	import Button from '$lib/components/Button.svelte';
	import OpenInNewIcon from 'svelte-material-icons/OpenInNew.svelte';
	import OnboardingButton from '../OnboardingButton.svelte';
</script>

<div class="flex-1 flex flex-row justify-center items-center">
	<div class="flex flex-col gap-6 items-center max-w-md my-12">
		<span class="text-neutral-500"><PartyPopperIcon size="70" slot="icon" /></span>
		<h3 class="font-display font-normal">Fantastic! You're ready!</h3>
		<div class="max-w-sm text-center gap-3 flex flex-col">
			<p class="mb-6">
				Let's head over to your repository on GitHub to start using Squire directly in your pull
				requests.
			</p>
			<div class="flex flex-row justify-center">
				<OnboardingButton templates="transparent" href="https://github.com" target="_blank">
					Open GitHub
					<OpenInNewIcon size="16" class="ml-2" />
				</OnboardingButton>
			</div>
		</div>
	</div>
</div>
