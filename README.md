# Bellman Ford Visualizer

[View the live deployment](https://bellman-ford.netlify.app/)

With Bellman-Ford visualizer, you can move step-by-step through each step of the Bellman-Ford algorithm visually to find shortest paths to all other vertices from a single source vertex.

## What is Bellman Ford?

The **Bellman-Ford** algorithm computes shortest paths from a single source vertex to every other vertex in a weighted (,and in our case, directed) graph. Unlike the more popular Djikstra's algorithm, this algorithm is capable of finding shortest paths even in graphs with negative edge weights (but no negative weight cycles). The main idea is that the maximum length of the shortest path to any other vertex can be no more than `|V| - 1` where `|V|` is the number of vertices in the graph. Therefore, if we relax all edges `|V| - 1` times, we will end up with the shortest path from source to given vertices. **NOTE**: This implmentation does not detect the presence of negative cycles in the graph.

Read more about Bellman-Ford here:
- [Wikipedia](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm)
- [GFG](https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/)

## Features
- Create a custom graph using text input or use one of the default ones!
- Specify custom source vertex
- Press "next" to go step-by-step through the execution of BF.
- Press "previous" to go back a step in the execution.
- Color of the edges and vertices changes when thier distance is updated
- View Distance matrix and Parent list

## How to use this program?
1. Visit the [live deployment](https://bellman-ford.netlify.app/).
2. Create a new graph, or use one of the existing ones. To create a new graph,
     - Enter the edges of the graph in the text input box labeled "Edges". Each edge of the graph must be on a new line. An edge is represented by src, dest and weight seperated by "`,`" in that order. e.g. `a, b, 10`
3. Enter a source vertex. Bellman Ford will compute the shortest distance to every other vertex from the source vertex. The source vertex you enter must be present in the graph.
4. Click the "Save" button. You should now see a graph corresponding to the edges you entered on the right side of this screen.
5. Press the "Start" button. The "Next" button should now be enabled.
6. Press the "Next" button to go through each step of Bellman-Ford's execution on this graph. The "Next" button will be disabled once you have gone through all the steps.


## Technologies Used
- React
- JavaScript
- VisGraph
- Netlify
- node

## Running this app locally

- Clone this repository:
  ```
  git clone https://github.com/shashwatrathod/bellman-ford-visualizer.git
  ```
- `cd` into the project folder
  ```
  cd path/to/bellman-ford-visualizer
  ```
- Install all the dependencies:
    ```
    npm install
    ```
- Start development server
  ```
  npm start
  ```