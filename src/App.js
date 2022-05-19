import GraphInput from "./components/graph-input/GraphInput";
import useVisGraph from "./hooks/useVisGraph";
import Graph from "react-graph-vis";
import useGlobalGraph from "./hooks/useGlobalGraph";
import { bellmanFord } from "./utils/graph-utils";
import { useEffect, useState } from "react";

function App() {
  const { graph, options, graphKey, next, resetGraph } = useVisGraph();
  const { globalGraph } = useGlobalGraph();
  const [steps, setSteps] = useState([]);
  const [startDisabled, setStartDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [currentStep, setCurrentStep] = useState(-1);

  // When we get a new graph,
  // start should be enabled and next should be disabled
  useEffect(() => {
    if (globalGraph) {
      setStartDisabled(false);
      setNextDisabled(true);
    } else {
      setStartDisabled(true);
      setNextDisabled(true);
    }
  }, [globalGraph]);

  const startOnClick = () => {
    if (!globalGraph) return;

    // Reset all previous states of the graph and create a new one
    resetGraph();

    const { steps, distances, parent } = bellmanFord(
      globalGraph,
      globalGraph.source
    );
    setSteps(steps);
    setCurrentStep(-1);
    setNextDisabled(false);
  };

  const nextOnClick = () => {
    if (currentStep === steps.length - 1) return;

    // now that we've reached the end, we want to diable the next button
    if (currentStep + 1 === steps.length - 1) {
      setNextDisabled(true);
    }

    setCurrentStep((oldStep) => oldStep + 1);
    // Refering to currentStep + 1 as setState does not update the state value
    // immediately
    next(steps[currentStep + 1]);
  };

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-3">
          <GraphInput />
        </div>
        {graph && options && (
          <div className="col-9">
            <div className="row border">
              <Graph key={graphKey} graph={graph} options={options} />
            </div>
            <div className="row">
              <div className="d-flex flex-row gap-2 p-2 justify-content-center">
                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  onClick={startOnClick}
                  disabled={startDisabled}
                >
                  Start
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-lg"
                  onClick={nextOnClick}
                  disabled={nextDisabled}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
