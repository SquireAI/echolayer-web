import { AuthApi } from "$lib/api/auth";
import { getHttpContext } from "$lib/http/context.js";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { ErrorMessageTypes } from "$lib/error";


export const load = (async ({ fetch, cookies }) => {
	try {
		const context = getHttpContext(fetch, cookies);
		await new AuthApi(context).checkAuth();
	}
	catch (err) {
		throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
	}
}) satisfies LayoutServerLoad