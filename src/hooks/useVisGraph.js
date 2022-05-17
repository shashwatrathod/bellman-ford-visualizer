import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import useGlobalGraph from "./useGlobalGraph";
import { v4 as uuidv4 } from "uuid";

const defaultOptions = {
  layout: {
    hierarchical: false,
  },
  edges: {
    smooth: {
      enabled: true,
      type: "dynamic",
      roundness: 1,
    },
  },
  height: "800px",
};

const useVisGraph = () => {
  const [options, setOptions] = useState(defaultOptions);
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
  const setGraph = (_graph) => {
    resetGraphKey();
    setGraphState(_graph);
  };

  // If we have a new globalGraph, we want to update our vis graph to reflect that.
  useEffect(() => {
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
  }, [globalGraph]);

  

  return { graph, options, graphKey };
};

export default useVisGraph;
