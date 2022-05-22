import { useContext } from "react";
import { DistanceMatrixContext } from "../contexts/DistanceMatricContextProvider";

const useDistanceMatrix = () => {
  const context = useContext(DistanceMatrixContext);

  if (!context) {
    new Error(
      "Distance matrix context is only available inside DistanceMatrixContextProvider!"
    );
  }

  return context;
};

export default useDistanceMatrix;
