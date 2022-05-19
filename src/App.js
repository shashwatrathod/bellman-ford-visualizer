import GraphInput from "./components/graph-input/GraphInput";
import useVisGraph from "./hooks/useVisGraph";
import Graph from "react-graph-vis";
import useGlobalGraph from "./hooks/useGlobalGraph";
import { bellmanFord } from "./utils/graph-utils";
import { useState } from "react";

function App() {
  const { graph, options, graphKey, next, resetGraph } = useVisGraph();
  const { globalGraph } = useGlobalGraph();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const startOnClick = () => {
    if (!globalGraph) return;

    resetGraph();

    const { steps, distances, parent } = bellmanFord(
      globalGraph,
      globalGraph.source
    );

    console.log(steps);

    setSteps(steps);
    setCurrentStep(-1);
  };

  const nextOnClick = () => {
    if (currentStep === steps.length - 1) return;

    setCurrentStep((oldStep) => oldStep + 1);
    // Refering to currentStep + 1 as useState does not update the state value immediately
    next(steps[currentStep + 1]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <GraphInput />
        </div>
        <div className="col-9">
          <div className="row">
            {graph && options && (
              <>
                <Graph key={graphKey} graph={graph} options={options} />
              </>
            )}
          </div>
          <div className="row">
            <div className="col">
              <button
                type="button"
                class="btn btn-primary"
                onClick={startOnClick}
              >
                Start
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                class="btn btn-primary"
                onClick={nextOnClick}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
