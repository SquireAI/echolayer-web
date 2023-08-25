import { ComponentApi } from '$lib/api/component';
import { RelationsGraphApi } from '$lib/api/relationsGraph';
import { TeamApi } from '$lib/api/team';
import { getHttpContext } from '$lib/http/context';
import type {
	BaseContextData,
	GraphedEntity,
	OriginAndComponentData,
	RelationGraphEntity
} from '$lib/types';
import { HOME_PATH } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { flagRequired } from '$lib/utils/access';

export const load = (async ({
	url,
	cookies,
	fetch
}): Promise<BaseContextData & OriginAndComponentData> => {
	const context = getHttpContext(fetch, cookies);

	const teamApi = new TeamApi(context);
	const graphApi = new RelationsGraphApi(context);
	const componentApi = new ComponentApi(context);

	const teams = await teamApi.list();
	const components = await componentApi.list();

	const originId: string | null = url.searchParams.get('origin');
	const selectedId: string | null = url.searchParams.get('selected');

	let relations: RelationGraphEntity[] = [];
	let origin: GraphedEntity | undefined;
	let selected: GraphedEntity | undefined;

	if (originId) {
		// Find component with ID
		origin = [...components, ...teams].find((component) => component.publicId === originId);

		if (origin) {
			relations = await graphApi.list({ sourcePublicId: origin?.publicId, depth: 2 });
			relations = relations.filter(
				(relation) =>
					relation.relationshipName !== 'hasMember' && relation.relationshipName !== 'memberOf'
			);
		} else throw redirect(307, HOME_PATH);
	} else throw redirect(307, HOME_PATH);

	if (selectedId) {
		// Find component with ID
		selected = [...components, ...teams].find((component) => component.publicId === selectedId);
	}

	const { baseHeaders, baseUrl } = context;
	return {
		baseHeaders,
		baseUrl,
		...(teams && { teams }),
		...(components && { components }),
		...(origin && { origin }),
		...(selected && { selected }),
		...(relations && { relations })
	};
}) satisfies PageServerLoad;
