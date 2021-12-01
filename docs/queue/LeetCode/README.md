# 6. 力扣

## 1)循环链表

### 622. 设计循环队列

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

## 2)循环双端队列

### 641. 设计循环双端队列

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
/*
 * @lc app=leetcode.cn id=641 lang=javascript
 *
 * [641] 设计循环双端队列
 */

// @lc code=start
/**
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  this.myQueue = new Array(k);
  this.head = 0;
  this.tail = 1;
  this.k = k;
  this.count = 0;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  if (this.isFull()) return false;
  this.myQueue[this.head] = value;
  this.head = (--this.head + this.k) % this.k;
  this.count++;
  return true;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  if (this.isFull()) return false;
  this.myQueue[this.tail] = value;
  this.tail = ++this.tail % this.k;
  this.count++;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) return false;
  this.head = ++this.head % this.k;
  this.count--;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (this.isEmpty()) return false;
  this.tail = (--this.tail + this.k) % this.k;
  this.count--;
  return true;
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  if (this.isEmpty()) return -1;
  return this.myQueue[(this.head + 1) % this.k];
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  if (this.isEmpty()) return -1;
  return this.myQueue[(this.tail - 1 + this.k) % this.k];
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.count === 0;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  return this.count === this.k;
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
// @lc code=end
```

## 3)最近的请求次数

### 933. 最近的请求次数

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

## 4)亲密字符串

### 859. 亲密字符串

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

## 5). 拓展

### 860. 柠檬水找零

```javascript
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  let moneys = {
    5: 0,
    10: 0,
  };
  for (let i = 0; i < bills.length; i++) {
    switch (bills[i]) {
      case 5:
        moneys["5"]++;
        break;
      case 10:
        console.log(moneys);
        if (moneys[5] < 1) return false;
        moneys["5"]--;
        moneys["10"]++;
        break;
      case 20:
        if (moneys["10"] >= 1) {
          if (moneys["5"] < 1) return false;
          moneys["5"]--;
          moneys["10"]--;
        } else {
          if (moneys["5"] < 3) return false;
          moneys["5"] -= 3;
        }
    }
  }
  return true;
};
```

### 86. 分隔链表

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  if (!head) return head;
  let smallHead = new ListNode(0);
  let largeHead = new ListNode(0);
  let small = smallHead,
    large = largeHead;

  let curr = head;
  while (curr) {
    if (curr.val < x) {
      small.next = curr;
      small = small.next;
    } else {
      large.next = curr;
      large = large.next;
    }
    curr = curr.next;
  }

  small.next = largeHead.next;
  large.next = null;

  return smallHead.next;
};
```

### 969. 煎饼排序

```javascript
/**
 * 思路：将最大元素翻转到最前面，再一起翻转到最后面
 * 同样思路操作剩下的元素
 */
var reverse = function (arr, result) {
  if (arr.length === 1) return;
  let arr1 = []; // 去除数组最大的元素后的数组
  //  arr.length就是最大的数字
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr.length) {
      result.push(i + 1);
      // 滤掉了最大元素
      arr1 = arr
        .slice(0, i)
        .reverse()
        .concat(arr.slice(i + 1));
      break;
    }
  }
  result.push(arr.length);
  reverse(arr1.reverse(), result);
};
var pancakeSort = function (arr) {
  var result = [];
  reverse(arr, result);
  return result;
};
```

### 138. 复制带随机指针的链表

```javascript
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (!head) return head;
  let ret = new Node(0, null, null); // 新链表虚拟头
  let curr = head; // 旧链表指针
  let nrewPre = ret; // 新链表，指向前一个节点

  while (curr) {
    let newCurr = new Node(curr.val, null, null); // 创建节点
    nrewPre.next = newCurr;
    curr.link = newCurr; // 新节点映射到老节点

    // 新老节点往后走一步
    nrewPre = nrewPre.next;
    curr = curr.next;
  }

  // 更改新链表random
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.link.random = curr.random.link; // 新联表的random指向老链表random 的link
    }
    curr = curr.next;
  }

  // 删除旧链表的link属性
  while (curr) {
    delete curr.link;
    curr = curr.next;
  }
  return ret.next;
};
```

### 1670. 设计前中后队列

```javascript
var FrontMiddleBackQueue = function () {
  this.leftQueue = new Array();
  this.rightQueue = new Array(); // 奇数时右侧数组大1
  this.count = 0;
};

/**
 * @param {number} val
 * @return {void}
 */
// 调节两个对列的元素
FrontMiddleBackQueue.prototype.ava = function () {
  // 右侧个数比左侧多，且多于1个
  while (this.rightQueue.length - this.leftQueue.length > 1) {
    this.leftQueue.push(this.rightQueue.shift());
  }
  // 左侧比右侧多
  while (this.rightQueue.length - this.leftQueue.length < 0) {
    this.rightQueue.unshift(this.leftQueue.pop());
  }
};
FrontMiddleBackQueue.prototype.isEmpty = function () {
  return this.count === 0;
};

FrontMiddleBackQueue.prototype.pushFront = function (val) {
  this.leftQueue.unshift(val);
  this.count++;
  this.ava();
  return null;
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function (val) {
  this.leftQueue.push(val);
  this.count++;
  this.ava();
  return null;
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function (val) {
  this.rightQueue.push(val);
  this.count++;
  this.ava();
  return null;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function () {
  if (this.isEmpty()) return -1;
  let value = "";
  // 优先弹出左侧队列的元素
  if (this.leftQueue.length) {
    value = this.leftQueue.shift();
  } else {
    value = this.rightQueue.shift();
  }
  this.count--;
  this.ava();
  return value;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function () {
  if (this.isEmpty()) return -1;
  let value = "";
  // 如果是偶数个，弹出中间偏左的元素
  if (this.rightQueue.length === this.leftQueue.length) {
    value = this.leftQueue.pop();
  } else {
    // 否则中间元素为右队列第一个
    value = this.rightQueue.shift();
  }
  this.count--;
  this.ava();
  return value;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function () {
  if (this.isEmpty()) return -1;
  let value = this.rightQueue.pop();
  this.count--;
  this.ava();
  return value;
};
```
