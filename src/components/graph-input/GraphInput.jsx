import React, { useState } from "react";

const GraphInput = () => {
  const [edgesText, setEdgesText] = useState("");

  const nodeNameValid = (nodeName) => {
    const regex = /[a-zA-Z0-9]+/gm;
    return regex.test(nodeName);
  };

  const edgeWeightValid = (edgeWeight) => {
    const regex = /^-?[0-9]+/gm;
    return regex.test(edgeWeight);
  };

  const onSaveClick = () => {
    const edgesLine = edgesText.split("\n");
    const edges = [];

    edgesLine.forEach((line) => {
      const components = line.split(",");
      if (components.length !== 3) {
        // Throw some error
      }

      let src = components[0].trim();
      let dest = components[1].trim();
      let weight = components[2].trim();

      if (
        nodeNameValid(src) &&
        nodeNameValid(dest) &&
        edgeWeightValid(weight)
      ) {
        edges.push({
          src,
          dest,
          weight: parseInt(weight),
        });
      } else {
        // Throw some error
      }
    });

    console.log(edges);
  };

  return (
    <div>
      <h4>Enter Edges</h4>
      <p>
        Enter each edge on a new line in the format:{" "}
        <code>
          <var>src</var>, <var>dest</var>, <var>weight</var>
        </code>
        . <br />
        <var>src</var> : <code>[a-zA-Z0-9]+</code> . Case sensitive. <br />
        <var>dest</var> : <code>[a-zA-Z0-9]+</code> . Case sensitive. <br />
        <var>weight</var> : <code>[0-9]+</code> .
      </p>
      <div className="form-floating">
        <textarea
          className="form-control fs-4"
          placeholder="Leave a comment here"
          id="graph-edges-input"
          value={edgesText}
          onChange={(e) => {
            setEdgesText(e.target.value);
          }}
          style={{ height: "100px" }}
        ></textarea>
        <label htmlFor="graph-edges-input">Edges</label>
      </div>
      <div className="d-grid my-2">
        <button className="btn btn-primary" type="button" onClick={onSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default GraphInput;
