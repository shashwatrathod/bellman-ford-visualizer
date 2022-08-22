import { useContext } from "react";
import {
  DistanceMatrixContext,
  IDistanceMatrixContext,
} from "../contexts/DistanceMatricContextProvider";

const useDistanceMatrix = (): IDistanceMatrixContext => {
  const context = useContext(DistanceMatrixContext);

  if (!context) {
    new Error(
      "Distance matrix context is only available inside DistanceMatrixContextProvider!"
    );
  }

  return context;
};

export default useDistanceMatrix;
