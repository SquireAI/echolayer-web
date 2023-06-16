import type { Component } from "../../types";
import { get, type Fetch, type FetchHeader } from "./apiUtils";

export async function getComponents(fetch: Fetch, header: FetchHeader): Promise<Component[]> {
	return await get(fetch, "api/v1/component", header);
}
