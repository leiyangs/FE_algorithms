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

#### 622. 设计循环队列

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
  // if (this.tail === this.arr.length) this.tail = 0;
  this.tail = this.tail % this.arr.length;
  this.cnt++;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false;
  this.head += 1;
  // if (this.head === this.arr.length) this.head = 0;
  this.head = this.head % this.arr.length;
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

### 2)循环双端队列

#### 641. 设计循环双端队列

设计实现双端队列。
你的实现需要支持以下操作：

- MyCircularDeque(k)：构造函数,双端队列的大小为 k。
- insertFront()：将一个元素添加到双端队列头部。 如果操作成功返回 true。
- insertLast()：将一个元素添加到双端队列尾部。如果操作成功返回 true。
- deleteFront()：从双端队列头部删除一个元素。 如果操作成功返回 true。
- deleteLast()：从双端队列尾部删除一个元素。如果操作成功返回 true。
- getFront()：从双端队列头部获得一个元素。如果双端队列为空，返回 -1。
- getRear()：获得双端队列的最后一个元素。  如果双端队列为空，返回 -1。
- isEmpty()：检查双端队列是否为空。
- isFull()：检查双端队列是否满了。

```javascript
/**
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  this.arr = new Array(k + 1);
  this.front = 0;
  this.tail = 0;
  this.n = k + 1;
  this.k = k;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  if (this.isFull("front")) return false;
  this.front = (--this.front + this.n) % this.n;
  this.arr[this.front] = value;
  return true;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  if (this.isFull("last")) return false;
  this.arr[this.tail] = value;
  this.tail++;
  this.tail = this.tail % this.n;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) return false;
  this.front = ++this.front % this.n;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (this.isEmpty()) return false;
  this.tail = (--this.tail + this.n) % this.n;
  return true;
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  if (this.isEmpty()) return -1;

  return this.arr[this.front];
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  if (this.isEmpty()) return -1;
  return this.arr[(this.tail - 1 + this.n) % this.n];
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.front === this.tail;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  // return (this.tail - this.front +this.n)%(this.n) === this.k
  console.log(this.tail, this.front, this.n, this.k);
  return (this.tail - this.front + this.n) % this.n == this.k;
};

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
```

### 3)最近的请求次数

#### 933. 最近的请求次数

- 写一个 `RecentCounter` 类来计算特定时间范围内最近的请求。

- 请你实现 `RecentCounter` 类：

  - `RecentCounter()` 初始化计数器，请求数为 0 。

  -`int ping(int t)` 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 `3000` 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 `[t-3000, t]` 内发生的请求数。

**解题思路：我们只会考虑最近 3000 毫秒到现在的 ping 数，因此我们可以使用队列存储这些 ping 的记录。当收到一个时间 t 的 ping 时，我们将它加入队列，并且将所有在时间 t - 3000 之前的 ping 移出队列。**

```javascript
var RecentCounter = function () {
  this.myQueue = new Array();
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.myQueue.push(t);
  const time = t - 3000;
  while (this.myQueue[0] < time) {
    this.myQueue.shift();
  }
  return this.myQueue.length;
};
```

### 4)亲密字符串

#### 859. 亲密字符串

- 给你两个字符串 s 和 goal ，只要我们可以通过交换 s 中的两个字母得到与 goal 相等的结果，就返回  true ；否则返回 false 。

- 交换字母的定义是：取两个下标 i 和 j （下标从 0 开始）且满足 i != j ，接着交换 s[i] 和 s[j] 处的字符。

- 例如，在 "abcd" 中交换下标 0 和下标 2 的元素可以生成 "cbad" 。

**解题思路：**

```javascript
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function (s, goal) {
  // 如果两字符串长度不同
  if (s.length !== goal.length) return false;
  // 如果两字符串相同，但是交换位置后不相等返回false。但是如果有重复，交换位置后也相等，即判断有没有重复
  if (s === goal) return s.length > new Set(s).size;
  // 存放两个不同的字母
  let arr = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      arr.push(s[i], goal[i]);
    }
  }
  console.log(arr);

  return arr.length === 4 && arr[0] === arr[3] && arr[1] === arr[2];
};
```
