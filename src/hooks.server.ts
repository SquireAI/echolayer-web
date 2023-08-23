import type { Handle, HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { nanoid } from 'nanoid';
import { createLogger } from '$lib/utils/logging';
import * as ddTrace from 'dd-trace';

ddTrace.init({
	service: 'my-app',
	agentUrl: 'http://localhost:8126'
});

const handleTracing: Handle = async ({ event, resolve }): Promise<Response> => {
	event.locals.traceId = nanoid(20);
	console.log(event);

	const ctx = {
		traceId: event.locals.traceId,
		method: event.request.method
	};
	const transports = [new ddTrace.plugins.winston.DDTraceTransport()];
	const logger = createLogger('echolayer', transports as [], ctx);
	console.log(logger);

	// getLogger('request', );
	return resolve(event);
};

export const handle = sequence(handleTracing);

export const handleFetch: HandleFetch = async ({ request, fetch, event }): Promise<Response> => {
	request.headers.set('X-Trace-Id', event.locals.traceId);
	return fetch(request);
};
