import type { Component } from "../types";
import { BaseApi } from "./baseApi";

export class ComponentApi extends BaseApi<Component> {
	initializeVariables(): void {
		this.endpoint = "component";
	}
}