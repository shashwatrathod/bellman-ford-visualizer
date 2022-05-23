import clsx from "clsx";
import React, { useState } from "react";
import defaultGraphsData from "../../data/defaultGraphsData";
import useGlobalGraph from "../../hooks/useGlobalGraph";

const GraphInput = () => {
  const [edgesText, setEdgesText] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [edgesValid, setEdgesValid] = useState(true);
  const [sourceValid, setSourceValid] = useState(true);
  const { createGlobalGraph } = useGlobalGraph();

  const nodeNameValid = (nodeName) => {
    const regex = /[a-zA-Z0-9]+/gm;
    return regex.test(nodeName);
  };

  const edgeWeightValid = (edgeWeight) => {
    const regex = /^-?[0-9]+/gm;
    return regex.test(edgeWeight);
  };

  const edgesTextInvalid = (_edgesText) => {
    const lineInvalid = (line) => {
      const components = line.split(",");

      if (components.length !== 3) return true;

      if (
        !nodeNameValid(components[0].trim()) ||
        !nodeNameValid(components[1].trim()) ||
        !edgeWeightValid(components[2].trim())
      )
        return true;

      return false;
    };
    const lines = _edgesText.split("\n");

    return lines.some((line) => lineInvalid(line));
  };

  const edgesTextOnChange = (e) => {
    const newValue = e.target.value;
    setEdgesText(newValue);

    if (edgesTextInvalid(newValue)) {
      setEdgesValid(false);
    } else {
      setEdgesValid(true);
    }
  };

  const sourceOnChange = (e) => {
    const newValue = e.target.value;
    setSourceText(newValue);

    if (!nodeNameValid(newValue)) {
      setSourceValid(false);
      return;
    }

    if (!edgesText.includes(newValue.trim())) {
      setSourceValid(false);
      return;
    }

    setSourceValid(true);
  };

  const onSaveClick = () => {
    if (!sourceValid || !edgesValid) {
      return;
    }

    // Reaching here means that source and edges are already valid. So no need too check again
    const edgesLine = edgesText.split("\n");
    const edges = [];

    edgesLine.forEach((line) => {
      const components = line.split(",");

      let src = components[0].trim();
      let dest = components[1].trim();
      let weight = components[2].trim();

      edges.push({
        src,
        dest,
        weight: parseInt(weight),
      });
    });

    createGlobalGraph(edges, sourceText.trim());
  };

  const selectDefaultGraphOnChange = (e) => {
    let data = e.target.value;

    if (data?.length <= 4) return;

    setEdgesText(data);
  };

  return (
    <div>
      <h4>Create Graph</h4>
      <p>
        Enter each edge on a new line in the format:{" "}
        <code>
          <var>src</var>, <var>dest</var>, <var>weight</var>
        </code>
        . <br />
        <var>src</var> : <code>[a-zA-Z0-9]+</code> . Case sensitive. <br />
        <var>dest</var> : <code>[a-zA-Z0-9]+</code> . Case sensitive. <br />
        <var>weight</var> : <code>-?[0-9]+</code> .
      </p>
      <div className="form-floating">
        <textarea
          className={clsx("form-control", "fs-4", {
            "is-invalid": !edgesValid,
          })}
          id="graph-edges-input"
          value={edgesText}
          onChange={edgesTextOnChange}
          style={{ minHeight: "400px" }}
        ></textarea>
        <label htmlFor="graph-edges-input">Edges</label>
      </div>
      <div>
        or select one of the default ones:
        <select
          className="form-select"
          aria-label="Select graph"
          onChange={selectDefaultGraphOnChange}
        >
          <option selected>None</option>
          {defaultGraphsData.map((defaultGraph) => (
            <option value={defaultGraph.data}>{defaultGraph.title}</option>
          ))}
        </select>
      </div>
      <div class="form-floating my-2 mt-4">
        <input
          type="text"
          className={clsx("form-control", "fs-4", {
            "is-invalid": !sourceValid,
          })}
          id="source-input"
          value={sourceText}
          onChange={sourceOnChange}
        />
        <label htmlFor="source-input">Source Node</label>
      </div>
      <div className="d-grid my-2">
        <button
          className="btn btn-primary"
          type="button"
          onClick={onSaveClick}
          disabled={!(sourceValid && edgesValid)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default GraphInput;
