<script>
	import Button from "$lib/components/Button.svelte";
	import GitHub from "$lib/svgs/GitHub.svg?component";
	import { PUBLIC_GITHUB_CLIENT_ID, PUBLIC_GITHUB_REDIRECT_URI } from "$env/static/public";
	let flowPath = ""
</script>

<div class="flex content-center justify-center items-center flex-col h-full">
	<div class="flex flex-col gap-y-6 items-center">
		<h1>Welcome back.</h1>
		<p class="text-2xl font-light leading-9 w-full md:w-1/2 text-center">If you’ve already installed EchoLayer, you may login here with GitHub to access your settings.</p>
		<div class="mt-16 w-full flex justify-center">
			<Button href={`https://github.com/login/oauth/authorize?client_id=${PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${PUBLIC_GITHUB_REDIRECT_URI}${flowPath ? `?flow=${flowPath}` : ""}`} class="w-full md:w-2/3 lg:w-2/3" type="primary">
				<div class="flex items-center	gap-x-2">
					<GitHub />
						Login with GitHub
				</div>
			</Button>
		</div>
		<p>You will be redirected to GitHub to login.</p>
		<p>New to EchoLayer? <a href="https://www.echolayer.com" class="underline">Learn more</a></p>
	</div>
</div>