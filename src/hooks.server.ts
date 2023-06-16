// import { checkAuth } from '$lib/api/auth';
// import { APP_PATH, SIGN_IN_PATH } from '$lib/utils/paths';
// import { redirect } from '$lib/utils/redirects';
// import type { Handle } from '@sveltejs/kit';

// export const handle:Handle = async function({ event, resolve }) {
//     if (event.url.pathname.startsWith(APP_PATH)) {
//         try {
// 			console.log("auth check", event.url.pathname);
// 			await checkAuth(event.fetch, event.cookies);
// 		}
// 		catch (error: any) {
// 			return redirect(SIGN_IN_PATH)
// 		}
//     }

//     const response = await resolve(event);
//     return response;
// }