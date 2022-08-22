import { useContext } from "react";
import {
  IParentListContext,
  ParentListContext,
} from "../contexts/ParentListContextProvider";

const useParentList = (): IParentListContext => {
  const context = useContext(ParentListContext);

  if (!context) {
    new Error(
      "Parent list context is only available inside ParentListContextProvider!"
    );
  }

  return context;
};

export default useParentList;
