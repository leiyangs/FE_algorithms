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

## 844. 比较含退格的字符串

- 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，请你判断二者是否相等。# 代表退格字符。

- 如果相等，返回 true ；否则，返回 false 。

- 注意：如果对空文本输入退格字符，文本继续为空。

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  let stackA = new Array();
  let stackB = new Array();
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "#":
        stackA.pop();
        break;

      default:
        stackA.push(s[i]);
        break;
    }
  }

  for (let i = 0; i < t.length; i++) {
    switch (t[i]) {
      case "#":
        stackB.pop();
        break;

      default:
        stackB.push(t[i]);
        break;
    }
  }

  return stackA.toString() === stackB.toString();
};
```

## 1249. 移除无效的括号

- 给你一个由 '('、')' 和小写字母组成的字符串 s。

- 你需要从字符串中删除最少数目的 '(' 或者 ')' （可以删除任意位置的括号)，使得剩下的「括号字符串」有效。

- 请返回任意一个合法字符串。

- 有效「括号字符串」应当符合以下 任意一条 要求：

  - 空字符串或只包含小写字母的字符串
  - 可以被写作 AB（A 连接 B）的字符串，其中 A 和 B 都是有效「括号字符串」
  - 可以被写作 (A) 的字符串，其中 A 是一个有效的「括号字符串」

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  let cnt = 0;
  let stack = [];
  // 把s都入栈，如果cnt<0，则右括号多，就不入栈
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") cnt++;
    if (s[i] === ")") cnt--;
    if (cnt < 0) {
      cnt++;
      continue;
    }
    stack.push(s[i]);
  }
  // 如果cnt>0，则左边括号多，那就删除多余的
  if (cnt === 0) return stack.join("");
  for (let i = stack.length - 1; i >= 0 && cnt; i--) {
    if (stack[i] === "(") {
      stack.splice(i, 1);
      cnt--;
    }
  }
  return stack.join("");
};
```

## 145. 二叉树的后序遍历

给定一个二叉树，返回它的 后序 遍历。

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  if (!root) return [];
  let ret = [];
  getNode(root, ret);
  return ret;
};

var getNode = function (root, arr) {
  if (!root) return;
  getNode(root.left, arr);
  getNode(root.right, arr);
  arr.push(root.val);
};
```

## 227. 基本计算器 II

- 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

- 整数除法仅保留整数部分。

```javascript
/**
 * @param {string} s
 * @return {number}
 * 思路： 遍历 s
 *  1. 如果是数字，则拼接数字
 *  2. 如果是运算符:
 *    1. 如果是 + ，则压入栈中
 *    2. 如果是其他运算符，则和上一个数字进行运算再压入栈中
 *    3. 计算栈中的和值
 */
var calculate = function (s) {
  let i = 0;
  let str = "";
  let stack = [];
  let preOp = 0;

  while ((str = s[i])) {
    // 过滤空格
    if (str === " ") {
      i++;
      continue;
    }

    // 拼接数字
    let val = str;
    if (str >= "0" && str <= "9") {
      let j = i + 1;
      while (s[j] >= "0" && s[j] <= "9") {
        val += s[j];
        i++;
        j++;
      }
    }
    console.log(val);

    switch (val) {
      case "+":
        preOp = 0;
        break;
      case "-":
        preOp = 1;
        break;
      case "*":
        preOp = 2;
        break;
      case "/":
        preOp = 3;
        break;

      default:
        // 数字
        if (preOp === 1) {
          let temp = -val;
          stack.push(temp);
        } else if (preOp === 2) {
          let temp = stack.pop() * val;
          stack.push(temp);
        } else if (preOp === 3) {
          let temp = (stack.pop() / val) | 0;
          stack.push(temp);
        } else {
          // 前面运算符是+
          stack.push(val);
        }
        break;
    }
    i++;
  }
  console.log(stack);
  let ret = stack.reduce((prev, next) => +prev + +next, 0);
  return ret;
};
```

## 1021. 删除最外层的括号

```javascript
/**
 * @param {string} s
 * @return {string}
 */
/**
 * 解题思路
  有效括号：
  遇到左括号，当前计数值大于 0 ，则属于有效的左括号。 遇到(cnt++
  遇到右括号，当前计数值大于 1 ，则属于有效的右括号。 遇到)cnt--
  */
var removeOuterParentheses = function (s) {
  let cnt = 0,
    ret = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" && cnt++ > 0) {
      ret += s[i];
    }
    if (s[i] === ")" && cnt-- > 1) {
      ret += s[i];
    }
  }
  return ret;
};
```
