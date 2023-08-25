<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import GitHub from '$lib/svgs/GitHub.svg?component';

	const gitHubLogin = async () => {
		const url = await $page.data.loginHandler('github');
		console.log(url);
		if (browser) {
			window.open(url, '_self');
		}
	};
</script>

<div class="flex content-center justify-center items-center flex-col h-full">
	<div class="flex flex-col gap-y-6 items-center">
		<h1>Welcome back.</h1>
		<p class="text-2xl font-light leading-9 w-full md:w-1/2 text-center">
			If you’ve already installed EchoLayer, you may login here with GitHub to access your settings.
		</p>
		<div class="mt-16 w-full flex justify-center">
			<Button handleClick={gitHubLogin} class="w-full md:w-2/3 lg:w-2/3" type="primary">
				<div class="flex items-center gap-x-2">
					<GitHub />
					Login with GitHub
				</div>
			</Button>
		</div>
		<p>You will be redirected to GitHub to login.</p>
		<p>New to EchoLayer? <a href="https://www.echolayer.com" class="underline">Learn more</a></p>
	</div>
</div>
