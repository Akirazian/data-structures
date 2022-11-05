class LinkedList {
    #head = null;

  append(value) { //Adds new node containing value to end of list
    let newNode = new Node(value);
    if (this.#head === null) {
      this.#head = newNode;
      return this.toString();;
    }
    let pointer = this.#head;
    while (pointer.nextNode != null) {
      pointer = pointer.nextNode;
    }
    pointer.nextNode = newNode;
    return this.toString();
  }

  prepend(value) { //Adds new node containing value to front of list
    if (this.#head === null) {
      this.append(value);
      return;
    }
    let newNode = new Node(value);
    newNode.nextNode = this.#head;
    this.#head = newNode;
    return this.toString();
  }

  size() { //Returns total number of nodes in list
    let counter = 1;
    if (this.#head === null) return 0;
    let pointer = this.#head;
    while (pointer.nextNode != null) {
      counter++;
      pointer = pointer.nextNode;
    }
    return counter;
  }

  head() { //Returns first node
    return this.#head;
  }

  tail() { //Returns last node
    let tail = this.#head;
    while (tail.nextNode != null) {
      tail = tail.nextNode;
    }
    return tail;
  }

  at(index) { //Returns node at given index
    if (index > this.size()) return undefined;
    let count = 0;
    let pointer = this.#head;
    while (count != index) {
      pointer = pointer.nextNode;
      count++;
    }
    return pointer;
  }

  pop() { //Removes last node
    if (this.#head === null) return;
    if (this.size() === 1) {
      this.#head = null;
      return;
    }
    let pointer = this.#head;
    while (pointer.nextNode.nextNode != null) {
      pointer = pointer.nextNode;
    }
    pointer.nextNode = null;
    return this.toString();
  }

  contains(value) { //Returns true/false if value is in list
    if (this.#head === null) return;
    let pointer = this.#head;
    while (pointer != null && pointer.value != value ) {
      pointer = pointer.nextNode;
    }
    return (pointer === null ? false : true);
  }

  find(value) { //Returns index of node containing value
    if (this.#head === null) return;
    let pointer = this.#head;
    let count = 0;
    while (pointer.value != null && pointer.value != value) {
      pointer = pointer.nextNode;
      count++;
    }
    if (pointer === null) return null;
    return count;
  }

  toString() { //Returns string representation of list
    if (this.#head === 0) return null;
    let string = `( ${this.#head.value} ) -> `;
    let pointer = this.#head;
    while(pointer.nextNode != null) {
      pointer = pointer.nextNode;
      string += `( ${pointer.value} ) -> `;
    }
    return string + ` null`;
  }

  //Bonus methods

  insertAt(value, index) {
    if (index > this.size()) return;
    let newNode = new Node(value);
    let pointer = this.#head;
    let count = 0;
    if (index === 0) {
      this.prepend(value);
      return this.toString();
    }
    while (count < index - 1) {
      pointer = pointer.nextNode;
      count++;
    }
    newNode.nextNode = pointer.nextNode;
    pointer.nextNode = newNode;
    return this.toString();
  }

  removeAt(index) {
    if (index > this.size() || this.#head === null) return;
    let pointer = this.#head;
    let count = 0;
    if (index === this.size() - 1) {
      this.pop();
      return this.toString();
    }
    if (index === 0) {
      this.#head = this.#head.nextNode;
      return this.toString();
    }
    while (count < index - 1) {
      pointer = pointer.nextNode;
      count++;
    }
    pointer.nextNode = pointer.nextNode.nextNode;
    return this.toString();
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}