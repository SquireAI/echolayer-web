<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import AccountIcon from 'svelte-material-icons/Account.svelte';
	import type { MemberStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { MEMBER_STORE_NAME } from '$lib/stores';
	import type { PageData } from './+page.server';
	import PageHeader from '$lib/components/headers/PageHeader.svelte';
	import CardList from '$lib/components/cards/CardList.svelte';
	import MembersCard from '$lib/components/members/MembersCard.svelte';

	export let data: PageData;
	$: org = data.org;

	let memberStore: MemberStore = getContext(MEMBER_STORE_NAME) as MemberStore;
	if (data.members) {
		memberStore.setMembers(data.members);
	}
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col h-screen">
			<PageHeader title="Members">
				<span slot="left-action" class="flex">
					<AccountIcon />
				</span>
			</PageHeader>
			<div class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit">
				<div class="p-3">
					<CardList entities={$memberStore.entity}>
						{#each $memberStore.entity as entity (entity.publicId)}
							<li>
								<MembersCard {entity} subtitle={org.name} />
							</li>
						{/each}
					</CardList>
				</div>
			</div>
		</div>
	</div>
</Panels>
