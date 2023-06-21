import { AuthApi } from "$lib/api/auth";
import { getHttpContext } from "$lib/http/context.js";
import { SIGN_IN_PATH } from "$lib/utils/paths";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ fetch, cookies }) => {
	try {
		const context = getHttpContext(fetch, cookies);
		await new AuthApi(context).checkAuth();
	}
	catch (error: any) {
		throw redirect(307, SIGN_IN_PATH);
	}
}) satisfies LayoutServerLoad