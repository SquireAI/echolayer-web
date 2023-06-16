import type { User } from "../../types";
import { type Fetch, get, type FetchHeader } from "./apiUtils";

export async function getUser(fetch: Fetch, header: FetchHeader): Promise<User> {
	return await get(fetch, "/api/v1/user", header);
}