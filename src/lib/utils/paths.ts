export const INVALIDATE_QUERY_PARAMETER_NAME = 'invalidate';
export const INVALIDATE_SELECTED_ORG = 'invalid-org';

export const SIGN_IN_PATH = '/sign-in';
export const INVALIDATED_SIGN_IN_PATH = `/sign-in?${INVALIDATE_QUERY_PARAMETER_NAME}`;
export const NOT_FOUND_PATH = '/not-found';
export const ERROR_PATH = '/error';
export const AUTH_ERROR_PATH = '/auth-error';
export const APP_PATH = '/app';
export const ORGS_PATH = '/app/org';
export const ORGS_SELECT_PATH = '/app/org/select';
export const ORGS_SELECT_PATH_WITH_INVALIDATE = `${ORGS_SELECT_PATH}?${INVALIDATE_SELECTED_ORG}`;
export const CREATE_ORG_PATH = '/app/org/new';
export const ACCOUNT_PATH = '/app/account';
export const API_KEYS_PATH = '/app/account/api-keys';
export const DISCOVERY_HOME_PATH = '/discovery/home';
export const DISCOVERY_PATH = '/discovery';
export const INTEGRATIONS_PATH = '/app/account/integrations';

export const REDIRECT_PATHS = [
	SIGN_IN_PATH,
	NOT_FOUND_PATH,
	ERROR_PATH,
	AUTH_ERROR_PATH,
	APP_PATH,
	ORGS_PATH,
	CREATE_ORG_PATH,
	ACCOUNT_PATH,
	API_KEYS_PATH,
	DISCOVERY_HOME_PATH,
	DISCOVERY_PATH,
	INTEGRATIONS_PATH
] as const;

export type RedirectPath = (typeof REDIRECT_PATHS)[number];

// External URLs
export const NOTION_GETTING_STARTED_DOCS =
	'https://www.notion.so/codexbuild/Getting-Started-with-EchoLayer-45a7d6384b56477b9d25862a6c7398d7?pvs=4';
export const SUPPORT_URL = 'mailto:support@echolayer.com';
