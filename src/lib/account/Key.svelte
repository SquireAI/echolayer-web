<script lang="ts">
	import Key from 'svelte-material-icons/Key.svelte';
	export let isNew = false;
</script>

<span class={`${isNew ? 'text-echolayer-green-900' : 'text-neutral-500'}`}>
	<Key size="24" />
</span>
