import { json } from '@sveltejs/kit';
import { LoopsApi } from '$lib/api/loops';
import { LOOPS_API_KEY } from '$env/static/private';

export async function POST({ request }) {
	const data = await request.json();
	const res = await new LoopsApi(LOOPS_API_KEY).subscribe(data);
	return json(res);
}
