<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import { INTEGRATIONS_PATH_WITH_INVALIDATE } from '$lib/utils/paths';
	import Celebration from '$lib/svgs/Celebration.svg?component';
	import PersonShield from '$lib/svgs/PersonShield.svg?component';

	const installState: 'success' | 'failure' | 'pending' = $page.url.searchParams.get(
		'installState'
	) as 'success' | 'failure' | 'pending';
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="flex flex-col gap-6 w-1/2 min-w-min mx-auto mt-16 items-center" slot="content">
		{#if installState === 'success'}
			<div class="flex flex-row justify-center items-center">
				<Celebration />
			</div>
			<h2>Successfully integrated!</h2>
			<p class="text-center">
				You’re all good to go — you can test out the integration now. Please contact support if
				there are any issues or if the integration is not working as intended.
			</p>
			<Button href={INTEGRATIONS_PATH_WITH_INVALIDATE}>Go back to integrations</Button>
		{:else if installState === 'pending'}
			<div class="flex flex-row justify-center items-center">
				<PersonShield />
			</div>
			<h2>Request sent!</h2>
			<p class="text-center">
				You’ve sent a request for the admin to install this integration. Please check the
				integrations page later to see if it has been installed, or contact your organization’s
				administrator for more details.
			</p>
			<Button href={INTEGRATIONS_PATH_WITH_INVALIDATE}>Go back to integrations</Button>
		{:else}
			<h2>Whoops, something went wrong</h2>
			<p class="text-red-700 select-none mt-1">
				Something went wrong. Please try again later or <a
					href="mailto:support@echolayer.com"
					class="ext-blue-600 dark:text-blue-500 hover:underline">contact support</a
				>.
			</p>
			<Button href={INTEGRATIONS_PATH_WITH_INVALIDATE}>Go back to integrations</Button>
		{/if}
	</div>
</Panels>
