# 力扣

## 面试题 03.04. 化栈为队

实现一个 MyQueue 类，该类用两个栈来实现一个队列。

**解题思路：每次通过 A 出栈，入栈到 B，取到第一个元素**

```javascript
/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.StackA = new Array();
  this.StackB = new Array();
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.StackA.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  while (this.StackA.length) {
    this.StackB.push(this.StackA.pop());
  }
  let ret = this.StackB.pop();
  while (this.StackB.length) {
    this.StackA.push(this.StackB.pop());
  }
  return ret;
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  while (this.StackA.length) {
    this.StackB.push(this.StackA.pop());
  }
  let ret = this.StackB[this.StackB.length - 1];
  while (this.StackB.length) {
    this.StackA.push(this.StackB.pop());
  }
  return ret;
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.StackA.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

## 682. 棒球比赛

- 你现在是一场采用特殊赛制棒球比赛的记录员。这场比赛由若干回合组成，过去几回合的得分可能会影响以后几回合的得分。

- 比赛开始时，记录是空白的。你会得到一个记录操作的字符串列表 ops，其中 ops[i] 是你需要记录的第 i 项操作，ops 遵循下述规则：

  - 整数 x - 表示本回合新获得分数 x
  - "+" - 表示本回合新获得的得分是前两次得分的总和。题目数据保证记录此操作时前面总是存在两个有效的分数。
  - "D" - 表示本回合新获得的得分是前一次得分的两倍。题目数据保证记录此操作时前面总是存在一个有效的分数。
  - "C" - 表示前一次得分无效，将其从记录中移除。题目数据保证记录此操作时前面总是存在一个有效的分数。

请你返回记录中所有得分的总和。

```javascript
/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function (ops) {
  let arr = new Array();
  for (let i = 0; i < ops.length; i++) {
    switch (ops[i]) {
      case "+":
        let len = arr.length;
        arr.push(arr[len - 1] + arr[len - 2]);
        break;
      case "D":
        arr.push(+arr[arr.length - 1] * 2);
        break;
      case "C":
        arr.pop();
        break;
      default:
        arr.push(+ops[i]);
    }
  }
  let ret = arr.reduce((pre, next) => {
    return pre + next;
  }, 0);

  return ret;
};
```
