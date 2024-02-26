<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import OpenLayout from '$lib/layouts/open/OpenLayout.svelte';
	import GitHub from '$lib/svgs/GitHub.svg?component';
	import GitLab from '$lib/svgs/GitLab.svg?component';

	const handleLogin = async (provider: string) => {
		const url = await $page.data.loginHandler(provider);
		if (browser) {
			window.open(url, '_self');
		}
	};
</script>

<OpenLayout>
	<div class="flex content-center justify-center items-center flex-col h-full">
		<div class="flex flex-col gap-y-6 items-center">
			<div class="flex flex-col items-center">
				<h2 class="text-neutral-800 font-normal">Log in</h2>
				<p class="text-neutral-500 leading-9 w-full text-center">Please login or sign up below</p>
			</div>
			<div class="w-full flex flex-col gap-3">
				<Button handleClick={() => handleLogin('github')} full={true} type="grey">
					<div class="flex items-center gap-x-2 h-6">
						<GitHub />
						Login with GitHub
					</div>
				</Button>
				<!-- <Button handleClick={() => handleLogin('gitlab')} full={true} type="grey">
					<div class="flex items-center gap-x-2 h-6">
						<GitLab />
						Login with GitLab
					</div>
				</Button> -->
			</div>
			<p class="text-neutral-500 max-w-md text-center px-4">
				By logging in, you acknowledge that you have read, understood, and agree to EchoLayer’s <a
					class="text-echolayer-blue"
					href="https://echolayer.com/terms-of-service">Terms of Service</a
				>
				and
				<a class="text-echolayer-blue" href="https://echolayer.com/privacy-policy">Privacy Policy</a
				>.
			</p>
		</div>
	</div>
</OpenLayout>
