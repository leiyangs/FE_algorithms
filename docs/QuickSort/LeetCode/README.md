# 力扣

## 快速排序

### 148. 排序链表

给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

```javascript
输入：head = [4,2,1,3]
输出：[1,2,3,4]
```

解：

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
 * @return {ListNode}
 */
var sortList = function(head) {
  return toSortList(head, null)
};


const toSortList = function (head, tail) {
  if (!head) return head
  if (head.next === tail) {
    head.next = null
    return head
  }

  let slow = head, fast = head
  while (fast !== tail) {
    slow = slow.next
    fast = fast.next
    if (fast !== tail) {
      fast = fast.next
    }
  }

  const mid = slow
  return merge(toSortList(head, mid), toSortList(mid, tail))
}

const merge = function (head1, head2) {
  const dummyHead = new ListNode(0);
  let temp = dummyHead, temp1 = head1, temp2 = head2;
  while (temp1 !== null && temp2 !== null) {
    if (temp1.val <= temp2.val) {
      temp.next = temp1;
      temp1 = temp1.next;
    } else {
        temp.next = temp2;
        temp2 = temp2.next;
    }
    temp = temp.next
  }

  if (temp1 !== null) {
    temp.next = temp1
  } else if (temp2 !== null) {
    temp.next = temp2
  }

  return dummyHead.next
}
```

### 912. 排序数组

给你一个整数数组 nums，请你将该数组升序排列。

```javascript
输入：nums = [5,2,3,1]
输出：[1,2,3,5]
```

解：

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  if(nums.length<=1) return nums
  return quickSort(nums,0,nums.length-1)
};

function quickSort(arr,left,right) {
  if(left>=right) return
  while(left<right) {
    let x = left, y=right, base=arr[x]
    while(x<y) {
      while(x<y&&arr[y]>=base) y--
      if(x<y) arr[x++] = arr[y]

      while(x<y&&arr[x]<=base) x++
      if(x<y) arr[y--] = arr[x]
    }
    arr[x] = base

    quickSort(arr,x+1,right)
    right=x-1
  }
  return arr
}
```

### 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面

```javascript
输入：nums = [1,2,3,4]
输出：[1,3,2,4] 
注：[3,1,2,4] 也是正确的答案之一。
```

解：

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
  if(nums.length <= 1) return nums
  return quickSort(nums,0,nums.length-1)
};

var quickSort = function(arr,left,right) {
  if (left >= right) return
  for(let i=0;i<arr.length;i++) {
    let x = left, y = right
    while(x<y&&arr[y]%2===0) y--

    while(x<y&&arr[x]%2!==0) x++
    [arr[x],arr[y]] = [arr[y],arr[x]]
  }
  return arr
}
```

### 面试题 17.14. 最小K个数

设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。

```javascript
输入： arr = [1,3,5,7,2,4,6,8], k = 4
输出： [1,2,3,4]
```

解：

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
  if(arr.length<=1) return arr
  let result = quickSort(arr,0,arr.length-1)
  console.log(result)
  return result.slice(0,k)
};

var quickSort = function (arr,left,right) {
  if(left >= right) return // 指针最终相等，停止递归
  while(left < right) {
    let x = left, y = right, base = arr[x]
    while(x < y) {
      // 右指针往左走
      while(x < y && arr[y] >=base) y--
      if(x < y) arr[x++] = arr[y]

      // 左指针往右走
      while(x < y && arr[x] <=base) x++
      if(x < y) arr[y--] = arr[x]
    }
    arr[x] = base

    quickSort(arr, x+1, right)
    right = x - 1
  }
  return arr
}
```

### 75. 颜色分类

给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

必须在不使用库的sort函数的情况下解决这个问题。

```javascript
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]


输入：nums = [2,0,1]
输出：[0,1,2]
```

解：

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  if(nums.length<=1) return nums
  quickSort(nums, 0, nums.length - 1)
  return nums
};

var quickSort = function(arr,l,r) {
  if(l >= r) return
  while(l < r) {
    let x = l, y = r, base = arr[x]
    while(x < y) {
      while(x < y && arr[y] >=base) y--
      if(x < y) arr[x++] = arr[y]

      while(x < y && arr[x] <=base) x++
      if(x < y) arr[y--] = arr[x]
    }
    arr[x] = base

    quickSort(arr, x+1, r)
    r = x - 1
  }
}

```

## 归并排序
