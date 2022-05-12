// Graph representation:
// G[n] = |V|
// G[m] = |E|
// G[adj] contains the actual graph in terms of adjacency list
// G[adj][u] = {v1: w1, v2: w2, ...} where vi is destination and wi is weight of edge (u, vi).

/**
 * Creates and returns an empty graph
 * @returns the new empty Graph
 */
export const emptyGraph = () => {
  const G = {
    n: 0,
    m: 0,
    adj: {},
  };

  return G;
};

/**
 * Adds a new node to the graph and increases 'n' by 1 if it doesnt already exists.
 * @param {*} G the graph
 * @param {*} x new node to be added
 */
export const addNode = (G, x) => {
  if (G.adj[x] === undefined) {
    G.adj[x] = {};
    G.n += 1;
  }
};

/**
 * Adds a new directed edge from source to destination with the given weight such that G.adj[src][dest] === weight
 * Adds source and destination to the graph if the nodes don't already exist.
 * Also increases the number of edges 'm' by 1.
 *
 * @param {*} G the graph
 * @param {*} src source of the edge
 * @param {*} dest destination of the edge
 * @param {*} weight weight of the edge
 */
export const addDirectedEdge = (G, src, dest, weight) => {
  addNode(G, src);
  addNode(G, dest);

  G.adj[src][dest] = weight;
  G.m += 1;
};
