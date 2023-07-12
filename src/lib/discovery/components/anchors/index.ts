import type { AnchorConnection } from "$lib/types";
import type { Connections } from "svelvet";

export function toNodeConnections(anchors: AnchorConnection[]): Connections {
	console.log("anchors", anchors);
	const bar = anchors.map((anchor) => {
		const values = Object.values(anchor);
		console.log("values", values);
		return values;
	});
	console.log("bar", bar);
	// @ts-ignore
	return [...bar] as Connections;
}
