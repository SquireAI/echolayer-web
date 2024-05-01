<script lang="ts">
	import ColorHash from 'color-hash';
	import Logo from '$lib/svgs/logos/logo-white.svg?component';

	export let text: string;

	const colorHash = new ColorHash({ saturation: 0.8 });
	const hex = colorHash.hex(text);
</script>

<div
	class={`w-7 h-7 rounded-md flex flex-row items-center justify-center overflow-hidden`}
	style={`background-color: ${hex}`}
>
	<Logo class="w-8 -ml-4 mt-1.5" />
</div>
