import { createContext, useCallback, useEffect, useState } from "react";
import useGlobalGraph from "../hooks/useGlobalGraph";
import { cloneDeep } from "lodash";
import { IStep, NodeName } from "../utils/graph-utils";

export interface IDistanceMatrixContext {
  dp?: NodewiseDistanceMatrix | null;
  applyNextStep?: (step: IStep) => void;
  applyPrevStep?: (step: IStep) => void;
  resetDp?: () => void;
}

export interface NodewiseDistanceMatrix {
  [key: NodeName]: any[];
}

export const DistanceMatrixContext = createContext<IDistanceMatrixContext>({
  dp: undefined,
  applyNextStep: undefined,
  resetDp: undefined,
});

const DistanceMatrixContextProvider = (props: any) => {
  const [dp, setDp] = useState<NodewiseDistanceMatrix | null>();
  const { globalGraph } = useGlobalGraph();

  const initializeNewDp = useCallback(() => {
    if (!globalGraph) {
      setDp(null);
      return;
    }

    const uniqueNodes = new Set<NodeName>();

    for (let u in globalGraph.adj) {
      uniqueNodes.add(u);
      for (let v in globalGraph.adj[u]) {
        uniqueNodes.add(v);
      }
    }

    const _dp: NodewiseDistanceMatrix = {};

    uniqueNodes.forEach((node) => {
      _dp[node] = new Array(globalGraph.n).fill(undefined);
    });

    setDp(_dp);
  }, [globalGraph]);

  // Whenever we get a new Global Graph, initialize a new DP
  useEffect(() => {
    initializeNewDp();
  }, [globalGraph, initializeNewDp]);

  const applyNextStep = (step: IStep) => {
    if (dp === undefined || dp === null) return;
    if (!step?.dp) return;

    const _dp = cloneDeep(dp);

    if (step?.dp?.length > 0) {
      step?.dp.forEach((dpStep) => {
        _dp[dpStep.node][dpStep.iteration] = dpStep.val;
      });
    }
    setDp(_dp);
  };

  const applyPrevStep = (step: IStep) => {
    if (dp === undefined || dp === null) return;
    if (!step?.dp) return;

    const _dp = cloneDeep(dp);

    if (step?.dp?.length > 0) {
      step?.dp.forEach((dpStep) => {
        _dp[dpStep.node][dpStep.iteration] = dpStep.previous;
      });
    }
    setDp(_dp);
  };

  return (
    <>
      <DistanceMatrixContext.Provider
        value={{
          dp,
          applyNextStep,
          resetDp: initializeNewDp,
          applyPrevStep,
        }}
      >
        {props.children}
      </DistanceMatrixContext.Provider>
    </>
  );
};

export default DistanceMatrixContextProvider;
