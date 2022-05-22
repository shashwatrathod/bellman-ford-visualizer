import { useContext } from "react";
import { ParentListContext } from "../contexts/ParentListContextProvider";

const useParentList = () => {
  const context = useContext(ParentListContext);

  if (!context) {
    new Error(
      "Parent list context is only available inside ParentListContextProvider!"
    );
  }

  return context;
};

export default useParentList;
