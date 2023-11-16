<script lang="ts">
	import EchoLayerLogo from '$lib/EchoLayerLogo.svelte';

	export let title = 'Welcome to EchoLayer!';
	export let description =
		'Select a team, person, or object to view connections and more information. Home lets you access your recent or favorite components, and some tips on how to use EchoLayer better.';
</script>

<div class="">
	<div class="p-6 pt-16 flex flex-col items-stretch gap-8">
		<div class="flex flex-col gap-4 items-start">
			<EchoLayerLogo />
			<h1 class="text-2xl leading-6 font-medium text-neutral-800">{title}</h1>
			<p class="text-md text-neutral-400">
				{description}
			</p>
		</div>
	</div>
</div>

<style lang="scss">
</style>
