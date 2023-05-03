const Queue = require("./queue");
const Stack = require("./stack");

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach( node => this.nodes.add(node) );
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let node of this.nodes) {
      this.removeEdge(vertex, node);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let verticesStack = new Stack();
    let curr = null;
    let visited = new Set();
    let visitedArr = [];

    verticesStack.push(start);
    visited.add(start);

    while(!(verticesStack.isEmpty())) {
      curr = verticesStack.pop(); // pop from stack
      visitedArr.push(curr.value);

      curr.adjacent.forEach( node => { // loop through adjacent vertices
        if(!visited.has(node)) { // is it in the set?
          visited.add(node); // add to set
          verticesStack.push(node); // add to stack  
        };
      });
    };
    return visitedArr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let verticesQueue = new Queue();
    let curr = null;
    let visited = new Set();
    let visitedArr = [];
    
    verticesQueue.enqueue(start); // we'll use our own queue
    visited.add(start); 

    while(!(verticesQueue.isEmpty())) {
      curr = verticesQueue.dequeue(); // remove from queue
      visitedArr.push(curr.value);

      curr.adjacent.forEach( node => { // loop through adjacent vertices
        if(!visited.has(node)) { // is it in the set?
          visited.add(node); // add to set
          verticesQueue.enqueue(node); // add to queue  
        };
      });

    };
    // return an array of vertices
    return visitedArr;
  }
};

module.exports = {Graph, Node}