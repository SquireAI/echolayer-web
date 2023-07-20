import {getHttpContext, type httpContext} from "$lib/http/context";
import type { LayoutServerLoad } from "./$types";
import { AuthApi } from "$lib/api/auth";
import { error, HttpError, redirect } from "@sveltejs/kit";
import { CREATE_ORG_PATH, INVALIDATED_SIGN_IN_PATH } from "$lib/utils/paths";
import type { Organization } from "$lib/types";
import { OrganizationApi} from "$lib/api/organization";
import { ErrorMessageTypes } from "$lib/error";
import {authRequired} from "$lib/utils/auth";


export const load = (async ({ fetch, cookies }) => {
	// Get tokens from cookies
	const context: httpContext = getHttpContext(fetch, cookies);

	// Check if user is authenticated
	const authedUser = await authRequired(context);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl,
	}
}) satisfies LayoutServerLoad;
