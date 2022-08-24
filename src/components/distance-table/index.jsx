import React from "react";
import useDistanceMatrix from "../../hooks/useDistanceMatrix";

/**
 * Draws the 2D DP table seen below the graph.
 */
const DistanceTable = () => {
  const { dp } = useDistanceMatrix();

  if (dp) {
    return (
      <>
        <div className="table-responsive">
          <table className="table table-bordered">
            <caption>
              Distances of each node from the <var>source</var> at each
              iteration of BF
            </caption>
            <thead>
              <tr>
                <th scope="col">Node</th>
                {Object.entries(dp)[0][1]?.map((ele, idx) => (
                  // fill up the TH with
                  <th key={idx} scope="col">
                    {idx}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(dp).map((node) => {
                return (
                  <>
                    <tr key={node}>
                      <th scope="row">{node}</th>
                      {dp[node].map((val) => {
                        if (val === null || val === undefined) {
                          return <td> </td>;
                        }

                        if (val === Infinity) {
                          return <td>inf</td>;
                        }

                        return <td>{val}</td>;
                      })}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default DistanceTable;
