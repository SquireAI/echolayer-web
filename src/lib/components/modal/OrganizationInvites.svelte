<script lang="ts">
	import { modalStore } from "$lib/stores/modal";
    import CloseIcon from "svelte-material-icons/Close.svelte";
    import AccountMultiplePlusIcon from "svelte-material-icons/AccountMultiplePlus.svelte";
    import EmailIcon from "svelte-material-icons/Email.svelte";
    import MinusIcon from "svelte-material-icons/Minus.svelte";
	import TextInput from "../TextInput.svelte";
	import Button from "../Button.svelte";
	import { nanoid } from "nanoid";

    let invitationEmail = "";
    let errorMessage = "";
    let formError = false;
    $: inactive = invitationEmail.trim().length === 0;
    let invites: { publicId: string, invitedEmail: string }[] = [];
    $: invites;

    const handleSubmit = async (email: string) => {
        errorMessage = "";
        formError = false;
        if (email.trim().length === 0) {
            formError = true;
            errorMessage = "Please enter an email address";
            return;
        }

        // TODO: Use Zod to check email format
        if(!email.includes("@")) {
            formError = true;
            errorMessage = "Please enter a valid email address";
            return;
        }
        
        // TODO: Handle API call to submit invitation.
        invites = invites.concat([{
            publicId: nanoid(),
            invitedEmail: email,
        }]);

        // Reset the form on success
        invitationEmail = '';
    }

    const handleRevoke = async (publicId: string) => {
        // TODO:
        // Make API call to revoke invitation
        invites = invites.filter(i => i.publicId !== publicId);
    }
    
    
</script>


<div class="">
    <div class="flex flex-row justify-between items-center gap-4 min-w-[500px] p-4 bg-neutral-50">
        <h2 class="text-lg">Invite members to organization</h2>
        <button on:click={() => modalStore.close()}>
            <CloseIcon width=20 height=20 />
        </button>
    </div>
    <div class="border-b border-t border-neutral-300 p-3 grid grid-cols-12 align-items-start gap-4">
        <div class="flex flex-col col-span-8">
            <TextInput 
                bind:value={invitationEmail}
                errorMessage={errorMessage}
                formError={formError}
                placeholder="Enter an email address..."
            />
        </div>
        {#key inactive}
            <Button type="grey" handleClick={() => handleSubmit(invitationEmail)} class={`${inactive ? "text-neutral-400": "text-neutral-800"} col-span-4 h-min`}>
                <span class="flex flex-row gap-2 justify-center items-center">
                    <AccountMultiplePlusIcon height=20 width=20 class="text-echolayer-blue" />
                    Invite
                </span>                
            </Button>
        {/key}
    </div>
    <div class="bg-netural-50 p-3 border-neutral-300 border-b">
        <h3 class="text-sm text-neutral-500">Invited/Pending users ({invites.length})</h3>
        
    </div>
    <div>
        {#if invites.length === 0}
        <div class="flex flex-col items-center justify-center w-full p-8 text-neutral-500 text-sm">
            No pending invitations
        </div>
        {:else}
            {#each (invites || []) as invite (invite.publicId)}
                <div class="flex flex-row justify-between py-1 gap-2">
                    <div class="border-l-4 border-neutral-300 pl-4 py-2 flex flex-row w-full justify-between pr-4">
                        <div class="text-neutral-800 flex flex-row items-center justify-center gap-1 ">
                            <EmailIcon width=20 height=20 class="text-neutral-400" />
                            {invite.invitedEmail}
                        </div>
                        <Button type="grey" handleClick={() => handleRevoke(invite.publicId)}>
                            <span class="flex flex-row gap-2 justify-center items-center">
                                <MinusIcon height=20 width=20 class="text-echolayer-red" />
                                Revoke
                            </span>
                        </Button>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>