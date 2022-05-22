import React from "react";
import useParentList from "../../hooks/useParentList";

const ParentTable = () => {
  const { parent } = useParentList();

  if (parent) {
    return (
      <>
        <div className="table-responsive">
          <table className="table table-bordered">
            <caption>The parent node of each node.</caption>
            <thead>
              <tr>
                <th scope="col">Node</th>
                <th scope="col">Parent</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(parent).map(([node, parent]) => (
                <>
                  <tr>
                    <td>{node}</td>
                    <td>{parent !== undefined ? parent : " "}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ParentTable;
