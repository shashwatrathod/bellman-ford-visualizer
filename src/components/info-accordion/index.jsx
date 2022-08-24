import React from "react";

const InfoAccordion = () => {
  return (
    <>
      <div className="accordion">
        <div className="accordion-item">
          <h2 class="accordion-header" id="bf-accordion">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#bf-accordion-body"
              aria-expanded="true"
              aria-controls="bf-accordion-body"
            >
              What is Bellman Ford?
            </button>
          </h2>
          <div id="bf-accordion-body" className="accordion-collapse collapse">
            <div className="accordion-body">
              <p>
                The <strong>Bellman-Ford</strong> algorithm computes shortest
                paths from a single source vertex to every other vertex in a
                weighted (,and in our case, directed) graph. Unlike the more
                popular Djikstra's algorithm, this algorithm is capable of
                finding shortest paths even in graphs with negative edge weights
                (but no negative weight cycles). The main idea is that the
                maximum length of the shortest path to any other vertex can be
                no more than <code>|V| - 1</code> where <code>|V|</code>
                is the number of vertices in the graph. Therefore, if we{" "}
                <i>relax</i> all edges <code>|V| - 1</code> times, we will end
                up with the shortest path from source to given vertices.{" "}
                <strong>NOTE</strong>: This implmentation does not detect the
                presence of negative cycles in the graph.
              </p>
              <p>
                Read more about Bellman-Ford here:
                <ul>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Wikipedia
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GFG
                    </a>
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 class="accordion-header" id="instructions-accordion">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#instructions-accordion-body"
              aria-expanded="true"
              aria-controls="instructions-accordion-body"
            >
              How to use this program?
            </button>
          </h2>
          <div
            id="instructions-accordion-body"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              <ol>
                <li>
                  Create a new graph, or use one of the existing ones. To create
                  a new graph,
                  <ul>
                    <li>
                      Enter the edges of the graph in the text input box labeled
                      "Edges". Each edge of the graph must be on a new line. An
                      edge is represented by <var>src</var>, <var>dest</var> and{" "}
                      <var>weight</var> seperated by "<code>,</code>" in that
                      order. e.g. <code>a, b, 10</code>
                    </li>
                  </ul>
                </li>
                <li>
                  Enter a source vertex. Bellman Ford will compute the shortest
                  distance to every other vertex from the source vertex. The{" "}
                  <code>source</code> vertex you enter <i>must</i> be present in
                  the graph.
                </li>
                <li>
                  Click the "Save" button. You should now see a graph
                  corresponding to the edges you entered on the right side of
                  this screen.
                </li>
                <li>
                  Press the "Start" button. The "Next" button should now be
                  enabled.
                </li>
                <li>
                  Press the "Next" button to go through each step of
                  Bellman-Ford's execution on this graph. The "Next" button will
                  be disabled once you have gone through all the steps.
                </li>
                <li>
                  Press the "Previous" button to go back a step. The "Previous"
                  button will be disabled once you reach the start of execution.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 class="accordion-header" id="on-screen-accordion">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#on-screen-accordion-body"
              aria-expanded="true"
              aria-controls="on-screen-accordion-body"
            >
              What am I looking at?
            </button>
          </h2>
          <div
            id="on-screen-accordion-body"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              <p>
                <h5>Graph</h5>
                <ul>
                  <li>
                    Vertices are represented by opaque, solid circles. The text
                    in a circle represents name of the vertex. If you've started
                    execution of Bellman Ford, you may notice some digits to the
                    right side of a <code>:</code> in these circles. These
                    digits represent the vertex's minimum distance from the{" "}
                    <var>source</var>.
                  </li>
                  <li>
                    A <span style={{ color: "#2196F3" }}>blue</span> vertex
                    represents the source node. A{" "}
                    <span style={{ color: "#4CAF50" }}>green</span> vertex
                    represents a vertex for which the minimum distance has just
                    been updated.
                  </li>
                  <li>
                    Edges are presented by an arrow between two vertices. The
                    number in the middle of an arrow represents the weight of
                    that edge.
                  </li>
                  <li>
                    A <span style={{ color: "#FFC107" }}>yellow</span> edge
                    represents an edge that is currently being visited by the
                    Bellman Ford algorithm. A{" "}
                    <span style={{ color: "#4CAF50" }}>green</span> edge
                    represents an edge for which a distance update has been
                    accepted, i.e. for edge (u, v),{" "}
                    <code>old_dist(u) &gt; dist(v) + w(u,v)</code>. A{" "}
                    <span style={{ color: "#F4511E" }}>red</span> edge
                    represents an edge for which distance update was rejected,
                    i.e <code>old_dist(u) &lt; dist(v) + w(u,v)</code>
                  </li>
                </ul>
              </p>
              <p>
                <h5>Parent Table</h5>
                The parent table is left table with col names "node" and
                "parent". Assume a graph with an edge from node "u" to "v". If
                the shortest path to "v" includes the edge (u,v), then "u" is
                said to be the "parent" of "v". The values in this table change
                as we move through steps of the algorithm.
              </p>
              <p>
                <h5>Distance Table</h5>
                The distance table holds the value of minimum distance to a
                vertex from the source vertex. At any point,{" "}
                <code>DistanceTable[u][iter]</code> is the minimum distance from
                "source" to "u" at iteration number <code>iter</code> of
                Bellman-Ford. The values in this table change as we move through
                steps of the algorithm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoAccordion;
