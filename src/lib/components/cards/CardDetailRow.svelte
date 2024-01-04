<script lang="ts">
	export let key: string;
</script>

<div class="flex justify-between gap-x-4 py-2 px-3">
	<dt class="text-gray-500">{key}</dt>
	<dd class="text-gray-700"><slot /></dd>
</div>
