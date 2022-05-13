import { addDirectedEdge, bellmanFord, emptyGraph } from ".";

export const testBellmanFord = () => {
  const G = emptyGraph();

  addDirectedEdge(G, 1, 2, 4);
  addDirectedEdge(G, 1, 4, 5);
  addDirectedEdge(G, 4, 3, 3);
  addDirectedEdge(G, 3, 2, -10);
  addDirectedEdge(G, 2, 4, 5);

  const { distances, parent } = bellmanFord(G, 1);

  console.log(distances);
  console.log(parent);
};
