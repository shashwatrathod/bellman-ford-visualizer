import {
  addDirectedEdge,
  bellmanFord,
  emptyGraph,
  IEdge,
  NodeName,
} from "./index";

export const testBellmanFord = () => {
  const G = emptyGraph();

  const getEdge = (src: NodeName, dest: NodeName, weight: number): IEdge => ({
    src,
    dest,
    weight,
  });

  addDirectedEdge(G, getEdge(1, 2, 4));
  addDirectedEdge(G, getEdge(1, 4, 5));
  addDirectedEdge(G, getEdge(4, 3, 3));
  addDirectedEdge(G, getEdge(3, 2, -10));
  addDirectedEdge(G, getEdge(2, 4, 5));

  const { distances, parent } = bellmanFord(G, 1);

  console.log(distances);
  console.log(parent);
};
