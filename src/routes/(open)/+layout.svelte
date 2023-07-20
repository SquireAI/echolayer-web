<script lang="ts">
    import { setContext } from "svelte";
    import { ORG_STORE_NAME, USER_STORE_NAME, organizationStore, userStore } from '$lib/stores';
    import AdminLayout from "$lib/layouts/admin/AdminLayout.svelte";

    setContext(USER_STORE_NAME, userStore);
    setContext(ORG_STORE_NAME, organizationStore);
</script>

<AdminLayout>
    <slot />
</AdminLayout>
