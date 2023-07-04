import { AuthApi } from "$lib/api/auth";
import { OrganizationApi } from "$lib/api/organization";
import { getHttpContext } from "$lib/http/context";
import type { Organization } from "$lib/types.js";
import { CREATE_ORG_PATH, INVALIDATED_SIGN_IN_PATH, ORGS_PATH } from "$lib/utils/paths";
import { type HttpError, redirect, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ErrorMessageTypes } from "$lib/error";

export const load = (async ({ fetch, cookies }) => {
	const context = getHttpContext(fetch, cookies);
	try {
		await new AuthApi(context).checkAuth();
	}
	catch (error) {
		throw redirect(307, INVALIDATED_SIGN_IN_PATH);
	}
	let orgs: Organization[] = [];
	try {
		orgs = orgs.concat(await new OrganizationApi(context).list());
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		} else {
			throw error(404, { message: ErrorMessageTypes.GENERIC });
		}
	}
	if (orgs.length > 0) {
		throw redirect(307, ORGS_PATH);
	}
	throw redirect(307, CREATE_ORG_PATH);
}) satisfies PageServerLoad;
