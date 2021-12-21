# 力扣

## 589. N 叉树的前序遍历

给定一个 N 叉树，返回其节点值的 前序遍历 。

N 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。

解：

```javascript
var preorder = function (root) {
  let arr = [];
  getNode(root, arr);
  return arr;
};

var getNode = function (root, arr) {
  if (!root) return null; // 边界条件
  arr.push(root.val);
  root.children.forEach((element) => {
    getNode(element, arr);
  });
  return arr;
};
```

## 226. 翻转二叉树

翻转一棵二叉树。

示例：

```javascript
// 输入：
     4
   /   \
  2     7
 / \   / \
1   3 6   9

// 输出：
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

解：

```javascript
var invertTree = function (root) {
  reverse(root);
  return root;
};

var reverse = function (root) {
  if (!root) return null;
  [root.left, root.right] = [root.right, root.left];
  reverse(root.left);
  reverse(root.right);
};
```

## 剑指 Offer 32 - II. 从上到下打印二叉树 II

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

例如:

```javascript
// 给定二叉树: [3,9,20,null,null,15,7]
    3
   / \
  9  20
    /  \
   15   7

// 返回其层次遍历结果：
[
  [3],
  [9,20],
  [15,7]
]
```

解：

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let arr = [];
  setNode(root, arr, 0);
  return arr;
};

var setNode = function (root, arr, k) {
  if (!root) return null;
  arr[k] = arr[k] || [];
  arr[k].push(root.val);
  setNode(root.left, arr, k + 1);
  setNode(root.right, arr, k + 1);
  return arr;
};
```

## 107. 二叉树的层序遍历 II

给定一个二叉树，返回其节点值自底向上的层序遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

例如：

```javascript
// 给定二叉树 [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7

// 返回其自底向上的层序遍历为：
[
  [15,7],
  [9,20],
  [3]
]
```

解：

```javascript
var levelOrderBottom = function (root) {
  let arr = [];
  getNode(root, arr, 0);
  return arr.reverse();
};

var getNode = function (root, arr, n) {
  if (!root) return null;
  arr[n] = arr[n] || [];
  arr[n].push(root.val);
  getNode(root.left, arr, n + 1);
  getNode(root.right, arr, n + 1);
  return arr;
};
```

## 103. 二叉树的锯齿形层序遍历

给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

例如：

```javascript
// 给定二叉树 [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7

// 返回锯齿形层序遍历如下：
[
  [3],
  [20,9],
  [15,7]
]
```

解：

```javascript
var zigzagLevelOrder = function (root) {
  let arr = [];
  getNode(root, arr, 0);
  for (let i = 1; i < arr.length; i++) {
    const element = arr[i];
    if (i % 2 !== 0) {
      element.reverse();
    }
  }
  return arr;
};

var getNode = function (root, arr, k) {
  if (!root) return null;
  arr[k] = arr[k] || [];
  arr[k].push(root.val);

  getNode(root.left, arr, k + 1);
  getNode(root.right, arr, k + 1);

  return arr;
};
```
