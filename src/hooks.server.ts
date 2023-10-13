import type { Handle, HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { nanoid } from 'nanoid';
import { type RequestContext, getRequestContext, Logger } from '$lib/utils/logging';

// Initialize logger
const logger = new Logger('echolayer');

const handleTracing: Handle = async ({ event, resolve }): Promise<Response> => {
	event.locals.traceId = nanoid(20);
	event.locals.orgId = event.cookies.get('ORGANIZATION-ID') || null;

	if (logger) {
		// Add request context to logger
		const ctx: RequestContext = getRequestContext(event, event.locals.traceId);

		logger.info(`Request: ${event.url.pathname}`, {
			...(event.locals.orgId ? { organizationId: event.locals.orgId } : {}),
			...(ctx ? { request: ctx } : {})
		});
	}

	return resolve(event);
};

export const handle = sequence(handleTracing);

export const handleFetch: HandleFetch = async ({ request, fetch, event }): Promise<Response> => {
	request.headers.set('X-Trace-Id', event.locals.traceId);
	return fetch(request);
};
