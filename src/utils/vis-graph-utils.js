import { cloneDeep } from "lodash";
import { nodeStatuses } from "./graph-utils";

const SUCCESS_COLOR = "#4CAF50";
const SOURCE_COLOR = "#2196F3";
const REJECT_COLOR = "#F4511E";
const NORMAL_COLOR = "#2F2F2F";

export const nextNodeStep = (_graph, nodeStep) => {
  let _nodes = cloneDeep(_graph.nodes);

  let nodeIdx = _nodes.findIndex((node) => node.id === nodeStep.node);

  if (nodeIdx >= 0) {
    _nodes[nodeIdx] = {
      ..._nodes[nodeIdx],
      ...nodeConfigOnStatus(nodeStep.status),
    };

    _graph.nodes = _nodes;
  }
};

const nodeConfigOnStatus = (status) => {
  switch (status) {
    case nodeStatuses.NORMAL:
      return {
        color: NORMAL_COLOR,
      };
    case nodeStatuses.SOURCE:
      return {
        color: SOURCE_COLOR,
      };
    case nodeStatuses.UPDATED:
      return {
        color: SUCCESS_COLOR,
      };
    default:
      return null;
  }
};
