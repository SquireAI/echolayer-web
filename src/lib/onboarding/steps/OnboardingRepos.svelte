<script>
	import repos from '$lib/data/demo-repos.json';
	import ReposTable from '$lib/components/repos/ReposTable.svelte';

	let columns = ['Repository', 'Default Branch', 'Owner', 'Expert', 'Progress'];
	let rows = repos;
</script>

<div class="flex-1">
	<ReposTable {columns} {rows} />
</div>
