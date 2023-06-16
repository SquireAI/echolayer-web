import type { Issue } from "../../types";
import { get, type Fetch, type FetchHeader } from "./apiUtils";

export async function getIssues(fetch: Fetch, header: FetchHeader): Promise<Issue[]> {
	return await get(fetch, "api/v1/issue?resolved=false", header);
}
