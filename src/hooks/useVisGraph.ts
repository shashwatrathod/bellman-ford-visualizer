import { useContext } from "react";
import {
  IVisGraphContext,
  VisGraphContext,
} from "../contexts/VisGraphContextProvider";

const useVisGraph = (): IVisGraphContext => {
  const context = useContext(VisGraphContext);

  if (!context) {
    new Error(
      "VisGraph context is only available inside VisGraphContextProvider!"
    );
  }

  return context;
};

export default useVisGraph;
