import GraphInput from "./components/graph-input/GraphInput";
import useVisGraph from "./hooks/useVisGraph";
import Graph from "react-graph-vis";

function App() {
  const { graph, options, addNewNode, graphKey } = useVisGraph();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <GraphInput />
        </div>
        <div className="col-9">
          {graph && options && (
            <>
              <Graph key={graphKey} graph={graph} options={options} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
