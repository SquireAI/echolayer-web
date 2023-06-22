import { AccessTokenApi } from "$lib/api/access-token";
import { createDefaultContext } from "$lib/http/context";
import type { CreatedAccessToken } from "$lib/types";
import type { PageLoad } from "./$types";
import type { PatPageServerData } from "./+page.server";

export type OrgNewPageData = Pick<PatPageServerData, "accessTokens"> & {
	createAccessTokenHandler: () => Promise<CreatedAccessToken>;
	deleteAccessTokenHandler: (prefix: string) => Promise<void>;
}

export const load = (async ({ parent, fetch, data }): Promise<OrgNewPageData> => {
	await parent();
	// we're getting the xsrf header from the parent (page.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl, accessTokens } = data;
	const context = createDefaultContext(fetch, baseHeaders, baseUrl);

	async function createAccessTokenHandler(): Promise<CreatedAccessToken> {
		return (await new AccessTokenApi(context).create() as CreatedAccessToken)
	}
	
	async function deleteAccessTokenHandler(prefix: string): Promise<void> {
		return await new AccessTokenApi(context).delete(prefix);
	}
	return { createAccessTokenHandler, deleteAccessTokenHandler, accessTokens };
}) satisfies PageLoad;