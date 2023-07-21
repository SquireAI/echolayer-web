import { OrganizationApi } from "$lib/api/organization";
import { getHttpContext, type httpContext } from "$lib/http/context.js";
import type { Organization } from "$lib/types";
import { ORGS_PATH } from "$lib/utils/paths.js";
import { type HttpError, redirect, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ErrorMessageTypes } from "$lib/error";

export const load = (async ({ cookies, fetch }): Promise<Pick<httpContext, "baseHeaders" | "baseUrl"> | undefined> => {
	let orgs: Organization[] = [];
	const context = getHttpContext(fetch, cookies);

	try {
		orgs = await new OrganizationApi(context).list();
		if (orgs.length > 0) {
			throw redirect(307, ORGS_PATH);
		}
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
