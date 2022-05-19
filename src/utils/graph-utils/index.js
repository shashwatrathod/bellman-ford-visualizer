// Graph representation:
// G[n] = |V|
// G[m] = |E|
// G[source] = source of the BF
// G[adj] contains the actual graph in terms of adjacency list
// G[adj][u] = {v1: w1, v2: w2, ...} where vi is destination and wi is weight of edge (u, vi).


export const nodeStatuses = {
  NORMAL: 0,
  UPDATED: 1,
  SOURCE: 2,
};

export const edgeStatuses = {
  NORMAL: 0,
  VISITING: 1,
  UPDATED: 2,
  REJECTED: 3,
};

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

const dpChangeStep = (iteration, node, newVal, previousVal) => ({
  iteration,
  node,
  val: newVal,
  previous: previousVal,
});

const parentChangeStep = (node, newParent, oldParent) => ({
  node,
  parent: newParent,
  oldParent,
});

const nodeChangeStep = (node, newStatus, previousStatus) => ({
  node,
  status: newStatus,
  previousStatus,
});

const edgeChangeStep = (from, to, newStatus, previousStatus) => ({
  from,
  to,
  status: newStatus,
  previousStatus,
});

// One bellman ford step can have multiple values.
// 1. Node that is being changed
// 2. DP change
// 3. Parent change
// 4. Edge change
// Can look something like step = {
//    nodes: [{}],
//   edges: [{}],
//   dp: [{}],
//   parent: [{}]
// }

/**
 * Executes the BF SSSP algorithm on the given graph. Returns the `steps`  it took to
 * reach the results, the resultant distances matrix and the parents list.
 *
 * @param {*} G the graph
 * @param {*} s the source from which BF is to be executed.
 */
export const bellmanFord = (G, s) => {
  // When the steps are generated:
  // 1. Initialize source, dp and parent
  //    2. Carry over distances from previous steps
  //        3. Mark an edge as being visited
  //        4. If updated:
  //            Mark as updated
  //           else:
  //            Mark as rejected
  //        5. Revert back to normal

  const n = G.n;

  const d = [];

  const steps = [];

  // initialize the dp
  for (let i = 0; i < n; i++) {
    d.push({});
  }

  const initializeDpStep = [];
  for (let u in G.adj) {
    d[0][u] = Infinity;
    initializeDpStep.push(dpChangeStep(0, u, Infinity, undefined));
  }

  d[0][s] = 0;
  initializeDpStep.push(dpChangeStep(0, s, 0, undefined));

  const parent = {};
  parent[s] = null;
  const initializeParentStep = [parentChangeStep(s, "null", undefined)];

  const initializeSourceNodeStep = [
    nodeChangeStep(s, nodeStatuses.SOURCE, nodeStatuses.NORMAL),
  ];

  steps.push({
    nodes: initializeSourceNodeStep,
    dp: initializeDpStep,
    parent: initializeParentStep,
  });

  for (let i = 1; i < n; i++) {
    const carryOverDistancesStep = [];
    for (let v in G.adj) {
      d[i][v] = d[i - 1][v];
      carryOverDistancesStep.push(dpChangeStep(i, v, d[i][v], undefined));
    }

    // Step to initialize a new column in the DP table
    steps.push({ dp: carryOverDistancesStep });

    for (let u in G.adj) {
      for (let v in G.adj[u]) {
        // Step to mark this edge as being visited
        steps.push({
          edges: [
            edgeChangeStep(u, v, edgeStatuses.VISITING, edgeStatuses.NORMAL),
          ],
        });

        const newLength = d[i - 1][u] + G.adj[u][v];
        if (newLength < d[i][v]) {
          const oldLen = d[i][v];
          const oldParent = parent[v] || undefined;
          d[i][v] = newLength;
          parent[v] = u;

          //Step to show that update to distances was accepted
          const dpSteps = [dpChangeStep(i, v, newLength, oldLen)];
          const parentSteps = [parentChangeStep(v, u, oldParent)];
          const nodeSteps = [
            nodeChangeStep(v, nodeStatuses.UPDATED, nodeStatuses.NORMAL),
          ];
          const edgeSteps = [
            edgeChangeStep(u, v, edgeStatuses.UPDATED, edgeStatuses.VISITING),
          ];

          steps.push({
            nodes: nodeSteps,
            dp: dpSteps,
            parent: parentSteps,
            edges: edgeSteps,
          });

          // Step to revert nodes and edges back to their original state
          const edgeRevertStep = [
            edgeChangeStep(u, v, edgeStatuses.NORMAL, edgeStatuses.UPDATED),
          ];
          const nodeRevertStep = [
            nodeChangeStep(v, nodeStatuses.NORMAL, nodeStatuses.UPDATED),
          ];

          steps.push({
            nodes: nodeRevertStep,
            edges: edgeRevertStep,
          });
        } else {
          //Step to show that the update was rejected
          const edgeSteps = [
            edgeChangeStep(u, v, edgeStatuses.REJECTED, edgeStatuses.VISITING),
          ];
          steps.push({
            edges: edgeSteps,
          });

          //Step to revert the edges back to normal state
          const edgeRevertSteps = [
            edgeChangeStep(u, v, edgeStatuses.NORMAL, edgeStatuses.REJECTED),
          ];
          steps.push({
            edges: edgeRevertSteps,
          });
        }
      }
    }
  }

  return { steps, distances: d, parent };
};