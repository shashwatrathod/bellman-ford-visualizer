// Graph representation:
// G[n] = |V|
// G[m] = |E|
// G[source] = source of the BF
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
 * Designates a source to the graph.
 * Fails to assign a node as source a if there are no outgoing edges from the source
 * in the graph.
 * @param {} G 
 * @param {*} source 
 */
export const addSource = (G, source) => {
  if (!source) return;

  if (G.adj[source] === undefined) return;

  G.source = source;
}

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

export const bellmanFord = (G, s) => {
  const n = G.n;

  const d = [];

  for (let i = 0; i < n; i++) {
    d.push({});
  }

  for (let u in G.adj) {
    d[0][u] = Infinity;
  }

  d[0][s] = 0;

  const parent = {};
  parent[s] = null;

  for (let i = 1; i < n; i++) {
    for (let v in G.adj) {
      d[i][v] = d[i - 1][v];
    }
    for (let u in G.adj) {
      for (let v in G.adj[u]) {
        const newLength = d[i - 1][u] + G.adj[u][v];
        if (newLength < d[i][v]) {
          d[i][v] = newLength;
          parent[v] = u;
        }
      }
    }
  }

  return { distances: d, parent };
};