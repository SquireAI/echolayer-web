import AccessToken from "$lib/account/AccessToken.svelte";
import { AccessTokenApi } from "$lib/api/access-token";
import type { CreatedAccessToken } from "$lib/types";
import type { PatPageServerData } from "./+page.server";

export type OrgNewPageData = Pick<PatPageServerData, "accessTokens"> & {
	createAccessTokenHandler: () => Promise<CreatedAccessToken>;
	deleteAccessTokenHandler: (prefix: string) => Promise<void>;
}

/** @type {import('./$types').PageLoad} */
export async function load({ parent, fetch, data }): Promise<OrgNewPageData> {
	await parent();
	// we're getting the xsrf header from the parent (page.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl, accessTokens } = data;

	async function createAccessTokenHandler(): Promise<CreatedAccessToken> {
		const context = { fetch, baseHeaders, baseUrl };
		const token = (await new AccessTokenApi(context).create() as CreatedAccessToken)
		return token;
	}
	
	async function deleteAccessTokenHandler(prefix: string): Promise<void> {
		const context = { fetch, baseHeaders, baseUrl };
		return await new AccessTokenApi(context).delete(prefix);
	}
	return { createAccessTokenHandler, deleteAccessTokenHandler, accessTokens };
};