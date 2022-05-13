import { testBellmanFord } from "./graph-utils/bellmanFordTest";
import GraphInput from "./components/graph-input/GraphInput";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <GraphInput />
        </div>
      </div>
    </div>
  );
}

export default App;
