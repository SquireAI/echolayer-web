import setCookie from 'set-cookie-parser';
import type { CookieSerializeOptions } from 'cookie';
import { removeCookie, setCookie as setBrowserCookie } from 'typescript-cookie';
import { ORGANIZATION_ID_COOKIE_NAME } from '$lib/constants';
import { env } from '$env/dynamic/public';
import type { Cookies } from '@sveltejs/kit';

export function getCookies(response: Response) {
	const cookieHeader = response.headers.get('set-cookie') || '';

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
		secure: cookie.secure
	};
}

export function parseSameSite(sameSite: string | undefined): CookieSerializeOptions['sameSite'] {
	switch (sameSite?.toLocaleLowerCase()) {
		case 'strict':
			return 'strict';
		case 'lax':
			return 'lax';
		case 'none':
			return 'none';
		default:
			return undefined;
	}
}

/**
 * Set a **browser** cookie to capture the current selected organization for the user.
 * @param publicId Organization PublicId
 */
export function setOrgCookie(publicId: string) {
	if (!document) {
		// TODO: Throw error if in development.
		return;
	}

	setBrowserCookie(ORGANIZATION_ID_COOKIE_NAME, publicId, { expires: 7, path: '/' });
}

export function removeOrgCookie() {
	if (!document) {
		return;
	}
	removeCookie(ORGANIZATION_ID_COOKIE_NAME, { path: '/' });
}

export function setServerOrgCookie(publicId: string, setCookie: Cookies['set']) {
	const inOneWeek = new Date();
	inOneWeek.setDate(inOneWeek.getDate() + 7);
	setCookie(ORGANIZATION_ID_COOKIE_NAME, publicId, {
		expires: inOneWeek,
		path: '/',
		httpOnly: false
	});
}
