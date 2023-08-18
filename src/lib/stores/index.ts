import componentStore, { COMPONENT_STORE_NAME } from './component-store';
import selectedOrgStore, { SELECTED_ORG_STORE_NAME } from './org-store';
import userStore, { USER_STORE_NAME } from './user-store';
import entityRelationshipStore, { RELATIONS_GRAPH_STORE_NAME } from './entity-relations-store';
import teamStore, { TEAM_STORE_NAME } from './team-store';
import originStore, { ORIGIN_STORE_NAME } from './origin-store';
import selectedStore, { SELECTED_STORE_NAME } from './selected-store';
import organizationsStore, { ORGS_STORE_NAME } from './orgs-store';
import entityDetailsStore, { ENTITY_DETAILS_STORE_NAME } from './entity-details-store';
import homeTabStore, { HOME_TAB_STORE_NAME } from './home-tab-store';
import userInvitationStore, { USER_INVITATION_STORE_NAME } from './user-invitation-store';

export function clearStores() {
	componentStore.clear();
	selectedOrgStore.clear();
	organizationsStore.clear();
	userStore.clear();
	entityRelationshipStore.clear();
	teamStore.clear();
	originStore.clear();
	selectedStore.clear();
	entityDetailsStore.clear();
	homeTabStore.clear();
	userInvitationStore.clear();
}

export {
	COMPONENT_STORE_NAME,
	componentStore,
	SELECTED_ORG_STORE_NAME,
	selectedOrgStore,
	ORGS_STORE_NAME,
	organizationsStore,
	USER_STORE_NAME,
	userStore,
	RELATIONS_GRAPH_STORE_NAME,
	entityRelationshipStore,
	TEAM_STORE_NAME,
	teamStore,
	ORIGIN_STORE_NAME,
	originStore,
	SELECTED_STORE_NAME,
	selectedStore,
	ENTITY_DETAILS_STORE_NAME,
	entityDetailsStore,
	HOME_TAB_STORE_NAME,
	homeTabStore,
	USER_INVITATION_STORE_NAME,
	userInvitationStore
};
