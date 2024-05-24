<script lang="ts">
	import { page } from '$app/stores';
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import OnboardingTimeline from '$lib/onboarding/OnboardingTimeline.svelte';
	import OnboardingOrg from '$lib/onboarding/steps/OnboardingOrgNew.svelte';
	import OnboardingGithub from '$lib/onboarding/steps/OnboardingGithub.svelte';
	import type { PageData } from './+page.server';
	import type { Handlers } from './+page';
	import type { RepositoryStore, SelectedOrganizationStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { REPOSITORY_STORE_NAME, SELECTED_ORG_STORE_NAME } from '$lib/stores';
	import OnboardingComplete from '$lib/onboarding/steps/OnboardingComplete.svelte';
	import CenterWrapper from '$lib/layouts/dark/CenterWrapper.svelte';
	import SwitchOrgButton from '$lib/onboarding/SwitchOrgButton.svelte';
	import OnboardingLogout from '$lib/onboarding/OnboardingLogout.svelte';
	import OnboardingProfile from '$lib/onboarding/steps/OnboardingProfile.svelte';

	export let data: PageData & Handlers;

	let orgStore: SelectedOrganizationStore;
	orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	let currentStep = 2;
</script>

<div class="flex flex-col w-full items-center my-auto py-12">
	<CenterWrapper>
		<div class="h-full flex flex-col">
			<div>
				<OnboardingHeader
					title="Install GitHub application on your organization"
					description="Let’s start by installing our GitHub application to enable Squire AI in your pull requests."
				/>
				<OnboardingTimeline {currentStep} />
			</div>

			<OnboardingGithub {data} />
		</div>
	</CenterWrapper>

	<div class="max-w-xl my-6 flex flex-row items-stretch gap-3">
		<div class="w-[210px]"><SwitchOrgButton /></div>
		<OnboardingLogout />
	</div>
</div>
