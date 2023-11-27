<script>
	import repos from '$lib/data/onboarding-repos.json';
	import ReposTable from '$lib/components/repos/ReposTable.svelte';

	let columns = ['Repository', 'Default Branch', 'Owner', 'Knowledge Owner', 'Progress'];
	let rows = repos;
</script>

<div class="flex-1">
	<ReposTable {columns} {rows} onboarding={true} />
</div>
