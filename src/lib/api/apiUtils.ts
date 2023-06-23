import { PUBLIC_BASE_API_URL } from "$env/static/public"
import type { Cookies } from "@sveltejs/kit";
export const BASE_API_URL: string = PUBLIC_BASE_API_URL || "http://localhost:3005";

export type Fetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

export const XSRF_TOKEN_COOKIE_NAME = "CSRF-TOKEN";
export const XSRF_REQUEST_HEADER = "X-XSRF-TOKEN";

const FetchMethod = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE"
}
type FETCH_METHOD = typeof FetchMethod[keyof typeof FetchMethod];

type FetchBodyValue = string | number | boolean;
type FetchBody = {
	[key: string]: string | number | boolean | Array<FetchBodyValue>
};

export type FetchHeader = {
	[key: string]: string;
};

export class FetchError extends Error {
	constructor(
		message: string, public status?: number, public statusText?: string
	) {
		super(message);
		Object.setPrototypeOf(this, FetchError.prototype);
	}
}

export function xsrfToken(cookies?: Cookies): { [key: string]: string } {
	if (cookies === undefined) {
		return {};
	}
	let value = "";
	const cookieValue = cookies.get(XSRF_TOKEN_COOKIE_NAME);
	if (cookieValue !== undefined) {
		value = cookieValue;
	}
	return { [XSRF_REQUEST_HEADER]: value };
}

const { GET, POST, PUT, DELETE } = FetchMethod;

export const get = async (fetch: Fetch, path: string, headers?: FetchHeader) => {
	return await request(
		fetch, path, GET, undefined, headers
	);
};

export const post = async (
	fetch: Fetch, path: string, body: FetchBody, headers?: FetchHeader
) => {
	return await request(
		fetch, path, POST, body, headers
	);
};

export const put = async (
	fetch: Fetch, path: string, body: FetchBody, headers?: FetchHeader
) => {
	return await request(
		fetch, path, PUT, body, headers
	);
};

export const del = async (fetch: Fetch, path: string, headers?: FetchHeader) => {
	return await request(
		fetch, path, DELETE, undefined, headers
	);
};

/**
 * Handles the requests to our API server. Note that is may throw various errors, as described here
 * Returns the JSON data from a successful request.
 * Caller is expected to check the error status, if it cares, on the {FetchError} object.
 *
 * @param {string} path the path to the resource on our server, with a leading slash
 * @param {FETCH_METHOD} method GET, POST, or PUT HTTP method
 * @param {FetchBody} body the object to be sent along with a POST or PUT request
 * @returns JSON data from the API request
 * @throws {TypeError} if anything in fetch is wrong (headers, URL, etc)
 * @throws {SyntaxError} if attempting to parse text as JSON in response
 * @throws {FetchError} if response is an error
 */
const request = async (
	fetch: Fetch, path: string, method: FETCH_METHOD, body?: FetchBody, headers?: FetchHeader
) => {
	path = path.charAt(0) === "/" ? path : `/${path}`;
	// This can throw {TypeError} for any of these reasons: https://developer.mozilla.org/en-US/docs/Web/API/fetch#exceptions
	const response: Response = await fetch(`${BASE_API_URL}${path}`, config(
		method, body, headers
	));
	if (response) {
		if (response.ok) {
			// This can throw a {SyntaxError} if the response body is not well formatted JSON!
			try {
				return await response.json();
			} catch (error) {
				if (error instanceof SyntaxError) {
					// body of response is empty - just return empty object
					return {};
				}
				throw error; // if not a SyntaxError, let's just throw it
			}
		} else {
			const { status, statusText } = response;
			const json = await response.json();
			// Something went wrong handling the request.. caller can check status (4xx)
			throw new FetchError(
				json.message, status, statusText
			);
		}
	}
	// no response.. shouldn't get here but throw an error for completeness
	throw new FetchError("Did not receive a response.");
};

const config = (
	method: FETCH_METHOD, body?: FetchBody, headers?: FetchHeader
): RequestInit => {
	return {
		method,
		// credentials: "include", // needed to send cookies to only our server
		headers: {
			"Content-Type": "application/json",
			...(headers !== undefined && headers)
		},
		...(method !== GET && { body: JSON.stringify(body) })
	};
};
