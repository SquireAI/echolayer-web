<script lang="ts">
	import type { Handlers } from './+page';
	import OnboardingHeader from '$lib/onboarding/OnboardingHeader.svelte';
	import OnboardingTimeline from '$lib/onboarding/OnboardingTimeline.svelte';
	import OnboardingOrgNew from '$lib/onboarding/steps/OnboardingOrgNew.svelte';
	import OnboardingGithub from '$lib/onboarding/steps/OnboardingGithub.svelte';
	import CenterWrapper from '$lib/layouts/dark/CenterWrapper.svelte';
	import SwitchOrgButton from '$lib/onboarding/SwitchOrgButton.svelte';
	import OnboardingLogout from '$lib/onboarding/OnboardingLogout.svelte';
	import OnboardingComplete from '$lib/onboarding/steps/OnboardingComplete.svelte';
	import OnboardingProfile from '$lib/onboarding/steps/OnboardingProfile.svelte';
	import OnboardingOrgSelect from '$lib/onboarding/steps/OnboardingOrgSelect.svelte';
	import type { OrganizationsStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { ORGS_STORE_NAME } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { ONBOARDING_GITHUB_PATH } from '$lib/utils/paths';

	export let data: Handlers;

	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;

	$: hasOrgs = $orgsStore.entity !== undefined && $orgsStore.entity.length > 0;
	$: orgs = $orgsStore.entity;

	const currentStep = 1;
</script>

<div class="flex flex-col w-full items-center my-auto py-12">
	<CenterWrapper>
		<div class="flex flex-col">
			<div>
				<OnboardingHeader
					title={'Setup your organization'}
					description={"Let's create your organization to invite all your team members"}
				/>
				<OnboardingTimeline {currentStep} />
			</div>

			{#if hasOrgs}
				<div class="pt-6">
					<OnboardingOrgSelect {data} onSelect={() => goto(ONBOARDING_GITHUB_PATH)} />
				</div>
			{:else}
				<OnboardingOrgNew {data} />
			{/if}
		</div>
	</CenterWrapper>

	<div class="max-w-xl my-6 flex flex-row items-stretch gap-3">
		<div class="w-[210px]"><SwitchOrgButton /></div>
		<OnboardingLogout />
	</div>
</div>
