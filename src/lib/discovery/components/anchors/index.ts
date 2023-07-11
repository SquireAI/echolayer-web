import type { AnchorConnection, NodeAnchorConnectionTuple } from "$lib/types";

export function toNodeConnections(anchors: AnchorConnection[]): NodeAnchorConnectionTuple {
	return anchors.map<[string, string]>((anchor) => ([anchor.targetNodeId, anchor.targetNodeAnchorId]));
}
