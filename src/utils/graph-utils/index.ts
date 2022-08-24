// IGraph representation:
// G[n] = |V|
// G[m] = |E|
// G[source] = source of the BF
// G[adj] contains the actual graph in terms of adjacency list
// G[adj][u] = {v1: w1, v2: w2, ...} where vi is destination and wi is weight of edge (u, vi).

export enum NodeStatus {
  NORMAL = 0,
  UPDATED = 1,
  SOURCE = 2,
}

export enum EdgeStatus {
  NORMAL = 0,
  VISITING = 1,
  UPDATED = 2,
  REJECTED = 3,
}

export interface IEdge {
  src: NodeName;
  dest: NodeName;
  weight: number;
}
export interface IGraph {
  n: number;
  m: number;
  adj: {
    [source: NodeName]: {
      [destination: NodeName]: number;
    };
  };
  source?: NodeName;
}

/**
 * Represents the parent matrix.
 * Basically an object with node name as it's key and the
 * name of that node's parent as it's value.
 */
export interface IParentMatrix {
  [node: NodeName]: NodeName | null | undefined;
}

/**
 * Represents change in the distance matrix for one node
 * that occured on some iteration.
 */
export interface IDpStep {
  // current iteraction
  iteration: number;
  // name of the node for which the step is being changed
  node: NodeName;
  // the new value of the distance
  val: number;
  // the previous value of the distance
  previous?: number;
}

/**
 * Represents the change in parents matrix for one node
 */
export interface IParentStep {
  // name of the node in question
  node: NodeName;
  // new parent of the node
  parent: NodeName;
  // previous parent of the node
  oldParent?: NodeName;
}

/**
 * Represents change in status of a node during some iteration.
 * Mainly used for coloring nodes in the graph.
 */
export interface INodeStep {
  node: NodeName;
  status: NodeStatus;
  previousStatus?: NodeStatus;
}

/**
 * Represents the change in status of an edge during some iteraction.
 * Mainly used for coloring edges in the graph.
 */
export interface IEdgeStep {
  from: NodeName;
  to: NodeName;
  status: EdgeStatus;
  previousStatus?: EdgeStatus;
}

export interface IDistanceMatrixColumn {
  [key: NodeName]: number;
}

export type DistanceMatrix = IDistanceMatrixColumn[];

export type BellmanFordResult = {
  steps: IStep[];
  distances: DistanceMatrix;
  parent: IParentMatrix;
};

export interface IStep {
  nodes?: INodeStep[];
  dp?: IDpStep[];
  parent?: IParentStep[];
  edges?: IEdgeStep[];
}

export type NodeName = number | string;

/**
 * Creates and returns an empty graph
 * @returns the new empty Graph
 */
export const emptyGraph = (): IGraph => {
  const G: IGraph = {
    n: 0,
    m: 0,
    adj: {},
  };

  return G;
};

/**
 * Adds a new node to the graph and increases 'n' by 1 if it doesnt already exists.
 * Modifies the graph inplace; does not return anything
 * @param {IGraph} G the graph
 * @param {number | string} x new node to be added
 */
export const addNode = (G: IGraph, x: NodeName) => {
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
export const addSource = (G: IGraph, source: NodeName) => {
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
export const addDirectedEdge = (G: IGraph, edge: IEdge) => {
  addNode(G, edge.src);
  addNode(G, edge.dest);

  G.adj[edge.src][edge.dest] = edge.weight;
  G.m += 1;
};

const getDpStep = (
  iteration: number,
  node: NodeName,
  newVal: number,
  previousVal?: number
): IDpStep => ({
  iteration,
  node,
  val: newVal,
  previous: previousVal,
});

const getParentStep = (
  node: NodeName,
  newParent: NodeName,
  oldParent?: NodeName
): IParentStep => ({
  node,
  parent: newParent,
  oldParent,
});

const getNodeStep = (
  node: NodeName,
  newStatus: NodeStatus,
  previousStatus?: NodeStatus
): INodeStep => ({
  node,
  status: newStatus,
  previousStatus,
});

const getEdgeStep = (
  from: NodeName,
  to: NodeName,
  newStatus: EdgeStatus,
  previousStatus?: EdgeStatus
): IEdgeStep => ({
  from,
  to,
  status: newStatus,
  previousStatus,
});

/**
 * Executes the BF SSSP algorithm on the given graph. Returns the `steps`  it took to
 * reach the results, the resultant distances matrix and the parents list.
 *
 * @param {IGraph} G the graph
 * @param {NodeName} s the source from which BF is to be executed.
 */
export const bellmanFord = (G: IGraph, s: NodeName): BellmanFordResult => {
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

  const dp: DistanceMatrix = []; // TODO: figure out method for stronger typing

  const steps: IStep[] = [];

  // initialize the dp
  for (let i = 0; i < n; i++) {
    dp.push({});
  }

  // Steps to mark the initialization of algorithm.

  const initializeDpStep: IDpStep[] = [];
  for (let u in G.adj) {
    dp[0][u as NodeName] = Infinity;
    initializeDpStep.push(getDpStep(0, u, Infinity, undefined));
  }

  dp[0][s] = 0;
  initializeDpStep.push(getDpStep(0, s, 0, undefined));

  const parent: IParentMatrix = {};
  parent[s] = null;
  const initializeParentStep: IParentStep[] = [
    getParentStep(s, "null", undefined),
  ];

  const initializeSourceNodeStep: INodeStep[] = [
    getNodeStep(s, NodeStatus.SOURCE, NodeStatus.NORMAL),
  ];

  steps.push({
    nodes: initializeSourceNodeStep,
    dp: initializeDpStep,
    parent: initializeParentStep,
  });

  // Steps to mark the execution of algorithm.

  for (let i = 1; i < n; i++) {
    // At the start of a new iteration, carry over values
    // from previous iteration to generate a new col in the matrix
    const carryOverDistancesStep: IDpStep[] = [];
    for (let v in G.adj) {
      dp[i][v] = dp[i - 1][v];
      carryOverDistancesStep.push(getDpStep(i, v, dp[i][v], undefined));
    }

    // Step to initialize a new column in the DP table
    steps.push({ dp: carryOverDistancesStep });

    for (let u in G.adj) {
      for (let v in G.adj[u]) {
        // Step to mark this edge as being visited
        steps.push({
          edges: [getEdgeStep(u, v, EdgeStatus.VISITING, EdgeStatus.NORMAL)],
        });

        // Core logic for relaxing edges.
        const newLength = dp[i - 1][u] + G.adj[u][v];
        if (newLength < dp[i][v]) {
          const oldLen = dp[i][v];
          const oldParent = parent[v] || undefined;
          dp[i][v] = newLength;
          parent[v] = u;

          //Step to show that an update to distances was accepted
          const dpSteps = [getDpStep(i, v, newLength, oldLen)];
          const parentSteps = [getParentStep(v, u, oldParent)];
          const nodeSteps = [
            getNodeStep(v, NodeStatus.UPDATED, NodeStatus.NORMAL),
          ];
          const edgeSteps = [
            getEdgeStep(u, v, EdgeStatus.UPDATED, EdgeStatus.VISITING),
          ];

          steps.push({
            nodes: nodeSteps,
            dp: dpSteps,
            parent: parentSteps,
            edges: edgeSteps,
          });

          // Step to revert nodes and edges back to their original state
          const edgeRevertStep = [
            getEdgeStep(u, v, EdgeStatus.NORMAL, EdgeStatus.UPDATED),
          ];
          const nodeRevertStep = [
            getNodeStep(v, NodeStatus.NORMAL, NodeStatus.UPDATED),
          ];

          steps.push({
            nodes: nodeRevertStep,
            edges: edgeRevertStep,
          });
        } else {
          //Step to show that the update was rejected
          const edgeSteps = [
            getEdgeStep(u, v, EdgeStatus.REJECTED, EdgeStatus.VISITING),
          ];
          steps.push({
            edges: edgeSteps,
          });

          //Step to revert the edges back to normal state
          const edgeRevertSteps = [
            getEdgeStep(u, v, EdgeStatus.NORMAL, EdgeStatus.REJECTED),
          ];
          steps.push({
            edges: edgeRevertSteps,
          });
        }
      }
    }
  }

  return { steps, distances: dp, parent };
};
