import componentStore, { COMPONENT_STORE_NAME } from "./component-store";
import organizationStore, { ORG_STORE_NAME } from "./org-store";
import userStore, { USER_STORE_NAME } from "./user-store";
import originComponentStore, { ORIGIN_COMPONENT_STORE_NAME} from "./origin-component-store";

export function clearStores() {
	componentStore.clear();
	organizationStore.clear();
	userStore.clear();
	originComponentStore.clear();
}

export {
	COMPONENT_STORE_NAME, componentStore,
	ORG_STORE_NAME, organizationStore,
	USER_STORE_NAME, userStore,
	ORIGIN_COMPONENT_STORE_NAME, originComponentStore
};
