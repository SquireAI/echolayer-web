import { AccessTokenApi } from "$lib/api/access-token";
import { createDefaultContext } from "$lib/http/context";
import type { CreatedAccessToken, Organization } from "$lib/types";
import { orgRequired } from "$lib/utils/access";
import type { PageLoad } from "./$types";
import type { ApiKeysPageServerData } from "./+page.server";

export type OrgNewPageData = Pick<ApiKeysPageServerData, "accessTokens"> & {
	createAccessTokenHandler: () => Promise<CreatedAccessToken>;
	deleteAccessTokenHandler: (prefix: string) => Promise<void>;
	org: Organization;
}

export const load = (async ({ parent, fetch, data }): Promise<OrgNewPageData> => {
	await parent();
	// we're getting the xsrf header from the parent (page.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl, accessTokens } = data;
	const context = createDefaultContext(fetch, baseHeaders, baseUrl);
	const org = await orgRequired(context);

	async function createAccessTokenHandler(): Promise<CreatedAccessToken> {
		return (await new AccessTokenApi(context).create() as CreatedAccessToken)
	}
	
	async function deleteAccessTokenHandler(prefix: string): Promise<void> {
		return await new AccessTokenApi(context).delete(prefix);
	}
	return { createAccessTokenHandler, deleteAccessTokenHandler, accessTokens, org };
}) satisfies PageLoad;