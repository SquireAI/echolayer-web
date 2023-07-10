import type { ComponentEntity, OriginAndComponentData} from "$lib/types";
import { data as sampleData } from '$lib/discovery/sample-data';
import type { PageServerLoad } from "./$types";

const components: ComponentEntity[] = sampleData.components;

export const load = (async ({ url }): Promise<OriginAndComponentData> => {
    const originId: string | null = url.searchParams.get('origin');

    // Find component with ID
    const origin: ComponentEntity | undefined = components.find(component => component.publicId === originId);

    return {
        ...(origin && {origin}),
    };
}) satisfies PageServerLoad;
