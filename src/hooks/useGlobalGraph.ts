import { useContext } from "react";
import {
  GlobalGraphContext,
  IGlobalGraphContext,
} from "../contexts/GlobalGraphContextProvider";

const useGlobalGraph = (): IGlobalGraphContext => {
  const context = useContext(GlobalGraphContext);

  if (!context) {
    new Error(
      "Global graph context is only available inside GlobalGraphContextProvider!"
    );
  }

  return context;
};

export default useGlobalGraph;
