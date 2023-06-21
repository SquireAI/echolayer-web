export const ErrorMessageTypes = {
	GENERIC: "GENERIC",
	UNAUTHORIZED: "UNAUTHORIZED",
	GITHUB_OAUTH_CODE: "GITHUB_OAUTH_CODE",
	ECHOLAYER_AUTH: "ECHOLAYER_AUTH"
}

export type ErrorMessageType = typeof ErrorMessageTypes[keyof typeof ErrorMessageTypes];

type TypedErrorMessage = {
	[key: ErrorMessageType]: string
}
export const ErrorMessages: TypedErrorMessage = {
	GENERIC: "Something went wrong. Please refresh the page and try again.",
	UNAUTHORIZED: "Unauthorized",
	GITHUB_OAUTH_CODE: "GitHub was unable to authenticate you. Please try again.",
	ECHOLAYER_AUTH: "We could not authenticate you with GitHub at this time. Please try again.",
};

export function isErrorMessageType(type: string): boolean {
	return Object.keys(ErrorMessageTypes).some((key) => key === type);
}

export function getErrorMessage(type: ErrorMessageType): string {
	return ErrorMessages[type];
}

