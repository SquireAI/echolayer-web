import setCookie from "set-cookie-parser";
import type { CookieSerializeOptions } from "cookie";

export function getCookies(response: Response) {
	const cookieHeader = response.headers.get("set-cookie") || "";

	const cookies = setCookie.parse(setCookie.splitCookiesString(cookieHeader));
	return cookies;
}

export function normalizeCookie(cookie: setCookie.Cookie): CookieSerializeOptions {
	return {
		domain: cookie.domain,
		expires: cookie.expires,
		httpOnly: cookie.httpOnly,
		maxAge: cookie.maxAge,
		path: cookie.path,
		sameSite: parseSameSite(cookie.sameSite),
		secure: cookie.secure,
	};
}

export function parseSameSite(sameSite: string | undefined): CookieSerializeOptions["sameSite"] {
	switch (sameSite?.toLocaleLowerCase()) {
		case "strict":
			return "strict";
		case "lax":
			return "lax";
		case "none":
			return "none";
		default:
			return undefined;
	}
}