<script lang="ts">
	import PartyPopperIcon from 'svelte-material-icons/PartyPopper.svelte';
	import Button from '$lib/components/Button.svelte';
	import OpenInNewIcon from 'svelte-material-icons/OpenInNew.svelte';
</script>

<div class="flex-1 flex flex-row justify-center items-center">
	<div class="flex flex-col gap-6 items-center max-w-md mt-6 mb-16">
		<span class="text-neutral-500"><PartyPopperIcon size="70" slot="icon" /></span>
		<h3>Fantastic! You're ready!</h3>
		<div class="max-w-sm w-full text-center gap-3 flex flex-col">
			<p class="mb-6">
				Let's head over to your repository on GitHub to start using the EchoLayer assistant directly
				in your pull requests.
			</p>
			<Button type="secondary" href="https://github.com" target="_blank" class="w-full">
				Open GitHub
				<OpenInNewIcon size="16" class="ml-2" />
			</Button>
		</div>
	</div>
</div>
