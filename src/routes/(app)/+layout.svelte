<script lang="ts">
	import DiscoveryLayout from '$lib/layouts/discovery/DiscoveryLayout.svelte';
	import { setContext } from 'svelte';
	import {
		COMPONENT_STORE_NAME,
		componentStore,
		entityRelationshipStore,
		ISSUE_STORE_NAME,
		issueStore,
		ORIGIN_STORE_NAME,
		originStore,
		RELATIONS_GRAPH_STORE_NAME,
		SELECTED_STORE_NAME,
		selectedStore,
		TEAM_STORE_NAME,
		teamStore,
		REPOSITORY_STORE_NAME,
		repositoryStore,
		MEMBER_STORE_NAME,
		memberStore
	} from '$lib/stores';

	import type { LayoutData } from './$types';
	import { ORG_INVITATION_SERVICE_CONTEXT_NAME } from '$lib/invitation/orgInvite.service';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { RELATIONS_SERVICE_CONTEXT_NAME } from '$lib/relations/relations.service';

	export let data: LayoutData;

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(RELATIONS_GRAPH_STORE_NAME, entityRelationshipStore);
	setContext(TEAM_STORE_NAME, teamStore);
	setContext(ORIGIN_STORE_NAME, originStore);
	setContext(SELECTED_STORE_NAME, selectedStore);
	setContext(ISSUE_STORE_NAME, issueStore);
	setContext(REPOSITORY_STORE_NAME, repositoryStore);
	setContext(MEMBER_STORE_NAME, memberStore);

	setContext(ORG_INVITATION_SERVICE_CONTEXT_NAME, data.inviteService);
	setContext(RELATIONS_SERVICE_CONTEXT_NAME, data.relationsService);
</script>

<svelte:head>
        <script>
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_DHdMeJPT5vuuV0GvTMIPEJbC1YJeNlhykGcgZGnhj2V',{api_host:'https://app.posthog.com'})
        </script>
</svelte:head>

<DiscoveryLayout>
	<slot />
</DiscoveryLayout>
<Modal />
