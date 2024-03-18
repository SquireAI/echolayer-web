<script>
	import { goto } from '$app/navigation';
	import { AuthApi } from '$lib/api/auth';
	import { createDefaultContext } from '$lib/http/context';
	import { clearStores } from '$lib/stores';
	import { removeOrgCookie } from '$lib/utils/cookies';
	import { SIGN_IN_PATH } from '$lib/utils/paths';
	import OnboardingButton from './OnboardingButton.svelte';

	async function logout() {
		clearStores();
		await new AuthApi(createDefaultContext()).logout();
		removeOrgCookie();
		await goto(SIGN_IN_PATH);
	}
</script>

<OnboardingButton templates="transparent borderless" class="h-9" handleClick={logout}>
	Logout
</OnboardingButton>
