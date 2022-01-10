# 力扣

## 剑指 Offer 40. 最小的 k 个数

输入整数数组 arr ，找出其中最小的 k 个数。例如，输入 4、5、1、6、2、7、3、8 这 8 个数字，则最小的 4 个数字是 1、2、3、4。

例：

```javascript
arr=[0,0,0,2,0,5], k=0 -> []
arr=[3,2,1], k=2 -> [1,2] 或 [2,1]
arr=[0,1,2,1], k=1 -> [0]
```

解：

```javascript
// 解题思路：利用大顶堆头部弹出，向下调整，第一项是最大的

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
  if (!k) return [];
  const heap = new Heap(arr, k);
  while (heap.data.length !== k) {
    res = heap.poll();
  }
  return heap.data;
};

class Heap {
  constructor(data = []) {
    this.data = data;
    this.heapify();
  }
  size() {
    return this.data.length;
  }
  heapify() {
    if (this.size() < 2) return;
    for (let i = 1; i < this.data.length; i++) {
      this.bubbleUp(i);
    }
  }
  offer(val) {
    this.data.push(val);
    this.bubbleUp(this.size() - 1);
  }
  poll() {
    if (!this.size()) return null;
    const res = this.data[0];
    this.data[0] = this.data.pop();
    if (this.size()) {
      this.bubbleDown(0);
    }
    return res;
  }
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] < this.data[parentIndex]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const lastIndex = this.size() - 1;
    while (index < lastIndex) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;
      let findIndex = index;
      if (this.data[leftIndex] > this.data[findIndex]) {
        findIndex = leftIndex;
      }
      if (this.data[rightIndex] > this.data[findIndex]) {
        findIndex = rightIndex;
      }
      if (findIndex === index) break;
      this.swap(index, findIndex);
      index = findIndex;
    }
  }
  swap(i, j) {
    if (i === j) return;
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}
```

## 1046. 最后一块石头的重量

有一堆石头，每块石头的重量都是正整数。

每一回合，从中选出两块 最重的 石头，然后将它们一起粉碎。假设石头的重量分别为  x 和  y，且  x <= y。那么粉碎的可能结果如下：
   如果  x == y，那么两块石头都会被完全粉碎；
   如果  x != y，那么重量为  x  的石头将会完全粉碎，而重量为  y  的石头新重量为  y-x。
最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 0。

例：

```javascript
输入：[2,7,4,1,8,1]
输出：1
解释：
先选出 7 和 8，得到 1，所以数组转换为 [2,4,1,1,1]，
再选出 2 和 4，得到 2，所以数组转换为 [2,1,1,1]，
接着是 2 和 1，得到 1，所以数组转换为 [1,1,1]，
最后选出 1 和 1，得到 0，最终数组转换为 [1]，这就是最后剩下那块石头的重量。

```

解：

```javascript
// 解题思路：大顶堆，每次头部出两个元素，a>b就插入a-b，知道data的长度小于或等于1

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  let heap = new Heap(stones);

  while (heap.size() > 1) {
    const a = heap.poll();
    const b = heap.poll();
    if (a > b) {
      heap.offer(a - b);
    }
  }
  return heap.isEmpty() ? 0 : heap.data[0];
};

class Heap {
  constructor(data = []) {
    this.data = data;
    this.heapify();
  }
  size() {
    return this.data.length;
  }
  isEmpty() {
    return this.data.length === 0;
  }
  heapify() {
    if (this.size() < 2) return;
    for (let i = 0; i < this.size(); i++) {
      this.bubbleUp(i);
    }
  }
  offer(val) {
    this.data.push(val);
    this.bubbleUp(this.size() - 1);
  }
  poll() {
    if (!this.size()) return null;
    const res = this.data[0];
    this.size() > 1 ? (this.data[0] = this.data.pop()) : this.data.pop();
    if (this.size()) {
      this.bubbleDown(0);
    }
    return res;
  }
  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] < this.data[parentIndex]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }
  bubbleDown(index) {
    const lastIndex = this.size() - 1;
    while (index < lastIndex) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;
      let findIndex = index;
      if (this.data[findIndex] < this.data[leftIndex]) {
        findIndex = leftIndex;
      }
      if (this.data[findIndex] < this.data[rightIndex]) {
        findIndex = rightIndex;
      }
      if (index === findIndex) break;
      this.swap(index, findIndex);
      index = findIndex;
    }
  }
}
```

## 703. 数据流中的第 K 大元素

设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。

请实现 KthLargest  类：

KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。

例：

```javascript
输入：
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
输出：
[null, 4, 5, 5, 8, 8]

解释：
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
```

解：

```javascript
// 解题思路：创造一个小根堆，然后利用poll留下k个值，也就是大小为k的小根堆，其中优先队列的队头为队列中最小的元素，也就是第 k 大的元素
// 最开始依次将nums的元素加入堆中，如果对的size大于k就出堆，保证头是最小值，也就是第k个最大值
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.k = k;
  this.heap = new MinHeap();
  for (const i of nums) {
    this.add(i);
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.heap.offer(val);
  if (this.heap.size() > this.k) {
    this.heap.poll();
  }
  return this.heap.peek();
};

class MinHeap {
  constructor(data = []) {
    this.data = data;
    this.heapity();
  }
  heapity() {
    if (this.size() < 2) return;
    for (let i = 0; i < this.data.length; i++) {
      this.bubbleUp(i);
    }
  }
  size() {
    return this.data.length;
  }
  peek() {
    if (!this.size()) return null;
    return this.data[0];
  }
  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
  offer(val) {
    this.data.push(val);
    this.bubbleUp(this.size() - 1);
  }
  poll() {
    if (!this.size()) return null;
    const res = this.data[0];
    this.size() > 1 ? (this.data[0] = this.data.pop()) : this.data.pop();
    if (this.size()) {
      this.bubbleDown(0);
    }
    return res;
  }
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] > this.data[parentIndex]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }
  bubbleDown(index) {
    const lastIndex = this.size() - 1;
    while (index < lastIndex) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;
      let findIndex = index;
      if (this.data[findIndex] > this.data[leftIndex]) {
        findIndex = leftIndex;
      }
      if (this.data[findIndex] > this.data[rightIndex]) {
        findIndex = rightIndex;
      }
      if (index === findIndex) break;
      this.swap(index, findIndex);
      index = findIndex;
    }
  }
}
```

## 373. 查找和最小的 K 对数字

给定两个以升序排列的整数数组 nums1 和 nums2 ,  以及一个整数 k 。

定义一对值  (u,v)，其中第一个元素来自  nums1，第二个元素来自 nums2 。

请找到和最小的 k  个数对  (u1,v1),  (u2,v2)  ...  (uk,vk) 。

例：

```javascript
// 例子1：
输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
输出: [1,2],[1,4],[1,6]
解释: 返回序列中的前 3 对数：
     [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

// 例子2：
输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
输出: [1,1],[1,1]
解释: 返回序列中的前 2 对数：
     [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

// 例子3：
输入: nums1 = [1,2], nums2 = [3], k = 3
输出: [1,3],[2,3]
解释: 也可能序列中所有的数对都被返回:[1,3],[2,3]
```

解：

```javascript
// 解法1 利用小根堆
var kSmallestPairs = function (nums1, nums2, k) {
  let heap = new MinHeap([], (lower, higher) => lower.val > higher.val);

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      if (heap.data.length == k && nums1[i] + nums2[j] > heap.data[0].val) {
        break;
      }
      heap.offer({
        val: nums1[i] + nums2[j],
        item: [nums1[i], nums2[j]],
      });

      if (heap.data.length > k) {
        heap.poll();
      }
    }
  }
  let ret = [];
  console.log("heap=>", heap.data);
  while (heap.data.length) {
    let item = heap.poll().item;
    console.log(item);
    ret.push(item);
  }
  console.log("ret=>", ret);
  return ret.reverse();
};

class MinHeap {
  constructor(data = [], compare) {
    this.data = data;
    this.compare = compare;
    this.heapity();
  }
  heapity() {
    if (this.size() < 2) return;
    for (let i = 0; i < this.data.length; i++) {
      this.bubbleUp(i);
    }
  }
  size() {
    return this.data.length;
  }
  peek() {
    if (!this.size()) return null;
    return this.data[0];
  }
  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
  offer(val) {
    this.data.push(val);
    this.bubbleUp(this.size() - 1);
  }
  poll() {
    if (!this.size()) return null;
    const res = this.data[0];
    this.size() > 1 ? (this.data[0] = this.data.pop()) : this.data.pop();
    if (this.size()) {
      this.bubbleDown(0);
    }
    return res;
  }
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.data[parentIndex], this.data[index])) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }
  bubbleDown(index) {
    const lastIndex = this.size() - 1;
    while (index < lastIndex) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;
      let findIndex = index;

      if (
        leftIndex < this.size() &&
        this.compare(this.data[leftIndex], this.data[findIndex])
      ) {
        findIndex = leftIndex;
      }
      if (
        rightIndex < this.size() &&
        this.compare(this.data[rightIndex], this.data[findIndex])
      ) {
        findIndex = rightIndex;
      }
      if (index === findIndex) break;
      this.swap(index, findIndex);
      index = findIndex;
    }
  }
}

// 解法2冒泡
var kSmallestPairs = function (nums1, nums2, k) {
  let array = [];
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      array.push([nums1[i], nums2[j]]);
    }
  }
  array.sort((a, b) => {
    return a[0] + a[1] - (b[0] + b[1]);
  });
  return array.slice(0, k);
};
```

## 215. 数组中的第 K 个最大元素

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

例：

```javascript
// 例1：
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5

// 例2：
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

解：

```javascript
var findKthLargest = function (nums, k) {
  heap = new MinHeap(nums);
  while (heap.size() > k) {
    heap.poll();
  }
  return heap.peek();
};

class MinHeap {
  constructor(data = []) {
    this.data = data;
    this.heapity();
  }
  heapity() {
    if (this.size() < 2) return;
    for (let i = 0; i < this.data.length; i++) {
      this.bubbleUp(i);
    }
  }
  size() {
    return this.data.length;
  }
  peek() {
    if (!this.size()) return null;
    return this.data[0];
  }
  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
  offer(val) {
    this.data.push(val);
    this.bubbleUp(this.size() - 1);
  }
  poll() {
    if (!this.size()) return null;
    const res = this.data[0];
    this.size() > 1 ? (this.data[0] = this.data.pop()) : this.data.pop();
    if (this.size()) {
      this.bubbleDown(0);
    }
    return res;
  }
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] > this.data[parentIndex]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }
  bubbleDown(index) {
    const lastIndex = this.size() - 1;
    while (index < lastIndex) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;
      let findIndex = index;
      if (
        leftIndex < this.size() &&
        this.data[findIndex] > this.data[leftIndex]
      ) {
        findIndex = leftIndex;
      }
      if (right < this.size() && this.data[findIndex] > this.data[rightIndex]) {
        findIndex = rightIndex;
      }
      if (index === findIndex) break;
      this.swap(index, findIndex);
      index = findIndex;
    }
  }
}
```
