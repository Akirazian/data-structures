//Given a starting and ending position on a chessboard, find the shortest path a knight piece can travel between the two positions.
//Board is represented by array of 64 positions: [1,1] to [8,8]

// Distance (d) = minimum number of moves in any path from the source to given move/square
// Predecessor (p) = predecessor of current square along shortest path from source (source p = null)

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

  let board = []; //Chessboard represented by 64 nodes
  for (let i = 1; i <= 8; i++) {
    for (let u = 1; u <= 8; u++) {
      board.push(new Node(i, u));
    }
  }
  //helper function below takes [x, y] board position and returns index of node
  board.findNode = (position) => board.findIndex((node) => arraysEqual(node.position, position));

  function search() { //Main search function using breadth-first search
    let queue = new Queue();
    let startIndex = board.findNode(start);
    let endIndex = board.findNode(end);
    if (startIndex === endIndex) return "You have the same start and end! No need to move, you're already here."
    board[startIndex].distance = 0;
    queue.enqueue(startIndex);

    while (!queue.isEmpty()) {
      let current = queue.dequeue();
      let moves = findMoves(current);
      for (let i = 0; i < moves.length; i++) {
        if (board[moves[i]].distance === null) {
          board[moves[i]].distance = board[current].distance + 1;
          board[moves[i]].predecessor = current;
          queue.enqueue(moves[i]);
        }
        if (moves[i] === endIndex) return shortPathOutput(endIndex);
      }
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

  function shortPathOutput(index) { //Returns shortest path in neat console statement
    let path = [board[index].position];
    let predecessor = board[index].predecessor;
    while (predecessor) {
      path.unshift(board[predecessor].position);
      predecessor = board[predecessor].predecessor;
    }
    let pathPrint = ``;
    for (let i = 0; i < path.length; i++) {
      pathPrint += `\n[${path[i]}]`
    }
    return console.log(`You made it in ${board[index].distance} moves! Here's your path: ${pathPrint}`);
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