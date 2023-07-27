<script lang="ts">
        import Panels from "$lib/discovery/panels.svelte";
	    import Navigation from "$lib/components/navigation/Navigation.svelte";
        import EchoLayerLogo from "$lib/EchoLayerLogo.svelte";
	import Button from "$lib/components/Button.svelte";
	import IconBox from "$lib/components/IconBox.svelte";
    import Key from "svelte-material-icons/Key.svelte";
    import HelpCircle from "svelte-material-icons/HelpCircle.svelte";
    import ScriptTextOutline from "svelte-material-icons/ScriptTextOutline.svelte";
	import { API_KEYS_PATH, NOTION_GETTING_STARTED_DOCS, SUPPORT_URL } from "$lib/utils/paths";
</script>


<Panels>
    <Navigation slot="nav" />
    <div class="bg-neutral-100 grid grid-cols-1/3-2/3 gap-4 divide-neutral-300 divide-x h-full" slot="content">
        <div class="flex flex-col">
            <div class="p-6 pt-16 flex flex-col items-stretch gap-8">
                <div class="flex flex-col gap-4 items-start">
                    <EchoLayerLogo/>
                    <h1 class="text-lg leading-6 font-medium text-neutral-800">Welcome to EchoLayer!</h1>
                    <p class="text-md text-neutral-400">
                        Select a team, person, or object to view connections and more information. The home lets you access your recent or favourite components, and some tips on how to use EchoLayer better.
                    </p>
                </div>
                <div class="flex flex-col gap-4">
                    <h3 class="text-md font-normal text-neutral-800">Tips</h3>
                    <Button type="flat" class="leading-6 items-center justify-start gap-2" full={true} href={`${API_KEYS_PATH}`}>
                        <IconBox Icon={Key} /> View our API keys panel
                    </Button>
                    <Button type="flat" class="leading-6 items-center justify-start gap-2" full={true} href={NOTION_GETTING_STARTED_DOCS}>
                        <IconBox Icon={ScriptTextOutline} /> Read our documentation
                    </Button>
                    <Button type="flat" class="leading-6 items-center justify-start gap-2" full={true} href={SUPPORT_URL}>
                        <IconBox Icon={HelpCircle} /> Contact support for any help
                    </Button>
                </div>
            </div>
        </div>
        <div class="">
            TABS COMPONENT WITH DETAILS
        </div>
    </div>
</Panels>
