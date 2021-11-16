# 什么是队列

- 队列是一片连续的存储区，可以存储任意元素

- 可以是数组，也可以是链表

- 有两个指针

  - 头指针：通常只想第一个元素

  - 尾指针：通常指最后一个元素的下一位

  - 左闭右开，尾指针处不存值(数据动画)，尾-头=元素数量

## 1. 出队，入队

- 出队：头指针向后移动一步

- 尾指针向后移动一步并把元素放进来

## 2. 假溢出

- 还有空间，并不是真的溢出，只是尾指针走到了最后一位

## 3. 循环队列

- 头尾指针移动规则：走到末尾再从头开始

- 为了有效的利用空间

## 4. 应用场景

- CPU 超线程技术

- 线程池的任务对列

  - 当有任务提交到线程池，线程池首先会根据核心线程数创建线程来处理这些任务

  - 如果核心线程处理不过来，就放到一个阻塞对列等待，这里就用到了对列这种数据结构

- js 事件环

  - 宏任务同步代码 -> 微任务(对列) -> 宏任务(对列，一个任务) -> 微任务(一个对列)