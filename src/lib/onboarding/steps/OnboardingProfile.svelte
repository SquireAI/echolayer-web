<script lang="ts">
	import { goto } from '$app/navigation';
	import NewOrgForm from '$lib/org/NewOrgForm.svelte';
	import { ORGS_STORE_NAME, USER_STORE_NAME } from '$lib/stores';
	import type {
		OrganizationsStore,
		Profile,
		SelectedOrganizationStore,
		UserStore
	} from '$lib/types';
	import { setOrgCookie } from '$lib/utils/cookies';
	import { ONBOARDING_ORG_PATH } from '$lib/utils/paths';
	import { getContext, onMount } from 'svelte';
	import OnboardingProfileForm from '../OnboardingProfileForm.svelte';

	export let data: any;
	let orgsStore: OrganizationsStore;
	orgsStore = getContext(ORGS_STORE_NAME) as OrganizationsStore;

	let userStore: UserStore;
	userStore = getContext(USER_STORE_NAME) as UserStore;
	const { createProfile } = data;

	async function onCreateProfile(profile: Profile): Promise<void> {
		const createdProfile = await createProfile(profile);
		if (createdProfile) {
			setTimeout(() => {
				goto(ONBOARDING_ORG_PATH);
			}, 300);
		}
	}
</script>

<div class="flex-1 flex flex-col items-center justify-center min-h-fit py-12">
	<div class="flex flex-col gap-6 w-96 items-center">
		<OnboardingProfileForm onSubmit={onCreateProfile} />
	</div>
</div>
