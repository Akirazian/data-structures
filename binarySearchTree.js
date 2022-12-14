class Tree {
  constructor(array) {
    this.sortedArray = [...new Set(array)].sort((a, b) => {return a-b});
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

  insert(value, root = this.root) { //Insert a new node
    if (root === null) return new Node(value);
    if (root.value === value) return root;
    if (value > root.value) root.right = this.insert(value, root.right);
    if (value < root.value) root.left = this.insert(value, root.left);
    return root;
  }
  
  delete(value, root = this.root) { //Delete a current node
    if (root === null) return root;
    //Traversal
    if (value > root.value) {
      root.right = this.delete(value, root.right);
      return root;
    }
    if (value < root.value) {
      root.left = this.delete(value, root.left);
      return root;
    }
    // 0 or 1 Child cases
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;
    //Two Child cases
    let smallestChild = this.#minValue(root.right);
    root.value = smallestChild.value;
    root.right = this.delete(smallestChild.value, root.right);
  
    return root;
  } 

  find(value, root = this.root) { //Find and return a node
    if (root.value === value) return root;
    if (value > root.value) return this.find(value, root.right);
    if (value < root.value) return this.find(value, root.left); 
  }

  levelOrder(f, root = this.root) { //Apply the given function on each node in level order
    if (root === null) return;
    let queue = [];
    let array = [];
    queue.push(root);
    while (queue.length != 0) {
      if (f) f(queue[0]);
      array.push(queue[0].value);
      if (queue[0].left != null) queue.push(queue[0].left);
      if (queue[0].right != null) queue.push(queue[0].right);
      queue.shift();
    }
    if (!f) return array;
  }

  inorder(f, root = this.root) {
    if (root === null) return;
    this.inorder(f, root.left);
    f(root);
    this.inorder(f, root.right);
    return;
  }

  preorder(f, root = this.root) {
    if (root === null) return;
    f(root);
    this.preorder(f, root.left);
    this.preorder(f, root.right);
    return;
  }

  postorder(f, root = this.root) {
    if (root === null) return;
    this.postorder(f, root.left);
    this.postorder(f, root.right);
    f(root);
    return;
  }

  height(node) { //Find height of given node
    let counter = 1;
    if (node === null) return 0;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    if (leftHeight > rightHeight) {
      counter += leftHeight;
      return counter;
    } else {
      counter += rightHeight;
      return counter;
    }
  }
  
  depth(node) { //Find depth of given node from tree's root
    let counter = 0;
    let currentNode = this.root;
    while (node != currentNode) {
      if (node.value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
      counter++;
    }
    return counter;
  }

  isBalanced() { //Return boolean of if tree is balanced
    if (this.height(this.root.left) - this.height(this.root.right) <= 1 && this.height(this.root.right) - this.height(this.root.left) <= 1) {
      return true;
    }
    return false;
  }

  rebalance() {
    let array = [];
    this.inorder((node) => array.push(node.value));
    this.root = this.#buildTree(array, 0, array.length - 1);
    this.prettyPrint();
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '???   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '????????? ' : '????????? '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '???   '}`, true);
    }
  }

  #minValue(root) { //helper method to find smallest node;
    let min = root.value;
    while (root.left != null) {
      min = root.left.value;
      root = root.left;
    }
    return root;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let array = [45, 325, 3, 2, 512, 34, 2, 535, 6, 3, 36]
let tree = new Tree(array);
tree.prettyPrint();
tree.levelOrder();