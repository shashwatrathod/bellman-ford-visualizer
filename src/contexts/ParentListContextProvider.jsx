import { cloneDeep } from "lodash";
import { createContext, useEffect, useState } from "react";
import useGlobalGraph from "../hooks/useGlobalGraph";

export const ParentListContext = createContext();

const ParentListContextProvider = (props) => {
  const [parent, setParent] = useState();
  const { globalGraph } = useGlobalGraph();

  const initializeParent = () => {
    if (!globalGraph) {
      setParent(undefined);
      return;
    }

    const uniqueNodes = new Set();

    for (let u in globalGraph.adj) {
      uniqueNodes.add(u);
      for (let v in globalGraph.adj[u]) {
        uniqueNodes.add(v);
      }
    }

    const _parent = {};

    uniqueNodes.forEach((node) => {
      _parent[node] = undefined;
    });

    setParent(_parent);
  };

  useEffect(() => {
    initializeParent();
  }, [globalGraph]);

  const next = (steps) => {
    if (parent === undefined) return;
    if (!steps?.parent) return;

    const _parent = cloneDeep(parent);

    steps?.parent.forEach((parentStep) => {
      _parent[parentStep.node] = parentStep.parent;
    });

    setParent(_parent);
  };

  return (
    <>
      <ParentListContext.Provider
        value={{ parent, next, resetParent: initializeParent }}
      >
        {props.children}
      </ParentListContext.Provider>
    </>
  );
};

export default ParentListContextProvider;