import { createContext, useCallback, useEffect, useState } from "react";
import useGlobalGraph from "../hooks/useGlobalGraph";
import { cloneDeep } from "lodash";

export const DistanceMatrixContext = createContext({
  dp: undefined,
  next: undefined,
  resetDp: undefined,
});

const DistanceMatrixContextProvider = (props) => {
  const [dp, setDp] = useState();
  const { globalGraph } = useGlobalGraph();

  const initializeNewDp = useCallback(() => {
    if (!globalGraph) {
      setDp(null);
      return;
    }

    const uniqueNodes = new Set();

    for (let u in globalGraph.adj) {
      uniqueNodes.add(u);
      for (let v in globalGraph.adj[u]) {
        uniqueNodes.add(v);
      }
    }

    const _dp = {};

    uniqueNodes.forEach((node) => {
      _dp[node] = new Array(globalGraph.n).fill(undefined);
    });

    setDp(_dp);
  }, [globalGraph]);

  // Whenever we get a new Global Graph, initialize a new DP
  useEffect(() => {
    initializeNewDp();
  }, [globalGraph, initializeNewDp]);

  const next = (steps) => {
    if (dp === undefined) return;
    if (!steps?.dp) return;

    const _dp = cloneDeep(dp);

    if (steps?.dp?.length > 0) {
      steps?.dp.forEach((dpStep) => {
        _dp[dpStep.node][dpStep.iteration] = dpStep.val;
      });
    }
    setDp(_dp);
  };

  return (
    <>
      <DistanceMatrixContext.Provider
        value={{ dp, next, resetDp: initializeNewDp }}
      >
        {props.children}
      </DistanceMatrixContext.Provider>
    </>
  );
};

export default DistanceMatrixContextProvider;
