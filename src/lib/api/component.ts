import type { StoreComponentEntity } from "../types";
import { BaseApi, ENDPOINT } from "./baseApi";

export class ComponentApi extends BaseApi<StoreComponentEntity> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.component;
	}
}