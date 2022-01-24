# 力扣

## 547. 省份数量

有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。

例：

```javascript
// 例1：
输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
输出：2

// 例2：
输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
输出：3
```

解：

```javascript
// 解法1：染色法
var findCircleNum = function (isConnected) {
  // 染色法
  let len = isConnected.length;
  let color = new Array(len);
  // 每个集合染色
  for (let i = 0; i < len; i++) color[i] = i;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (isConnected[i][j]) {
        let colorJ = color[j];

        for (let x = 0; x < len; x++) {
          // 如果节点相同就染色
          if (color[x] === colorJ) color[x] = color[i];
        }
      }
    }
  }
  console.log(color);
  return new Set(color).size;
};

// 解法2：树
var findCircleNum = function (isConnected) {
  let len = isConnected.length;
  let union = new UnionSet(len);

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (isConnected[i][j]) {
        union.merge(i, j);
      }
    }
  }
  console.log(union);
  return union.size;
};

class UnionSet {
  constructor(len) {
    this.len = len;
    this.size = len;
    this.father = new Array(len);
    this.init();
  }
  init() {
    for (let i = 0; i < this.len; i++) {
      this.father[i] = i;
    }
  }
  find(x) {
    if (this.father[x] === x) return x;
    return this.find(this.father[x]);
  }
  query(a, b) {
    return this.find(a) === this.find(b);
  }
  merge(a, b) {
    const fA = this.find(a);
    const fB = this.find(b);
    if (fA === fB) return;
    this.father[fA] = fB;
    this.size--;
  }
}
```

## 200. 岛屿数量

给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

```javascript
var numIslands = function (grid) {
  let row = grid.length;
  let col = grid[0].length;
  const union = new UnionSet(row * col);
  let count = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] == "0") continue;
      count++;
      if (j + 1 < col && grid[i][j + 1] == 1) {
        union.merge(i * col + j, i * col + j + 1) && count--;
      }
      if (i + 1 < row && grid[i + 1][j] == 1) {
        union.merge(i * col + j, (i + 1) * col + j) && count--;
      }
    }
  }
  return count;
};

class UnionSet {
  constructor(n = 100) {
    this.n = n;
    this.father = new Array(n);
    this.init();
  }
  init() {
    for (let i = 0; i < this.n; i++) this.father[i] = i;
  }
  find(x) {
    return (this.father[x] =
      this.father[x] === x ? x : this.find(this.father[x]));
  }
  merge(a, b) {
    const fa = this.find(a);
    const fb = this.find(b);
    // 如果已经在一个集合汇总
    if (fa === fb) return false;

    this.father[fa] = fb;
    return true;
  }
}
```

## 990. 等式方程的可满足性

给定一个由表示变量之间关系的字符串方程组成的数组，每个字符串方程 equations[i] 的长度为 4，并采用两种不同的形式之一："a==b" 或 "a!=b"。在这里，a 和 b 是小写字母（不一定不同），表示单字母变量名。

只有当可以将整数分配给变量名，以便满足所有给定的方程时才返回 true，否则返回 false。

```javascript
/*
 * @lc app=leetcode.cn id=990 lang=javascript
 *
 * [990] 等式方程的可满足性
 */

// @lc code=start
/**
 * @param {string[]} equations
 * @return {boolean}
 */
class UnionSet {
  constructor() {
    this.father = new Array(26).fill(0).map((val, index) => index);
  }
  merge(a, b) {
    const fa = this.find(a);
    const fb = this.find(b);
    if (fa === fb) return;
    this.father[fa] = fb;
  }
  find(x) {
    return (this.father[x] =
      this.father[x] === x ? x : this.find(this.father[x]));
  }
}
var equationsPossible = function (equations) {
  const u = new UnionSet();
  // 联通所有==
  for (let equ of equations) {
    let op = equ[1];
    if (op === "!") continue;

    let a = equ[0].charCodeAt() - "a".charCodeAt();
    let b = equ[3].charCodeAt() - "a".charCodeAt();
    u.merge(a, b);
  }
  // 如果 != 两边的值在一个集合中返回 false
  for (let equ of equations) {
    let op = equ[1];
    if (op === "=") continue;

    let a = equ[0].charCodeAt() - "a".charCodeAt();
    let b = equ[3].charCodeAt() - "a".charCodeAt();
    if (u.find(a) === u.find(b)) return false;
  }
  return true;
};
// @lc code=end
```

## 684. 冗余连接

树可以看成是一个连通且 无环 的 无向 图。

给定往一棵 n 个节点 (节点值 1 ～ n) 的树中添加一条边后的图。添加的边的两个顶点包含在 1 到 n 中间，且这条附加的边不属于树中已存在的边。图的信息记录于长度为 n 的二维数组 edges ，edges[i] = [ai, bi] 表示图中在 ai 和 bi 之间存在一条边。

请找出一条可以删去的边，删除后可使得剩余部分是一个有着 n 个节点的树。如果有多个答案，则返回数组 edges 中最后出现的边。

```javascript
/*
 * @lc app=leetcode.cn id=684 lang=javascript
 *
 * [684] 冗余连接
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  const u = new UnionSet(edges.length);
  let ret = [];
  // 如果不在一个集合中就联通，如果已经在一个集合中就记录成答案
  for (let i = 0; i < edges.length; i++) {
    const val = edges[i];
    if (u.find(val[0]) === u.find(val[1])) ret = val;
    u.merge(val[0], val[1]);
  }

  return ret;
};

class UnionSet {
  constructor(n = 100) {
    this.n = n;
    this.father = new Array(n);
    this.init();
  }
  init() {
    for (let i = 0; i < this.n; i++) this.father[i] = i;
  }
  find(x) {
    return (this.father[x] =
      this.father[x] === x ? x : this.find(this.father[x]));
  }
  merge(a, b) {
    const fa = this.find(a);
    const fb = this.find(b);
    // 如果已经在一个集合汇总
    if (fa === fb) return;

    this.father[fa] = fb;
  }
}
// @lc code=end
```

## 1319. 联通网络的操作次数

用以太网线缆将 n 台计算机连接成一个网络，计算机的编号从 0 到 n-1。线缆用 connections 表示，其中 connections[i] = [a, b] 连接了计算机 a 和 b。

网络中的任何一台计算机都可以通过网络直接或者间接访问同一个网络中其他任意一台计算机。

给你这个计算机网络的初始布线 connections，你可以拔开任意两台直连计算机之间的线缆，并用它连接一对未直连的计算机。请你计算并返回使所有计算机都连通所需的最少操作次数。如果不可能，则返回 -1 。

```javascript
/*
 * @lc app=leetcode.cn id=1319 lang=javascript
 *
 * [1319] 连通网络的操作次数
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
  // 如果计算机数量大于网线数量+1
  if (n > connections.length + 1) return -1;

  const u = new UnionSet(n);
  for (let i = 0; i < connections.length; i++) {
    const conn = connections[i];
    u.merge(conn[0], conn[1]);
  }

  let cont = 0;
  for (let i = 0; i < n; i++) {
    if (u.find(i) === i) cont++;
  }
  // 返回没被两桶的计算机数量
  return cont - 1;
};

class UnionSet {
  constructor(n = 100) {
    this.n = n;
    this.father = new Array(n);
    this.init();
  }
  init() {
    for (let i = 0; i < this.n; i++) this.father[i] = i;
  }
  find(x) {
    return (this.father[x] =
      this.father[x] === x ? x : this.find(this.father[x]));
  }
  merge(a, b) {
    const fa = this.find(a);
    const fb = this.find(b);
    // 如果已经在一个集合汇总
    if (fa === fb) return;

    this.father[fa] = fb;
  }
}
// @lc code=end
```
