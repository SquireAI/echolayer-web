<script>
	import LoadingIcon from 'svelte-material-icons/Loading.svelte';

	export let size = 24;
	export let color = 'white';
	export let classes = '';
</script>

<span class="animate-spin fill-{color} {classes}">
	<LoadingIcon {size} />
</span>
