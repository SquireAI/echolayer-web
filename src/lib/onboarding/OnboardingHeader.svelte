<script lang="ts">
	import LogoIcon from '$lib/svgs/EchoLayerIconWhite.svg?component';

	export let title = 'Welcome to EchoLayer!';
	export let description =
		'Select a team, person, or object to view connections and more information. Home lets you access your recent or favorite components, and some tips on how to use EchoLayer better.';
</script>

<div>
	<div class="p-6 pt-6 flex flex-col items-stretch gap-8">
		<div class="flex flex-col gap-4 items-center text-center">
			<LogoIcon class="w-10 h-10" />
			<h1 class="text-2xl leading-6 font-medium text-stone-200">
				{title}
			</h1>
			<p class="text-md text-stone-400">
				{description}
			</p>
		</div>
	</div>
</div>
