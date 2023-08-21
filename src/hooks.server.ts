import type { Handle, HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { nanoid } from 'nanoid';

const handleTracing: Handle = async ({ event, resolve }): Promise<Response> => {
	event.locals.traceId = nanoid(20);
	return resolve(event);
};

export const handle = sequence(handleTracing);

export const handleFetch: HandleFetch = async ({ request, fetch, event }): Promise<Response> => {
	request.headers.set('X-Trace-Id', event.locals.traceId);
	return fetch(request);
};
