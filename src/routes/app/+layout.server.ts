import { checkAuth } from "$lib/api/auth";
import { SIGN_IN_PATH } from "$lib/utils/paths";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, cookies }) {
	try {
		console.log("auth check", cookies.getAll());
		await checkAuth(fetch, cookies);
	}
	catch (error: any) {
		throw redirect(307, SIGN_IN_PATH);
	}
}