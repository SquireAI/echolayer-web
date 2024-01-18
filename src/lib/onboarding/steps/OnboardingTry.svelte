<script lang="ts">
	import PartyPopper from 'svelte-material-icons/PartyPopper.svelte';
	import FindPathForm from '$lib/components/context/FindPathForm.svelte';
</script>

<div class="flex-1 flex flex-row justify-center items-center">
	<div class="flex flex-col gap-6 items-center max-w-md mt-6 mb-16">
		<span class="text-neutral-500"><PartyPopper size="70" slot="icon" /></span>
		<h3>Find the expert by file path.</h3>
		<div class="max-w-sm w-full text-center gap-3 flex flex-col">
			<p>
				Enter a file or folder path from within one of the repositories you've synced to see who we
				found as your expert.
			</p>
			<FindPathForm />
		</div>
	</div>
</div>
