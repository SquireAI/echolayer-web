import type { Handle, HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { nanoid } from 'nanoid';
import { createLogger, getContext, RequestContext } from '$lib/utils/logging';

const handleTracing: Handle = async ({ event, resolve }): Promise<Response> => {
	event.locals.traceId = nanoid(20);
	const ctx: RequestContext = getContext(event, event.locals.traceId);
	const logger = createLogger('echolayer', ctx);
	logger.info('request', {});

	// getLogger('request', );
	return resolve(event);
};

export const handle = sequence(handleTracing);

export const handleFetch: HandleFetch = async ({ request, fetch, event }): Promise<Response> => {
	request.headers.set('X-Trace-Id', event.locals.traceId);
	return fetch(request);
};
