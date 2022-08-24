import GraphInput from "./components/graph-input/GraphInput";
import useVisGraph from "./hooks/useVisGraph";
//TODO: try to fix the grph-vis type error
//@ts-ignore
import Graph from "react-graph-vis";
import useGlobalGraph from "./hooks/useGlobalGraph";
import { bellmanFord, IStep } from "./utils/graph-utils";
import { useEffect, useState } from "react";
import DistanceTable from "./components/distance-table";
import useDistanceMatrix from "./hooks/useDistanceMatrix";
import ParentTable from "./components/parent-table";
import useParentList from "./hooks/useParentList";
import InfoAccordion from "./components/info-accordion";

function App() {
  const {
    graph,
    options,
    graphKey,
    applyNextStep: applyNextVisStep,
    applyPrevStep: applyPrevVisStep,
    resetGraph,
  } = useVisGraph();
  const { globalGraph } = useGlobalGraph();
  const [steps, setSteps] = useState<IStep[]>([]);
  const [startDisabled, setStartDisabled] = useState<boolean>(true);
  const [nextDisabled, setNextDisabled] = useState<boolean>(true);
  const [prevDisabled, setPrevDisabled] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const {
    applyNextStep: applyNextDpStep,
    applyPrevStep: applyPrevDpStep,
    resetDp,
  } = useDistanceMatrix();
  const {
    applyNextStep: applyNextParentStep,
    applyPrevStep: applyPrevParentStep,
    resetParent,
  } = useParentList();

  // When we get a new graph,
  // start should be enabled and next should be disabled
  useEffect(() => {
    if (globalGraph) {
      setStartDisabled(false);
    } else {
      setStartDisabled(true);
    }

    setNextDisabled(true);
    setPrevDisabled(true);
  }, [globalGraph]);

  const startOnClick = () => {
    if (!globalGraph || !globalGraph.source) return;

    if (!resetDp || !resetGraph || !resetParent) return;

    // Reset all previous states of the graph and create a new one
    resetGraph();
    resetDp();
    resetParent();

    const { steps } = bellmanFord(globalGraph, globalGraph.source);
    setSteps(steps);
    setCurrentStep(-1);
    setNextDisabled(false);
    setPrevDisabled(true);
  };

  // Handles enabling/disabling of buttons
  useEffect(() => {
    if (currentStep >= steps.length - 1) {
      setNextDisabled(true);
    }

    if (currentStep >= 0) {
      setPrevDisabled(false);
    } else {
      setPrevDisabled(true);
    }
  }, [currentStep, steps.length]);

  const nextOnClick = () => {
    if (currentStep === steps.length - 1) return;

    if (!applyNextDpStep || !applyNextParentStep || !applyNextVisStep) return;

    setCurrentStep((oldStep) => oldStep + 1);
    // Refering to currentStep + 1 because setState does not update the state value
    // immediately
    applyNextVisStep(steps[currentStep + 1]);
    applyNextDpStep(steps[currentStep + 1]);
    applyNextParentStep(steps[currentStep + 1]);
  };

  const prevOnClick = () => {
    if (currentStep <= -1) return;
    if (!applyPrevVisStep || !applyPrevDpStep || !applyPrevParentStep) return;

    applyPrevVisStep(steps[currentStep]);
    applyPrevDpStep(steps[currentStep]);
    applyPrevParentStep(steps[currentStep]);

    setCurrentStep((oldStep) => oldStep - 1);
  };

  return (
    <div className="container-fluid my-2">
      <div className="row mt-2">
        <div className="col-3">
          <GraphInput />
          <InfoAccordion />
          <div className="my-2">
            View this Project on{" "}
            <strong>
              <a
                href="https://github.com/shashwatrathod/bellman-ford-visualizer"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </strong>
            .
          </div>
        </div>
        {graph && options && (
          <div className="col-9">
            <div className="row border">
              <Graph key={graphKey} graph={graph} options={options} />
            </div>
            <div className="row mt-2">
              <div className="col-3">
                <ParentTable />
              </div>
              <div className="col-9">
                <DistanceTable />
              </div>
            </div>
            <div className="row">
              <div className="d-flex flex-row gap-2 p-2 justify-content-center">
                {!prevDisabled && (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={prevOnClick}
                    disabled={prevDisabled}
                  >
                    Previous
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={startOnClick}
                  disabled={startDisabled}
                >
                  {!nextDisabled && !startDisabled ? "Reset" : "Start"}
                </button>
                {!nextDisabled && (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={nextOnClick}
                    disabled={nextDisabled}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      © Created by{" "}
      <a
        href="https://github.com/shashwatrathod"
        target="_blank"
        rel="noreferrer"
      >
        Shashwat Rathod
      </a>
    </div>
  );
}

export default App;
