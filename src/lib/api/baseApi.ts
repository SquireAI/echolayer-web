import type { httpContext } from "$lib/http/context";
import urlJoin from "url-join";
import { HttpClient } from "../http/httpClient";

export type Endpoint = "organization" | "component" | "componentType" | "member" | "team" | "owner" | "issue" | "auth" | "auth/pat" | "user" |  "";

export abstract class BaseApi<T> {
	protected httpClient: HttpClient;
	protected endpoint: Endpoint = "";

	constructor(context: httpContext) {
		this.initializeVariables();
		const httpContext = { ... context };
		httpContext.baseUrl = urlJoin(context.baseUrl, this.endpoint);
		this.httpClient = new HttpClient(httpContext);
	}

	abstract initializeVariables(): void;
	public async list(): Promise<T[]> {
		const resp = await this.httpClient.fetchGET();
		return resp.json() as Promise<T[]>;
	}
	public async get(name: string): Promise<T> {
		const resp = await this.httpClient.fetchGET(name);
		return resp.json() as Promise<T>;
	}
	public async create(data: object): Promise<T> {
		const resp = await this.httpClient.fetchPOST("", undefined, data);
		return resp.json() as Promise<T>;
	}
	public async update(name: string, data: object): Promise<T> {
		const resp = await this.httpClient.fetchPATCH(name, undefined, data);
		return resp.json() as Promise<T>;
	}
	public async delete(name: string): Promise<void> {
		await this.httpClient.fetchDELETE(name);
		return;
	}
}