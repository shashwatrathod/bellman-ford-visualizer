import { createContext, useState } from "react";
import {
  addDirectedEdge,
  addSource,
  emptyGraph,
  IEdge,
  IGraph,
  NodeName,
} from "../utils/graph-utils";

export interface IGlobalGraphContext {
  globalGraph?: IGraph;
  createGlobalGraph?: (edges: IEdge[], source: NodeName) => void; //TODO
}

export const GlobalGraphContext = createContext<IGlobalGraphContext>({
  globalGraph: undefined,
  createGlobalGraph: undefined,
});

const GlobalGraphContextProvider = (props: any) => {
  const [globalGraph, setGlobalGraph] = useState<IGraph>();

  /**
   * Creates and sets a graph in the form of an adjacency list.
   * @param {} edges the list of edges
   * @param {*} source source node from where the shortest path is to be found.
   */
  const createGlobalGraph = (edges: IEdge[], source: NodeName) => {
    if (edges.length === 0) return;
    if (!source) return;

    const G = emptyGraph();

    edges.forEach((edge) => {
      addDirectedEdge(G, edge);
    });

    addSource(G, source);

    setGlobalGraph(G);
  };

  return (
    <>
      <GlobalGraphContext.Provider value={{ globalGraph, createGlobalGraph }}>
        {props.children}
      </GlobalGraphContext.Provider>
    </>
  );
};

export default GlobalGraphContextProvider;
