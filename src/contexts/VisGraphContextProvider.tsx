import { createContext, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useGlobalGraph from "../hooks/useGlobalGraph";
import {
  applyNextDpStep,
  applyNextEdgeStep,
  applyNextNodeStep,
  applyPrevDpStep,
  applyPrevEdgeStep,
  applyPrevNodeStep,
  IVisGraph,
  VisEdge,
  VisNode,
} from "../utils/vis-graph-utils";
import { cloneDeep } from "lodash";
import { IStep, NodeName } from "../utils/graph-utils";

export interface IVisGraphContext {
  graph?: IVisGraph;
  options?: any;
  graphKey?: string;
  applyNextStep?: (step: IStep) => void;
  applyPrevStep?: (step: IStep) => void;
  resetGraph?: () => void;
}

export const VisGraphContext = createContext<IVisGraphContext>({});

const defaultOptions: any = {
  layout: {
    randomSeed: 6,
    hierarchical: false,
  },
  edges: {
    smooth: {
      enabled: true,
      type: "dynamic",
      roundness: 1,
    },
    width: 2,
  },
  nodes: {
    shape: "circle",
    font: {
      face: "sans-serif",
      color: "#FAFAFA",
    },
    color: "#2F2F2F",
  },
  physics: {
    enabled: false,
  },
  height: "600px",
};

const VisGraphContextProvider = (props: any) => {
  const options = defaultOptions;
  const [graph, setGraphState] = useState<IVisGraph>();
  const [graphKey, setGraphKey] = useState(uuidv4());
  const { globalGraph } = useGlobalGraph();

  /**
   * Generates a new graphKey with a uuid. Use this method everytime before we update graph.
   * This is done to solve the issue where updating graph casues graph-vis to crash.
   * Ref: https://github.com/crubier/react-graph-vis/issues/92
   */
  const resetGraphKey = () => {
    setGraphKey(uuidv4());
  };

  /**
   * Sets the state variable graph and resets the graph key.
   * @param {} _graph the new graph
   */
  const setGraph = useCallback((_graph: IVisGraph | undefined) => {
    resetGraphKey();
    setGraphState(_graph);
  }, []);

  const createVisGraph = useCallback(() => {
    if (!globalGraph) {
      setGraph(undefined);
      return;
    }

    const edges: VisEdge[] = [];
    const uniqueNodes = new Set<NodeName>();
    const nodes: VisNode[] = [];

    for (let u in globalGraph.adj) {
      uniqueNodes.add(u);
      for (let v in globalGraph.adj[u]) {
        uniqueNodes.add(v);
        edges.push({
          from: u,
          to: v,
          label: `${globalGraph.adj[u][v]}`,
        });
      }
    }

    uniqueNodes.forEach((node) => {
      nodes.push({
        id: node,
        label: node,
      });
    });

    setGraph({
      nodes,
      edges,
    });
  }, [globalGraph, setGraph]);

  // If we have a new globalGraph, we want to update our vis graph to reflect that.
  useEffect(() => {
    createVisGraph();
  }, [globalGraph, createVisGraph]);

  const applyNextStep = (step: IStep) => {
    if (!step) return;

    if (graph === undefined) return;

    const _graph = cloneDeep(graph);

    if (step?.nodes) {
      step.nodes.forEach((nodeStep) => applyNextNodeStep(_graph, nodeStep));
    }

    if (step?.edges) {
      step.edges.forEach((edgeStep) => applyNextEdgeStep(_graph, edgeStep));
    }

    if (step?.dp) {
      step.dp.forEach((dpStep) => applyNextDpStep(_graph, dpStep));
    }

    setGraph(_graph);
  };

  const applyPrevStep = (step: IStep) => {
    if (!step) return;

    if (graph === undefined) return;

    const _graph = cloneDeep(graph);

    if (step?.nodes) {
      step.nodes.forEach((nodeStep) => applyPrevNodeStep(_graph, nodeStep));
    }

    if (step?.edges) {
      step.edges.forEach((edgeStep) => applyPrevEdgeStep(_graph, edgeStep));
    }

    if (step?.dp) {
      step.dp.forEach((dpStep) => applyPrevDpStep(_graph, dpStep));
    }

    setGraph(_graph);
  };

  return (
    <>
      <VisGraphContext.Provider
        value={{
          graph,
          options,
          graphKey,
          applyNextStep,
          applyPrevStep,
          resetGraph: createVisGraph,
        }}
      >
        {props.children}
      </VisGraphContext.Provider>
    </>
  );
};
export default VisGraphContextProvider;
