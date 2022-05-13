import { useContext } from "react";
import { GlobalGraphContext } from "../contexts/GlobalGraphContextProvider";

const useGlobalGraph = () => {
  const context = useContext(GlobalGraphContext);

  if (!context) {
    new Error(
      "Global graph context is only available inside GlobalGraphContextProvider!"
    );
  }

  return context;
};

export default useGlobalGraph;
