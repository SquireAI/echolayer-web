<script lang="ts">
    import { setContext } from "svelte";
    import { ORG_STORE_NAME, USER_STORE_NAME, organizationStore, userStore, organizationsStore } from '$lib/stores';
    import AdminLayout from "$lib/layouts/admin/AdminLayout.svelte";
	import { ORGS_STORE_NAME } from "$lib/stores/orgs-store";

    setContext(USER_STORE_NAME, userStore);
    setContext(ORG_STORE_NAME, organizationStore);
    setContext(ORGS_STORE_NAME, organizationsStore);
</script>

<AdminLayout>
    <slot />
</AdminLayout>
