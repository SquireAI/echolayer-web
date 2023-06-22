import { PUBLIC_BASE_API_URL } from '$env/static/public';
import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (async ({ error, event }) => {
    fetch(`${PUBLIC_BASE_API_URL}telemetry/exception`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            error: {
              error,
              event,
            },
            source: "sveltekit"
        }),
    })

    return {
        message: 'Whoops!',
    };
}) satisfies HandleServerError;