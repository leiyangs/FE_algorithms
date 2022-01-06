# 力扣

## 剑指 Offer 40. 最小的 k 个数

输入整数数组 arr ，找出其中最小的 k 个数。例如，输入 4、5、1、6、2、7、3、8 这 8 个数字，则最小的 4 个数字是 1、2、3、4。

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
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
