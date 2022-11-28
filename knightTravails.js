//Given a start
//range of moves is [1,1] to [8,8]
//Breadth First  finds shortest paths from a given source vertex to all other vertices, 
// in terms of the number of edges in the paths.

// Distance (d) = minimum number of moves in any path from the source to given move/square
// Predecessor (p) = predecessor of current square along shortest path from source (source p = null)

//dequeue the current node DONE
//find its neighbors (moves a knight could make from that position)
//for each neighbor not visited yet
  // distance = current node's distance + 1;
  // predecessor = current node
  // enqueue neighbor


function knightMoves(start, end) {
  class Node {
    constructor(x, y) {
      this.position = [x, y];
      this.predecessor = null;
      this.distance = null;
    }
  }

  class Queue {
    constructor () {
      this.items = [];
    }

    enqueue(obj) {
      this.items.push(obj)
    }

    dequeue() {
      return this.items.shift();
    }

    isEmpty() {
      return this.items.length === 0;
    }
  }

  let board = [];
  for (let i = 1; i <= 8; i++) {
    for (let u = 1; u <= 8; u++) {
      board.push(new Node(i, u));
    }
  }
  //helper function below take [x, y] board position and returns index of node
  board.findNode = (position) => board.findIndex((node) => arraysEqual(node.position, position));

  function search() {
    let queue = new Queue();
    let startIndex = board.findNode(start);
    let endIndex = board.findNode(end);
    board[startIndex].distance = 0;
    queue.enqueue(startIndex);

    while (!queue.isEmpty()) {
      let current = queue.dequeue();
      let moves = findMoves(current);
    }
  }

  function findMoves(index) { //Takes in index of move/square and returns indexes of all legal moves
    let currentPosition = board[index].position;
    let moves = [];
    let legalMoveTest = (x, y) => {
      let move = board.findNode([currentPosition[0] + x, currentPosition[1] + y]); 
      if (board[move]) moves.push(move);  
    }
    legalMoveTest(-2, 1);
    legalMoveTest(-1, 2);
    legalMoveTest(1, 2);
    legalMoveTest(2, 1);
    legalMoveTest(-2, -1);
    legalMoveTest(-1, -2);
    legalMoveTest(1, -2);
    legalMoveTest(2, -1);
    return moves;
  }

  function arraysEqual(a, b) { //helper function to find if arrays are equal
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  return search();
}

console.log(knightMoves([1, 2]));