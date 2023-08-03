import { getHttpContext, type httpContext } from "$lib/http/context.js";
import { type HttpError, error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ErrorMessageTypes } from "$lib/error";
import { INVALIDATED_SIGN_IN_PATH } from "$lib/utils/paths";

export const load = (async ({ cookies, fetch }): Promise<Pick<httpContext, "baseHeaders" | "baseUrl"> | undefined> => {
	const context = getHttpContext(fetch, cookies);
	try {
		const { fetch, ...rest } = context;
		return rest;
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw redirect(307, INVALIDATED_SIGN_IN_PATH);
		} else {
			throw error(404, { message: ErrorMessageTypes.GENERIC });
		}
	}
}) satisfies PageServerLoad;
