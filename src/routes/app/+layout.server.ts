import { AuthApi } from "$lib/api/auth";
import { getHttpContext } from "$lib/http/context.js";
import { SIGN_IN_PATH } from "$lib/utils/paths";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, cookies }) {
	try {
		const context = getHttpContext(fetch, cookies);
		await new AuthApi(context).checkAuth();
	}
	catch (error: any) {
		throw redirect(307, SIGN_IN_PATH);
	}
}