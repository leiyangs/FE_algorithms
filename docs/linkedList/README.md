# 什么是链表

- 若干个节点串成一串，这样的一个数据结构
- 链表中每个节点至少包含两个部分，数据域 和 指针域
- 链表的节点，通过指针域的值，形成一个线性结构
- 查找 O(n)，插入和删除 O(1)
- 不是和快速的定位数据，适合动态的插入和删除

![链表结构](../assets/images/linkedlist.png)

## 1. 如何成为链状结构

- 每个阶段都包含两个部分

  - 数据域：用于存储元素本身的数据信息，他不局限于一个成员数据，也可能是多个成员数据
  - 指针域：用于存储直接后继的节点信息

- 通过指针域的值形成了一个线性结构

  - 实现方式：地址、下标、引用

- 不适合快速的定位数据，适合动态的插入和删除

## 2. 双链表

- 有两个指针域，不仅可以向前还可以向后查找

## 3. 链表的实现方式

- 节点+指针

```javascript
class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function ListNode() {
  let head = new Node(1); // 第一个节点
  head.next = new Node(2); // 第二个节点
  head.next.next = new Node(3); // 第三个节点
  head.next.next.next = new Node(4); // ...

  let p = head,
    ret = "";
  while (p) {
    ret += `${p.val} => `;
    p = p.next;
  }

  ret += "null";
  console.log(ret);
  return ret;
}

ListNode();
```

- 双数组

```javascript
// data 数组存储数据
// next 数组存储指针，存储下一个数据的数组下标
function ListNode() {
  const data = [];
  const next = [];

  // 这里用index作为连接，index后，就相当于当前的next
  // 在index下标后添加一个p节点，节点的值是val
  function addNode(index, p, val) {
    // index节点指针指向p，p指向之前index的下一个节点
    next[p] = next[index]; // 这里p指向index的下一个节点，也就是q（可以理解为存放index的下一个节点）
    next[index] = p; // 这里把index指向新的p节点
    data[p] = val;
  }

  // 假设节点从3开始，值为a
  let head = 3;
  data[3] = "a";

  addNode(3, 5, "b"); // 3后面添加5节点，值是b
  addNode(5, 7, "c"); // 5后面添加7节点，值是c
  addNode(7, 2, "d"); // 7后面添加2节点，值是d
  addNode(2, 1, "e"); // ...
  addNode(7, 4, "f"); // ...
  addNode(2, 6, "g"); // ...

  console.log();

  let p = head,
    ret = "";
  while (p) {
    ret += `${data[p]} => `;
    p = next[p];
  }

  ret += "null";
  console.log(ret);
  console.log(data, next);
  return ret;
}
// '3 => 5 => 7 => 4 => 2 => 6 => 1 => null'
// 'a => b => c => f => d => g => e => null'
```

手动画图
![listnode](../assets/images/listnode.jpg)

## 4. 应用场景

- 操作系统内的动态内存分配
- LRU 缓存淘汰算法
  - 缓存：高速设备之于低速设备的一种称呼
  - 缓存维护
    - 链表结构：链表 + hash
    - 放入新数据时，淘汰旧数据
- JS Map 底层
