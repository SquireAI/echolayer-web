import type { Component, OriginAndComponentData } from "$lib/types";
import type { PageServerLoad } from './$types';

const components: Component[] = [
    {id: 1, organizationId: 1, name: "component 1", metadata: {}},
    {id: 2, organizationId: 2, name: "component 2", metadata: {}},
    {id: 3, organizationId: 3, name: "component 3", metadata: {}},
];

export const load = (async ({url}): Promise<OriginAndComponentData> => {
    const originId: string | null = url.searchParams.get('origin');
    const originType: string | null = url.searchParams.get('originType');

    // Find component with ID
    const origin: Component | undefined = components.find(component => component.id === Number(originId));

    return {
        ...(origin && {origin}),
    };
}) satisfies PageServerLoad;
