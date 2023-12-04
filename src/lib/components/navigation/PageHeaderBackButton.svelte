<script lang="ts">
	import PageHeaderButton from '$lib/components/navigation/PageHeaderButton.svelte';
	import ArrowLeftIcon from 'svelte-material-icons/ArrowLeft.svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';

	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<PageHeaderButton onClick={() => goto(previousPage)}>
	<ArrowLeftIcon /> Back
</PageHeaderButton>
