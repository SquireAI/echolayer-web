export const INVALIDATE_QUERY_PARAMETER_NAME = 'invalidate';
export const INVALIDATE_SELECTED_ORG = 'invalid-org';

export const SIGN_IN_PATH = '/sign-in';
export const INVALIDATED_SIGN_IN_PATH = `/sign-in?${INVALIDATE_QUERY_PARAMETER_NAME}`;
export const NOT_FOUND_PATH = '/not-found';
export const ERROR_PATH = '/error';
export const AUTH_ERROR_PATH = '/auth-error';
export const HOME_PATH = '/';
export const REPOSITORIES_PATH = '/repositories';
export const COMPONENTS_PATH = '/components';
export const TEAMS_PATH = '/teams';
export const MEMBERS_PATH = '/members';
export const ONBOARDING_PATH = '/onboarding';
export const ORGS_PATH = '/org';
export const ORGS_SELECT_PATH = '/org/select';
export const ORGS_SELECT_PATH_WITH_INVALIDATE = `${ORGS_SELECT_PATH}?${INVALIDATE_SELECTED_ORG}`;
export const CREATE_ORG_PATH = '/org/new';
export const ACCOUNT_PATH = '/account';
export const API_KEYS_PATH = '/org/api';
export const DISCOVERY_PATH = '/explore';
export const INTEGRATIONS_PATH = '/org/integrations';
export const GITLAB_SETUP_PATH = '/org/integrations/gitlab/setup';
export const INTEGRATIONS_PATH_WITH_INVALIDATE = `${INTEGRATIONS_PATH}?${INVALIDATE_QUERY_PARAMETER_NAME}`;
export const ISSUES_PATH = '/issues';

export const REDIRECT_PATHS = [
	SIGN_IN_PATH,
	NOT_FOUND_PATH,
	ERROR_PATH,
	AUTH_ERROR_PATH,
	HOME_PATH,
	ORGS_PATH,
	CREATE_ORG_PATH,
	ACCOUNT_PATH,
	API_KEYS_PATH,
	DISCOVERY_PATH,
	INTEGRATIONS_PATH,
	ISSUES_PATH
] as const;

export type RedirectPath = (typeof REDIRECT_PATHS)[number];

// External URLs
export const NOTION_GETTING_STARTED_DOCS =
	'https://www.notion.so/codexbuild/Getting-Started-with-EchoLayer-45a7d6384b56477b9d25862a6c7398d7?pvs=4';
export const SUPPORT_URL = 'mailto:support@echolayer.com';
export const NOTION_GITLAB_SETUP_DOCS =
	'https://codexbuild.notion.site/codexbuild/GitLab-Integration-Usage-Guide-c526d056c60a4655ba3119c719f78610';
