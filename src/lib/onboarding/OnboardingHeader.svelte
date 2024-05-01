<script lang="ts">
	import LogoIcon from '$lib/svgs/logos/logo-white.svg?component';

	export let title = 'Welcome to Squire AI!';
	export let description =
		'Welcome to the future of software development. We are excited to be wiorking together!';
</script>

<div>
	<div class="p-6 pt-6 flex flex-col items-stretch gap-8">
		<div class="flex flex-col gap-4 items-center text-center">
			<LogoIcon class="w-6 mb-2" />
			<h1 class="text-2xl leading-6 font-medium text-neutral-200 font-display">
				{title}
			</h1>
			<p class="text-md text-neutral-400">
				{description}
			</p>
		</div>
	</div>
</div>
