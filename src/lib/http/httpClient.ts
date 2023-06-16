import queryString from "query-string";
import type { FetchHeader } from "../api/apiUtils";
import type { httpContext } from "$lib/http/context";
import urlJoin from "url-join";

export class HttpClient {
	private baseUrl: string;
	private headers: FetchHeader;
	private fetch: typeof fetch;
	constructor(context: httpContext) {
		this.baseUrl = context.baseUrl;
		this.headers = context.baseHeaders;
		this.fetch = context.fetch;
	}
	public async fetchGET(path = "", params?: any, body?: object, headers?: FetchHeader): Promise<Response> {
		return this.fetchHTTP("GET", path, params, body, headers);
	}
	public async fetchPOST(path = "", params?: any, body?: object, headers?: FetchHeader): Promise<Response> {
		return this.fetchHTTP("POST", path, params, body, headers);
	}
	public async fetchPATCH(path = "", params?: any, body?: object, headers?: FetchHeader): Promise<Response> {
		return this.fetchHTTP("PATCH", path, params, body, headers);
	}
	public async fetchDELETE(path = "", params?: any, body?: object, headers?: FetchHeader): Promise<Response> {
		return this.fetchHTTP("DELETE", path, params, body, headers);
	}

	public async fetchHTTP(method: "GET" | "POST" | "PATCH" | "DELETE" = "GET", path = "", params?: any, body?: object, headers?: FetchHeader): Promise<Response> {
		const queryParameters = params ? `?${queryString.stringify(params)}` : "";
		const url = urlJoin(this.baseUrl, path, queryParameters);
		const requestHeaders = { ... this.headers, ... headers };
		const resp = await this.fetch(url, {
			method,
			body: body ? JSON.stringify(body) : undefined,
			headers: requestHeaders,
			credentials: "include",
		});
		if (resp.ok) {
			return resp;
		} else {
			throw new Error(`Failed to fetch data: ${resp.statusText} @ ${url}`);
		}
	}
}
