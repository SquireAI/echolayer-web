<script lang="ts">
	import EchoLayerLogo from '$lib/EchoLayerLogo.svelte';

	export let title: string;
	export let description: string;
</script>

<div
	class="p-6 pt-16 flex flex-col items-stretch gap-8 bg-neutral-25 bg-no-repeat bg-contain bg-right-top bg-[length:758px_450px] bg-[url('/assets/echoLayer_graphic_faded.png')]"
>
	<div class="flex flex-col gap-4 items-start">
		<EchoLayerLogo />
		<h1 class="text-2xl leading-6 font-medium text-neutral-800">{title}</h1>
		<p class="text-md text-neutral-600">
			{description}
		</p>
	</div>
</div>
