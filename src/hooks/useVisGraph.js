import React, { useEffect, useState } from "react";
import useGlobalGraph from "./useGlobalGraph";

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
};

const useVisGraph = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [graph, setGraph] = useState();

  const { globalGraph } = useGlobalGraph();

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

    console.log({
      nodes,
      edges,
    });
  }, [globalGraph]);

  return { graph, options };
};

export default useVisGraph;
