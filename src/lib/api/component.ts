import type { ComponentEntity } from "../types";
import { BaseApi, ENDPOINT } from "./baseApi";

export class ComponentApi extends BaseApi<ComponentEntity> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.component;
	}
}