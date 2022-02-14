# 什么是排序

将杂乱无章的数据元素，通过一定的方法按关键字顺序排列的过程叫做排序。

- 稳定排序

  - 假设在待排序的文件中，存在两个或两个以上的记录具有相同的关键字，在用某种排序法排序后，若这些相同关键字的元素的相对次序仍然不变（如果a原本在b前面，而a=b，排序之后a仍然在b的前面。），则这种排序方法是稳定的。

- 就地排序
  
  - 若排序算法所需的辅助空间并不依赖于问题的规模n，即辅助空间为O(1)，则称为就地排序

- 内部排序

  - 若整个排序过程不需要访问外存便能完成，则称此类排序问题为内部排序。

- 外部排序

  - 外部排序指的是大文件的排序，即待排序的记录存储在外存储器上，待排序的文件无法一次装入内存，需要在内存和外部存储器之间进行多次数据交换，以达到排序整个文件的目的。 待排序的记录存储在外存上，排序时把数据一部分一部分的调入内存进行排序，在排序中需要多次进行内外存的交互，对外存文件中的记录进行排序后的结果仍然被放到原有文件中。这种排序方法就称外部排序。

## 十大排序

十种常见排序算法可以分为两大类：

- 比较类排序：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此也称为非线性时间比较类排序。

- 非比较类排序：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。

分类：
![算法分类](../assets/images/sort.png)

复杂度：
![算法复杂度](../assets/images/sortComplexity.png)
[参考链接(含动图)](https://www.cnblogs.com/onepixel/p/7674659.html)

### 1. 冒泡排序（Bubble Sort）

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

- 比较相邻的元素。如果第一个比第二个大，就交换它们两个；

- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；

- 针对所有的元素重复以上的步骤，除了最后一个；

- 重复步骤1~3，直到排序完成。

![冒泡排序](../assets/images/bubbleSort.gif)

```javascript
function bubbleSort(arr) {
  let len = arr.length - 1
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len - i; j++) { // i后面的已经排好了，所以要减去i
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}
```

### 2. 选择排序 (Selection-sort)

选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

- 初始状态：无序区为R[1..n]，有序区为空；

- 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；

- n-1趟结束，数组有序化了。

![选择排序](../assets/images/selectionSort.gif)

```javascript
function selectionSort(arr) {
  let len = arr.length - 1
  let minIndex
  for(let i = 0; i < len; i++) {
    minIndex = i
    for(let j = i+1; j < len; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
```

### 3. 插入排序（Insertion Sort）

插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

- 从第一个元素开始，该元素可以认为已经被排序；

- 取出下一个元素，在已经排序的元素序列中从后向前扫描；

- 如果该元素（已排序）大于新元素，将该元素移到下一位置；

- 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；

- 将新元素插入到该位置后；

- 重复步骤2~5。

![插入排序](../assets/images/insertionSort.gif)

```javascript
function insertionSort(arr) {
  let len = arr.length - 1
  let preIndex, current
  for(let i = 1; i < len; i++) { // 假设第一个元素已经排序，从第二个元素开始
    preIndex = i - 1
    current = arr[i]
    while(preIndex >= 0 && arr[preIndex] > current) { // 满足条件，一次后移
      arr[preIndex+1] = arr[preIndex]
      preIndex--
    }
    // 后移结束，然后插入
    arr[preIndex + 1] = current
  }
  return arr
}
```

### 4. 希尔排序（Shell Sort）

1959年Shell发明，第一个突破O(n2)的排序算法，是简单插入排序的改进版。它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。

- 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；

- 按增量序列个数k，对序列进行k 趟排序；

- 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

![希尔排序](../assets/images/shellSort.gif)

```javascript
function shellSort(arr) {
  let len = arr.length
  for(let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for(let i = gap; i < len; i++) {
      let j = i
      let current = arr[i]
      while(j - gap >= 0 && current < arr[j - gap]) {
        arr[j] = arr[j - gap]
        j = j - gap
      }
      arr[i] = current
    }
  }
  return arr
}
```

### 5. 归并排序（Merge Sort）

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。

- 把长度为n的输入序列分成两个长度为n/2的子序列；

- 对这两个子序列分别采用归并排序；

- 将两个排序好的子序列合并成一个最终的排序序列。

![归并排序](../assets/images/mergeSort.gif)

```javascript
function mergeSort(arr) {

}

function merge(left, right) {
  let result = []
}
```
