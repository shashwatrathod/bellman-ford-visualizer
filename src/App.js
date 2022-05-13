import GraphInput from "./components/graph-input/GraphInput";
import useVisGraph from "./hooks/useVisGraph";
import Graph from "react-graph-vis";
import useGlobalGraph from "./hooks/useGlobalGraph";
import { useEffect } from "react";

function App() {
  const { graph, options } = useVisGraph();

  // const { globalGraph } = useGlobalGraph();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <GraphInput />
        </div>
        <div className="col-9">
          {graph && options && (
            <>
              <Graph graph={graph} options={options} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
