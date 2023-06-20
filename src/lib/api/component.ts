import type { Component } from "../types";
import { BaseApi, ENDPOINT } from "./baseApi";

export class ComponentApi extends BaseApi<Component> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.component;
	}
}