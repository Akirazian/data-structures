class LinkedList {
    #counter = 0;
    #head = null;
    #tail = null;

  append(value) { //Adds new node containing value to end of list
    let newNode = new Node(value);
    this.#counter++;
    if (this.#head === null) {
      this.#head = newNode;
      this.#tail = newNode;
      return;
    }
    let pointer = this.#head;
    while (pointer.nextNode != null) {
      pointer = pointer.nextNode;
    }
    pointer.nextNode = newNode;
    this.#tail = newNode;
  }

  prepend(value) { //Adds new node containing value to front of list
    if (this.#counter === 0) {
      this.append(value);
      return;
    }
    let newNode = new Node(value);
    this.#counter++;
    newNode.nextNode = this.#head;
    this.#head = newNode;
  }

  size() { //Returns total number of nodes in list
    return this.#counter;
  }

  head() { //Returns first node
    return this.#head;
  }

  tail() { //Returns last node
    return this.#tail;
  }

  at(index) { //Returns node at given index
    if (index > this.#counter) return undefined;
    let count = 0;
    let pointer = this.#head;
    while (count != index) {
      pointer = pointer.nextNode;
      count++;
    }
    return pointer;
  }

  pop() { //Removes last node
    if (this.#counter === 0) return;
    if (this.#counter === 1) {
      this.#head = null
      this.#tail = null
      this.#counter--;
      return;
    };
    let pointer = this.#head;
    while (pointer.nextNode != this.#tail) {
      pointer = pointer.nextNode;
    }
    pointer.nextNode = null;
    this.#tail = pointer;
    this.#counter--;
  }

  contains(value) { //Returns true/false if value is in list
    if (this.#head === null) return;
    let pointer = this.#head;
    while (pointer != null && pointer.value != value ) {
      pointer = pointer.nextNode;
    }
    if (pointer === null) return false;
    return true;
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
    if (this.#counter === 0) return null;
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
    if (index > this.#counter) return;
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
    this.#counter++;
    return this.toString();
  }

  removeAt(index) {
    if (index > this.#counter || this.#counter === 0) return;
    let pointer = this.#head;
    let count = 0;
    if (index === this.#counter - 1) {
      this.pop();
      return this.toString();
    }
    if (index === 0) {
      this.#head = this.#head.nextNode;
      this.#counter--;
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