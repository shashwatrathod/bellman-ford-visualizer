import { createContext, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useGlobalGraph from "../hooks/useGlobalGraph";
import {
  nextDpStep,
  nextEdgeStep,
  nextNodeStep,
} from "../utils/vis-graph-utils";
import { cloneDeep } from "lodash";

export const VisGraphContext = createContext({
  graph: undefined,
  options: undefined,
  graphKey: undefined,
  next: undefined,
  resetGraph: undefined,
});

const defaultOptions = {
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

const VisGraphContextProvider = (props) => {
  const options = defaultOptions;
  const [graph, setGraphState] = useState();
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
  const setGraph = useCallback((_graph) => {
    resetGraphKey();
    setGraphState(_graph);
  }, []);

  const createVisGraph = useCallback(() => {
    if (!globalGraph) {
      setGraph(undefined);
      return;
    }

    const edges = [];
    const uniqueNodes = new Set();
    const nodes = [];

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

  const next = (step) => {
    if (!step) return;

    const _graph = cloneDeep(graph);

    if (step?.nodes) {
      step.nodes.forEach((nodeStep) => nextNodeStep(_graph, nodeStep));
    }

    if (step?.edges) {
      step.edges.forEach((edgeStep) => nextEdgeStep(_graph, edgeStep));
    }

    if (step?.dp) {
      step.dp.forEach((dpStep) => nextDpStep(_graph, dpStep));
    }

    setGraph(_graph);
  };

  return (
    <>
      <VisGraphContext.Provider
        value={{ graph, options, graphKey, next, resetGraph: createVisGraph }}
      >
        {props.children}
      </VisGraphContext.Provider>
    </>
  );
};
export default VisGraphContextProvider;
