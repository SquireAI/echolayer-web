<script>
    import AccountGroup from "svelte-material-icons/AccountGroup.svelte";
    import Database from "svelte-material-icons/Database.svelte";
    import {DISCOVERY_PATH} from "$lib/utils/paths";

    export let entity = undefined;
</script>

{#if entity}
    <a href={`${DISCOVERY_PATH}?origin=${entity.publicId}`}
       class="w-full px-2 py-2 hover:bg-neutral-200 flex flex-row gap-2 items-center rounded-md">
        {#if entity.type === "Team"}
            <div>
                <span class="block p-1 bg-echolayer-blue rounded-sm text-white">
                    <AccountGroup/>
                </span>
            </div>
            <div class="flex-1 flex-col gap-1">
                <p class="text-sm">{entity.name}</p>
                <p class="text-xs">{entity.members?.length} members</p>
            </div>
        {:else if entity.type === "Component"}
            <div>
                <span class="block p-1 bg-echolayer-yellow rounded-sm text-white">
                    <Database/>
                </span>
            </div>
            <div class="flex-1 flex-col gap-1">
                <p class="text-sm">{entity.name}</p>
            </div>
        {/if}
    </a>
{/if}
