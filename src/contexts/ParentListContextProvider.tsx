import { cloneDeep } from "lodash";
import { createContext, useCallback, useEffect, useState } from "react";
import useGlobalGraph from "../hooks/useGlobalGraph";
import { IParentMatrix, IStep, NodeName } from "../utils/graph-utils";

export interface IParentListContext {
  parent?: IParentMatrix;
  applyNextStep?: (step: IStep) => void;
  applyPrevStep?: (step: IStep) => void;
  resetParent?: () => void;
}

export const ParentListContext = createContext<IParentListContext>({});

const ParentListContextProvider = (props: any) => {
  const [parent, setParent] = useState<IParentMatrix>();
  const { globalGraph } = useGlobalGraph();

  const initializeParent = useCallback(() => {
    if (!globalGraph) {
      setParent(undefined);
      return;
    }

    const uniqueNodes = new Set<NodeName>();

    for (let u in globalGraph.adj) {
      uniqueNodes.add(u);
      for (let v in globalGraph.adj[u]) {
        uniqueNodes.add(v);
      }
    }

    const _parent: IParentMatrix = {};

    uniqueNodes.forEach((node) => {
      _parent[node] = undefined;
    });

    setParent(_parent);
  }, [globalGraph]);

  useEffect(() => {
    initializeParent();
  }, [globalGraph, initializeParent]);

  const applyNextStep = (step: IStep) => {
    if (parent === undefined) return;

    if (!step?.parent) return;

    const _parent = cloneDeep(parent);

    step?.parent.forEach((parentStep) => {
      _parent[parentStep.node] = parentStep.parent;
    });

    setParent(_parent);
  };

  const applyPrevStep = (step: IStep) => {
    if (parent === undefined) return;

    if (!step?.parent) return;

    const _parent = cloneDeep(parent);

    step?.parent.forEach((parentStep) => {
      _parent[parentStep.node] = parentStep.oldParent;
    });

    setParent(_parent);
  };

  return (
    <>
      <ParentListContext.Provider
        value={{
          parent,
          applyNextStep: applyNextStep,
          resetParent: initializeParent,
          applyPrevStep,
        }}
      >
        {props.children}
      </ParentListContext.Provider>
    </>
  );
};

export default ParentListContextProvider;
