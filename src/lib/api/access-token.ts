import type { AccessToken, CreatedAccessToken } from "$lib/types";
import { type Fetch, type FetchHeader, post, del, get } from "./apiUtils";
import { BaseApi, ENDPOINT } from "./baseApi";

// export async function getAccessTokens(fetch: Fetch, header: FetchHeader): Promise<AccessToken[]> {
// 	return await get(fetch, "/api/v1/auth/pat", header);
// }

// export async function createAccessToken(fetch: Fetch, header: FetchHeader): Promise<CreatedAccessToken> {
// 	return await post(fetch, "/api/v1/auth/pat", {}, header);
// }

// export async function deleteAccessToken(fetch: Fetch, header: FetchHeader, prefix: string): Promise<void> {
// 	return await del(fetch, `/api/v1/auth/pat/${prefix}`, header);
// }


export class AccessTokenApi extends BaseApi<AccessToken> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.pat;
	}
}
