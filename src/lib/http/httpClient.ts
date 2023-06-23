import queryString from "query-string";
import type { FetchHeader } from "../api/apiUtils";
import type { httpContext } from "$lib/http/context";
import urlJoin from "url-join";
import { error } from "@sveltejs/kit";
import { ErrorMessageTypes } from "$lib/error";
import type { FetchBody } from "$lib/api/baseApi";
import { browser } from "$app/environment";

const FetchMethod = {
	GET: "GET",
	HEAD: "HEAD",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
	CONNECT: "CONNECT",
	OPTIONS: "OPTIONS",
	TRACE: "TRACE",
	PATCH: "PATCH",
} as const;
export type FETCH_METHOD = typeof FetchMethod[keyof typeof FetchMethod];

export class HttpClient {
	private baseUrl: string;
	private headers: FetchHeader;
	private fetch: typeof fetch;
	constructor(context: httpContext) {
		this.baseUrl = context.baseUrl;
		this.headers = context.baseHeaders;
		this.fetch = context.fetch;
	}
	public async fetchGET(path = "", params?: any, body?: FetchBody, headers?: FetchHeader): Promise<Response> {
		return this.fetchHTTP("GET", path, params, body, headers);
	}
	public async fetchPOST(path = "", params?: any, body?: FetchBody, headers?: FetchHeader): Promise<Response> {
		return this.fetchHTTP("POST", path, params, body, headers);
	}
	public async fetchPATCH(path = "", params?: any, body?: FetchBody, headers?: FetchHeader): Promise<Response> {
		return this.fetchHTTP("PATCH", path, params, body, headers);
	}
	public async fetchDELETE(path = "", params?: any, body?: FetchBody, headers?: FetchHeader): Promise<Response> {
		return this.fetchHTTP("DELETE", path, params, body, headers);
	}

	public async fetchHTTP(method: FETCH_METHOD = "GET", path = "", params?: any, body?: FetchBody, headers?: FetchHeader): Promise<Response> {
		const queryParameters = params ? `?${queryString.stringify(params)}` : "";
		const url = urlJoin(this.baseUrl, path, queryParameters);
		const requestHeaders = {
			"Content-Type": "application/json",
			...this.headers,
			...headers
		};
		const resp = await this.fetch(url, {
			method,
			body: body ? JSON.stringify(body) : undefined,
			headers: requestHeaders,
			...(browser && { credentials: "include" }),
		});
		if (resp.ok) {
			return resp;
		} else {
			throw error(resp.status, {message: ErrorMessageTypes.GENERIC });
		}
	}
}
