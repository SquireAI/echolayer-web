import type { RedirectPath } from "./paths";

export function redirect(path: RedirectPath): Response {
	return new Response(null, {
		status: 307,
		headers: { location: path }
	});
}