# 什么是队列

- 队列是一片连续的存储区，可以存储任意元素

- 可以是数组，也可以是链表

- 必须是尾部入队，头部出队

- 有两个指针

  - 头指针：通常指向第一个元素

  - 尾指针：通常指最后一个元素的下一位

  - 左闭右开，尾指针处不存值(数据动画)，尾-头=元素数量

## 1. 出队，入队

- 出队：头指针向后移动一步

- 尾指针向后移动一步并把元素放进来

## 2. 假溢出

- 还有空间，并不是真的溢出，只是尾指针走到了最后一位

## 3. 循环队列

- 头尾指针移动规则：走到末尾再从头开始

- 为了有效的利用空间

## 4. 应用场景

- CPU 超线程技术

- 线程池的任务对列

  - 当有任务提交到线程池，线程池首先会根据核心线程数创建线程来处理这些任务

  - 如果核心线程处理不过来，就放到一个阻塞对列等待，这里就用到了对列这种数据结构

- js 事件环

  - 宏任务同步代码 -> 微任务(对列) -> 宏任务(对列，一个任务) -> 微任务(一个对列)

## 5. 队列代码实现

- 普通队列

```javascript
class Queue {
  // n代表生成队列的长度
  constructor(n) {
    this.arr = new Array(n); // 用数组模拟
    this.head = 0; // 头
    this.tail = 0; // 尾指针默认指向0，也就是头
  }
}

// 入队
Queue.prototype.enqueue = function (val) {
  // 满队
  if (this.full()) return;
  // 从队尾进入一个值
  this.arr[this.tail] = val;
  // 尾指针向后移动一位
  this.tail += 1;
};

// 出队
Queue.prototype.dequeue = function () {
  // 空队列
  if (this.empty()) return;
  // 头指针向后移动一位
  this.head += 1;
};

// 满队列
Queue.prototype.full = function () {
  return (this.tail = this.arr.lenth);
};

// 空队列
Queue.prototype.empty = function () {
  return (this.head = this.tail);
};

// 队列中元素的个数
Qeueue.prototype.size = function () {
  return this.tail - this.head;
};
```

- 循环队列

```javascript
class Queue {
  constructor(n) {
    this.arr = new Array(n);
    this.head = 0;
    this.tail = 0;
    this.cnt = 0; // 用来记录元素个数
  }
}

// 入队
Queue.prototype.enqueue = function (val) {
  if (this.full()) return;
  this.arr[this.tail] = val;
  this.tail += 1;

  // 如果尾指针超出队列，尾指针指向0
  if (this.tail === this.arr.length) this.tail = 0;
  this.cnt++; // 记录个数
};

// 出队
Queue.prototype.dequeue = function () {
  if (this.empty()) return;
  this.head += 1;
  // 如果出队又入队，然后出队到超出长度，那么从头继续出
  if ((this.head = this.arr.length)) this.head = 0;
  this.cnt--;
};

// 空队列
Queue.prototype.empty = function () {
  return this.cnt === 0;
};

// 满
Queue.prototype.full = function () {
  return this.cnt === this.arr.length;
};

// 个数
Queue.prototype.size = function () {
  return this.cnt;
};

// 测试
const keyNames = [
  "MyCircularQueue",
  "enQueue",
  "enQueue",
  "enQueue",
  "enQueue",
  "Rear",
  "isFull",
  "deQueue",
  "enQueue",
  "Rear",
];
const vals = [[3], [1], [2], [3], [4], [], [], [], [4], []];

let instance;
for (let i = 0; i < keyNames.length; i++) {
  const name = keyNames[i];
  const val = vals[i];
  if (name === "MyCircularQueue") {
    instance = new Queue(val[0]);
    console.log(null);
  } else {
    console.log(instance[name](val[0]));
  }
}
```

## 6. 力扣

### 1)循环链表

#### 622.设计循环队列

```javascript
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.arr = new Array(k);
  this.head = 0;
  this.tail = 0;
  this.cnt = 0;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) return false;
  this.arr[this.tail] = value;
  this.tail += 1;
  if (this.tail === this.arr.length) this.tail = 0;
  this.cnt++;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false;
  this.head += 1;
  if (this.head === this.arr.length) this.head = 0;
  this.cnt--;
  return true;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) return -1;
  return this.arr[this.head];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) return -1;
  return this.arr[this.tail !== 0 ? this.tail - 1 : this.arr.length - 1];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  return this.cnt === 0;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  return this.cnt === this.arr.length;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
```
