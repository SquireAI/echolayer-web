<script lang="ts">
	import PointScan from "$lib/svgs/PointScan.svg?component";
	export let isHidden: boolean;
</script>
<div class={`flex justify-center gap-1 items-center text-xs bg-echolayer-green-100/20 text-echolayer-green rounded-full h-5 w-[69px] font-sans ${isHidden ? "hidden" : ""}`}>
	<PointScan />
	Origin
</div>
