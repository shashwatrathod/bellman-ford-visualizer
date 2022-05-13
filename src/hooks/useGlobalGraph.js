import React, { useState } from "react";
import { addDirectedEdge, addSource, emptyGraph } from "../graph-utils";

const useGlobalGraph = () => {
  const [globalGraph, setGlobalGraph] = useState();

  /**
   * Creates and sets a graph in the form of an adjacency list.
   * @param {} edges the list of edges
   * @param {*} source source node from where the shortest path is to be found.
   */
  const createGlobalGraph = (edges, source) => {
    if (edges.length === 0) return;
    if (!source) return;

    const G = emptyGraph();

    edges.forEach((edge) => {
      addDirectedEdge(G, edge.src, edge.dest, edge.weight);
    });

    addSource(G, source);

    setGlobalGraph(G);
  };

  return { globalGraph, createGlobalGraph };
};

export default useGlobalGraph;
