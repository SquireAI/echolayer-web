<script lang="ts">
	import ColorHash from 'color-hash';
	import EchoLayerIconWhite from '$lib/svgs/EchoLayerIconWhite.svg?component';

	export let text: string;

	const colorHash = new ColorHash({ saturation: 0.8 });
	const hex = colorHash.hex(text);
</script>

<div
	class={`w-6 h-6 rounded-lg flex flex-row items-center justify-center`}
	style={`background-color: ${hex}`}
>
	<EchoLayerIconWhite class="w-4 h-4" />
</div>
