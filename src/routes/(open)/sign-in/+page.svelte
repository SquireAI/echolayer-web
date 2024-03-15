<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import DarkLayout from '$lib/layouts/dark/DarkLayout.svelte';
	import OnboardingButton from '$lib/onboarding/OnboardingButton.svelte';
	import Github from 'svelte-material-icons/Github.svelte';
	import LogoIcon from '$lib/svgs/EchoLayerIconWhite.svg?component';

	const handleLogin = async (provider: string) => {
		const url = await $page.data.loginHandler(provider);
		if (browser) {
			window.open(url, '_self');
		}
	};
</script>

<DarkLayout>
	<div class="flex justify-center items-center flex-col w-full">
		<div class="flex flex-col gap-y-6 items-center">
			<div class="flex flex-col items-center gap-4">
				<LogoIcon class="w-10 h-10" />
				<h2 class="text-stone-200 font-semibold">Log in</h2>
				<p class="text-stone-300 leading-9 text-center">Please login or sign up below</p>
			</div>
			<div class="w-full flex flex-col gap-3">
				<OnboardingButton handleClick={() => handleLogin('github')} templates="light highlight">
					<div class="flex items-center gap-x-2 h-6">
						<Github class="w-6 h-6" />
						Login with GitHub
					</div>
				</OnboardingButton>
			</div>
			<p class="text-stone-500 max-w-md text-center px-4">
				By logging in, you acknowledge that you have read, understood, and agree to EchoLayer’s <a
					class="text-stone-50 font-semibold"
					href="https://echolayer.ai/terms-of-service"
					target="_blank">Terms of Service</a
				>
				and
				<a
					class="text-stone-50 font-semibold"
					href="https://echolayer.ai/privacy-policy"
					target="_blank">Privacy Policy</a
				>.
			</p>
		</div>
	</div>
</DarkLayout>
