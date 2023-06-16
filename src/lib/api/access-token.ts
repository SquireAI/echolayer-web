import type { AccessToken, CreatedAccessToken } from "../../types";
import { type Fetch, type FetchHeader, post, del, get } from "./apiUtils";

export async function getAccessTokens(fetch: Fetch, header: FetchHeader): Promise<AccessToken[]> {
	return await get(fetch, "/api/v1/auth/pat", header);
}

export async function createAccessToken(fetch: Fetch, header: FetchHeader): Promise<CreatedAccessToken> {
	return await post(fetch, "/api/v1/auth/pat", {}, header);
}

export async function deleteAccessToken(fetch: Fetch, header: FetchHeader, prefix: string): Promise<void> {
	return await del(fetch, `/api/v1/auth/pat/${prefix}`, header);
}
