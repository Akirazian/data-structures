class Tree {
  constructor(array) {
    this.sortedArray = [...this.#filter(array)].sort((a, b) => {return a-b});
    this.root = this.#buildTree(this.sortedArray, 0, this.sortedArray.length - 1);
  }

  #buildTree(array, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end)/2);
    let root = new Node(array[mid]);
    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);
    return root;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  #filter(array) { return new Set(array) };
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

//testers
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(array);
console.log(tree.root);
tree.prettyPrint(tree.root);