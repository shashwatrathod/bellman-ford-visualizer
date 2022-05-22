import { useContext } from "react";
import { VisGraphContext } from "../contexts/VisGraphContextProvider";

const useVisGraph = () => {
  const context = useContext(VisGraphContext);

  if (!context) {
    new Error(
      "VisGraph context is only available inside VisGraphContextProvider!"
    );
  }

  return context;
};

export default useVisGraph;
