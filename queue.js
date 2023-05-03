/** Node: node for a queue. */

class QNode {
    constructor(val) {
      this.val = val;
      this.next = null;
    }
  }
  
  /** Queue: chained-together nodes where you can
   *  remove from the front or add to the back. */
  
  class Queue {
    constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
    }
  
    /** enqueue(val): add new value to end of the queue. Returns undefined. */
  
    enqueue(val) {
      // queue is empty
      if(this.first === null && this.size === 0) {
        this.first = this.last = new QNode(val);
        this.size++;
        return;
      };
      // add queued value to end of queue
      this.last.next = new QNode(val);
      this.last = this.last.next;
      this.size++;
      return;
    }
  
    /** dequeue(): remove the node from the start of the queue
     * and return its value. Should throw an error if the queue is empty. */
  
    dequeue() {
      // queue is empty
      if(this.first === null && this.size === 0) throw new Error('Queue is empty!');
      let temp = this.first;
      this.first = this.first.next;
      this.size--;
      // make sure next pointer is cleared
      temp.next = null;
      if(this.size === 0) {
        this.first = null;
        this.last = null;
      }
      return temp.val;
    }
  
    /** peek(): return the value of the first node in the queue. */
  
    peek() {
      // queue is empty
      if(this.first === null && this.size === 0) throw new Error('Queue is empty!');
      return this.first.val;
    }
  
    /** isEmpty(): return true if the queue is empty, otherwise false */
  
    isEmpty() {
      return (this.first === null && this.size === 0) ? true : false; 
    }
  }
  
  module.exports = Queue;