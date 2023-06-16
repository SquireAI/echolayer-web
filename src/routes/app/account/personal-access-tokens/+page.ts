import { createAccessToken, deleteAccessToken } from "$lib/api/access-token";
import type { CreatedAccessToken } from "../../../../types";
import type { PatPageServerData } from "./+page.server";

export type OrgNewPageData = Pick<PatPageServerData, "accessTokens"> & {
	createAccessTokenHandler: () => Promise<CreatedAccessToken>;
	deleteAccessTokenHandler: (prefix: string) => Promise<void>;
}

/** @type {import('./$types').PageLoad} */
export async function load({ parent, fetch, data }): Promise<OrgNewPageData> {
	await parent();
	// we're getting the xsrf header from the parent (page.server.ts) since we don't have access to cookies here
	const { xsrfHeader, accessTokens } = data;
	async function createAccessTokenHandler(): Promise<CreatedAccessToken> {
		const token = await createAccessToken(fetch, xsrfHeader);
		return token;
	}
	
	async function deleteAccessTokenHandler(prefix: string): Promise<void> {
		return await deleteAccessToken(fetch, xsrfHeader, prefix);
	}
	return { createAccessTokenHandler, deleteAccessTokenHandler, accessTokens };
};