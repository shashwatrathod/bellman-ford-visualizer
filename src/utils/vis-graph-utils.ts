import { cloneDeep } from "lodash";
import {
  EdgeStatus,
  IDpStep,
  IEdgeStep,
  INodeStep,
  NodeStatus,
} from "./graph-utils";

const SUCCESS_COLOR = "#4CAF50";
const SOURCE_COLOR = "#2196F3";
const REJECT_COLOR = "#F4511E";
const NORMAL_COLOR = "#2F2F2F";
const VISITING_COLOR = "#FFC107";

//TODO: figure out types for visgraph

export const applyNextNodeStep = (_graph: any, nodeStep: INodeStep) => {
  let _nodes = cloneDeep(_graph.nodes);

  let nodeIdx = _nodes.findIndex((node: any) => node.id === nodeStep.node);

  if (nodeIdx >= 0) {
    _nodes[nodeIdx] = {
      ..._nodes[nodeIdx],
      ...getNodeConfigForStatus(nodeStep.status),
    };

    _graph.nodes = _nodes;
  }
};

export const applyNextEdgeStep = (_graph: any, edgeStep: IEdgeStep) => {
  let _edges = cloneDeep(_graph.edges);

  let edgeIdx = _edges.findIndex(
    (edge: any) => edge.from === edgeStep.from && edge.to === edgeStep.to
  );

  if (edgeIdx >= 0) {
    _edges[edgeIdx] = {
      ..._edges[edgeIdx],
      ...getEdgeConfigForStatus(edgeStep.status),
    };
  }

  _graph.edges = _edges;
};

export const applyNextDpStep = (_graph: any, dpStep: IDpStep) => {
  let _nodes = cloneDeep(_graph.nodes);

  let nodeIdx = _nodes.findIndex((node: any) => node.id === dpStep.node);

  if (nodeIdx >= 0) {
    _nodes[nodeIdx] = {
      ..._nodes[nodeIdx],
      label: `${_nodes[nodeIdx].id} : ${
        dpStep.val === Infinity ? "inf" : dpStep.val
      }`,
    };
  }

  _graph.nodes = _nodes;
};

const getEdgeConfigForStatus = (status: EdgeStatus) => {
  switch (status) {
    case EdgeStatus.NORMAL:
      return {
        color: NORMAL_COLOR,
      };
    case EdgeStatus.VISITING:
      return {
        color: VISITING_COLOR,
      };
    case EdgeStatus.UPDATED:
      return {
        color: SUCCESS_COLOR,
      };
    case EdgeStatus.REJECTED:
      return {
        color: REJECT_COLOR,
      };
    default:
      return;
  }
};

const getNodeConfigForStatus = (status: NodeStatus) => {
  switch (status) {
    case NodeStatus.NORMAL:
      return {
        color: NORMAL_COLOR,
      };
    case NodeStatus.SOURCE:
      return {
        color: SOURCE_COLOR,
      };
    case NodeStatus.UPDATED:
      return {
        color: SUCCESS_COLOR,
      };
    default:
      return null;
  }
};