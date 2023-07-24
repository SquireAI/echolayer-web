<script lang="ts">
        import Panels from "$lib/discovery/panels.svelte";
	    import Navigation from "$lib/components/navigation/Navigation.svelte";
        import {
            COMPONENT_STORE_NAME,
            ORIGIN_STORE_NAME,
            RELATIONS_GRAPH_STORE_NAME,
            SELECTED_STORE_NAME,
            TEAM_STORE_NAME
        } from "$lib/stores";
        import EchoLayerLogo from "$lib/EchoLayerLogo.svelte";


</script>


<Panels>
    <Navigation slot="nav" />
    <div class="bg-neutral-200 grid grid-cols-1/3-2/3 gap-4 divide-neutral-300 divide-x h-full" slot="content">
        <div class="flex flex-col">
            <div class="p-3 pt-16 flex flex-col items-start gap-4">
                <EchoLayerLogo/>
                <h1 class="text-lg leading-6 font-medium text-neutral-800">Welcome to EchoLayer!</h1>
                <p class="text-md text-neutral-400">
                    Select a team, person, or object to view connections and more information. The home lets you access your recent or favourite components, and some tips on how to use EchoLayer better.
                </p>
            </div>
        </div>
        <div class="">
            TABS COMPONENT WITH DETAILS
        </div>
    </div>
</Panels>
