<script>
	import repos from '$lib/data/demo-repos.json';
	import RepositoriesTable from '$lib/components/repositories/RepositoriesTable.svelte';

	let columns = ['Repository', 'Default Branch', 'Owner', 'Expert', 'Progress'];
	let rows = repos;
</script>

<div class="flex-1">
	<RepositoriesTable {columns} {rows} />
</div>
