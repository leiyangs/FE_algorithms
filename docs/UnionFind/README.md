# 什么是并查集(合并、查找、集合)

​ 并查集是一种树型的数据结构，用于处理一些不相交集合的合并及查询问题。

​ 并查集的思想是用一个数组表示了整片森林（parent），树的根节点唯一标识了一个集合，我们只要找到了某个元素的 的树根，就能确定它在哪个集合里。

## 性质

联通性：

​ A -> B + B -> C => A -> C : A 联通 B, B 联通 C, 推导出 A 联通 C。

- 描述：x 和 y 是亲戚，y 和 z 是亲戚，那么 x 和 z 也是亲戚。​ 如果 x,y 是亲戚，那么 x 的亲戚都是 y 的亲戚，y 的亲戚也都是 x 的亲戚。

- 思想： 并查集的重要思想在于，用集合中的一个元素代表集合。​ 我曾看过一个有趣的比喻，把集合比喻成帮派，而代表元素则是帮主。

## 操作

- 初始化: 把每个点所在集合初始化为其自身。 通常来说，这个步骤在每次使用该数据结构时只需要执行一次，无论何种实现方式，时间复杂度均为 O(n)

- 合并（Union）：把两个不相交的集合合并为一个集合。

- 查询（Find）：·查询两个元素是否在同一个集合中。 用递归的写法实现对代表元素的查询：一层一层访问父节点，直至根节点（根节点的标志就是父节点是本身）。 要判断两个元素是否属于同一个集合，只需要看它们的根节点是否相同即可

## 应用场景

- 适合解决具有联通关系的问题

## 实现

- 1. Quick-Find

  - 基于染色思想，一开始所有节点颜色不同

  - 连接两个节点操作，看成将一种颜色染成另一种颜色

  - 如果两个节点颜色一样，证明是联通的，否则是不联通的

```javascript
class UnionSet {
  constructor(n = 100) {
    this.n = n;
    this.color = new Array(n);
    this.init();
  }
  // 初始化，两个节点颜色定义为自身的颜色
  init() {
    for (let i = 0; i < this.n; i++) {
      this.color[i] = i;
    }
  }
  // 查找这个节点属于什么颜色
  find(x) {
    return this.color[x];
  }
  // 查看两个节点是否属于同一个集合
  query(a, b) {
    return this.find(a) === this.find(b);
  }
  // a集合合并到集合b(a集合颜色图成b集合颜色)
  merge(a, b) {
    const colorA = this.color[a];
    for (let i = 0; i < this.n; i++) {
      if (this.color[i] === colorA) {
        this.color[i] = this.color[b];
      }
    }
  }
}
```

- 2. quick-union

  - 树状结构(用集合中的一个元素代表集合)

  - 用一个数组表示了整片森林，树的根节点唯一标识了一个集合

  - 只要找到了某个元素的树根，就能确定它在那个集合里

  - 根节点的标志是：父节点是其本身

```javascript
// 比较元素的根节点是否一致即可
class UnionSet {
  constructor(n = 100) {
    this.n = n;
    this.father = new Array(n);
    this.init();
  }
  // 初始化，父节点指向自己
  init() {
    for (let i = 0; i < this.n; i++) {
      this.father[i] = i;
    }
  }
  // 查找x的根节点是谁
  find(x) {
    // 如果x的根节点就是x,那他的根节点就是自己
    if (this.father[x] === x) return x;
    return this.find(this.father[x]);
  }
  // 查找是不是同一个集合，即同一个父亲
  query(a, b) {
    return this.find(a) === this.find(b);
  }
  // 合并树
  merge(a, b) {
    const fatherA = this.father[a];
    const fatherB = this.father[b];
    if (fatherA === fatherB) return;
    this.father[fatherA] = fatherB; // a的父节点变为b的父节点
  }
}
```

- 3. weighted-quick-union

  - 优化 quick-union 的 find 方法，节点少的合并到节点多的树上

```javascript
class UnionSet {
  constructor(n = 100) {
    this.n = n;
    this.father = new Array(n);
    this.size = new Array(n); // 存放当前集合的元素数量
    this.init();
  }
  init() {
    for (let i = 0; i < this.n; i++) {
      this.father[i] = i;
      this.size[i] = 1;
    }
  }

  find(x) {
    if (this.father[x] === x) return x;
    return this.find(this.father[x]);
  }

  query(a, b) {
    return this.find(a) === this.find(b);
  }
  // 加入了判断优化
  merge(a, b) {
    const fatherA = this.find(a);
    const fatherB = this.find(b);
    if (fatherA === fatherB) return;
    // 如果树a高度小于树b，那么a合并到b。b的高度大小加上a的大小
    if (this.size[a] < this.size[b]) {
      this.father[fatherA] = fatherB;
      this.size[fatherB] += this.father[fatherA];
    } else {
      this.father[fatherB] = fatherA;
      this.size[fatherA] += this.father[fatherB];
    }
  }
}
```

- 4. 带路径压缩的 weighted-quick-union

```javascript
class UnionSet {
  constructor(n = 100) {
    this.n = n;
    this.father = new Array(n);
    this.size = new Array(n); // 存放当前集合的元素数量
    this.init();
  }
  init() {
    for (let i = 0; i < this.n; i++) {
      this.father[i] = i;
      this.size[i] = 1;
    }
  }

  find(x) {
    if (this.father[x] === x) return x;
    const root = this.find(this.father[x]);
    // 将x直接挂到根节点上
    this.father[x] = root;
    return root;
  }

  query(a, b) {
    return this.find(a) === this.find(b);
  }
  // 加入了判断优化
  merge(a, b) {
    const fatherA = this.find(a);
    const fatherB = this.find(b);
    if (fatherA === fatherB) return;
    // 如果树a数量小于树b，那么a合并到b。b的大小加上a的大小
    if (this.size[a] < this.size[b]) {
      this.father[fatherA] = fatherB;
      this.size[fatherB] += this.father[fatherA];
    } else {
      this.father[fatherB] = fatherA;
      this.size[fatherA] += this.father[fatherB];
    }
  }
}
```

- 5. 只有路径查询的

```javascript
class UnionSet {
  constructor(n = 100) {
    this.n = n;
    this.father = new Array(n);
    this.init();
  }
  init() {
    for (let i = 0; i < this.n; i++) {
      this.father[i] = i;
    }
  }

  find(x) {
    return (this.father[x] =
      this.father[x] === x ? x : this.find(this.father[x]));
  }

  query(a, b) {
    return this.find(a) === this.find(b);
  }

  merge(a, b) {
    this.father[this.find(a)] = this.father[b];
  }
}

function test() {
  const unionSet = new UnionSet(100);
  unionSet.merge(3, 1);
  unionSet.merge(1, 4);
  console.log(`1属于集合 ${unionSet.find(1)}`);
  console.log(`4属于集合 ${unionSet.find(4)}`);
  console.log(`6属于集合 ${unionSet.find(6)}`);
  console.log(`3、4属于一个集合 ${unionSet.query(3, 4)}`);
  console.log(`3、6属于一个集合 ${unionSet.query(3, 6)}`);
}
test();
```
