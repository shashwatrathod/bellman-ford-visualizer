import { createContext, useState } from "react";
import useGlobalGraph from "../hooks/useGlobalGraph";

export const DistanceMatrixContext = createContext();

const DistanceMatrixContextProvider = (props) => {
  const [dp, setDp] = useState();
  const { globalGraph } = useGlobalGraph();

  //TODO: Create a reset dp method

  const initializeNewDp = () => {
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
      _dp[node] = new Array(globalGraph.n - 1).fill(null);
    });

    setDp(_dp);
  };

  // Whenever we get a new Global Graph, initialize a new DP
  useState(() => {
    initializeNewDp();
  }, [globalGraph]);

  return (
    <>
      <DistanceMatrixContext.Provider value={{ dp }}>
        {props.children}
      </DistanceMatrixContext.Provider>
    </>
  );
};

export default DistanceMatrixContextProvider;
