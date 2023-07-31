import { getHttpContext, type httpContext } from "$lib/http/context.js";
import { type HttpError, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ErrorMessageTypes } from "$lib/error";

export const load = (async ({ cookies, fetch }): Promise<Pick<httpContext, "baseHeaders" | "baseUrl"> | undefined> => {
	const context = getHttpContext(fetch, cookies);
	try {
		const { fetch, ...rest } = context;
		return rest;
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		} else {
			throw error(404, { message: ErrorMessageTypes.GENERIC });
		}
	}
}) satisfies PageServerLoad;
