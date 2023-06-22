export const INVALIDATE_QUERY_PARAMETER_NAME = "invalidate";

export const SIGN_IN_PATH = "/sign-in";
export const INVALIDATED_SIGN_IN_PATH = `/sign-in?${INVALIDATE_QUERY_PARAMETER_NAME}`;
export const NOT_FOUND_PATH = "/not-found";
export const ERROR_PATH = "/error";
export const AUTH_ERROR_PATH = "/auth-error";
export const APP_PATH = "/app";
export const ORGS_PATH =  "/app/org";
export const CREATE_ORG_PATH = "/app/org/new";
export const ACCOUNT_PATH = "/app/account";
export const PERSONAL_ACCESS_TOKENS_PATH = "/app/account/personal-access-tokens";

export const REDIRECT_PATHS = [
	SIGN_IN_PATH,
	NOT_FOUND_PATH,
	ERROR_PATH,
	AUTH_ERROR_PATH,
	APP_PATH,
	ORGS_PATH,
	CREATE_ORG_PATH,
	ACCOUNT_PATH,
	PERSONAL_ACCESS_TOKENS_PATH
] as const;

export type RedirectPath = typeof REDIRECT_PATHS[number];