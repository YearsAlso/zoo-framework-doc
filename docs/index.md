---
layout: home

hero:
  name: "🦁 Zoo Framework"
  text: "响应式多线程开发框架"
  tagline: 🚀 简化 Python 多线程编程，提升开发效率
  image:
    src: https://mxstorage.oss-cn-beijing.aliyuncs.com/oss-accesslog/zf-main-logo.png
    alt: Zoo Framework
  actions:
    - theme: brand
      text: 🚀 快速开始
      link: /start/
    - theme: alt
      text: 📖 查看文档
      link: /core/worker.html

features:
  - icon: ⚡
    title: Worker 线程管理
    details: 声明式线程生命周期管理，自动调度执行，支持循环/单次/事件驱动多种模式
  - icon: 📬
    title: 事件驱动架构
    details: 基于事件的生产者-消费者模式，支持优先级队列和延迟执行
  - icon: 🔄
    title: 状态机支持
    details: 内置状态机引擎，支持复杂业务逻辑的状态转换和持久化
  - icon: 📊
    title: FIFO 队列
    details: 优先级事件队列，支持延迟执行，线程安全
  - icon: 🔒
    title: 线程安全
    details: 内置锁机制和线程安全数据结构，保障并发安全
  - icon: 🔌
    title: 插件系统
    details: 可扩展的插件架构，支持第三方扩展（开发中）
---

## 🎯 简介

**Zoo Framework** 是一款专为 Python 设计的响应式多线程开发框架，旨在解决 Python 项目开发中多线程带来的痛点：

- ❌ 反复创建 Thread 对象 → ✅ 声明式 Worker 管理
- ❌ 同步方法阻塞与异步问题 → ✅ 智能调度器
- ❌ 线程间通信复杂 → ✅ 事件驱动架构
- ❌ 状态管理困难 → ✅ 内置状态机引擎

## 📦 安装

::: code-group

```bash [pip]
pip install zoo-framework
```

```bash [uv]
uv pip install zoo-framework
```

```bash [conda]
conda install -c conda-forge zoo-framework
```

:::

## 🚀 快速开始

### 1️⃣ 创建项目

```bash
zfc --create my_project
cd my_project
```

### 2️⃣ 创建 Worker

```bash
zfc --worker hello
```

### 3️⃣ 编写业务代码

```python
# src/workers/hello_worker.py
from zoo_framework.workers import BaseWorker
from zoo_framework.utils import LogUtils

class HelloWorker(BaseWorker):
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 2,  # ⏱️ 每 2 秒执行一次
            "name": "HelloWorker"
        })
        self.counter = 0

    def _execute(self):
        self.counter += 1
        LogUtils.info(f"✨ Hello Zoo Framework! Count: {self.counter}")
```

### 4️⃣ 启动应用

```python
# src/main.py
from zoo_framework.core import Master

if __name__ == "__main__":
    master = Master(loop_interval=1)
    master.run()
```

## 🏗️ 架构概览

```mermaid
graph TB
    subgraph 🎯 Master
        M[Master 调度器]
    end
    
    subgraph 🔄 Waiter 策略
        S[SimpleWaiter]
        ST[StableWaiter]
        SA[SafeWaiter]
    end
    
    subgraph 👷 Workers
        W1[Worker 1]
        W2[Worker 2]
        W3[Worker 3]
    end
    
    subgraph 📬 Event System
        E[EventNode]
        C[EventChannel]
        F[EventFIFO]
    end
    
    M --> S
    M --> ST
    M --> SA
    S --> W1
    S --> W2
    S --> W3
    W1 --> E
    W2 --> C
    W3 --> F
```

## 📚 文档导航

### 🔰 入门指南
- [快速开始](/start/) - 5 分钟上手
- [新建项目](/start/new.html) - 项目创建指南
- [项目结构](/guide/structure.html) - 目录结构说明
- [配置说明](/guide/configuration.html) - 配置文件详解

### 🧩 核心概念
- [👷 Worker 工作器](/core/worker.html) - 线程管理核心
- [📬 事件系统](/core/event.html) - 事件驱动编程
- [🔄 状态机](/core/statemachine.html) - 状态管理
- [📊 FIFO 队列](/core/fifo.html) - 优先级队列
- [🎛️ Waiter 调度器](/core/waiter.html) - 执行策略

### 🔧 高级特性
- [✂️ AOP 切面编程](/advanced/aop.html)
- [⚡ Reactor 响应器](/advanced/reactor.html)
- [🔒 Lock 锁机制](/advanced/lock.html)
- [🔌 Plugin 插件系统](/advanced/plugin.html)

### 📖 API 参考
- [🔧 核心 API](/api/core.html)
- [🛠️ 工具类](/api/utils.html)
- [📋 常量定义](/api/constant.html)

## 💡 核心特性对比

| 特性 | Zoo Framework | 原生 threading | asyncio |
|------|---------------|----------------|---------|
| Worker 管理 | ✅ 声明式 | ❌ 手动 | ❌ 手动 |
| 事件驱动 | ✅ 内置 | ❌ 需自行实现 | ✅ 支持 |
| 状态机 | ✅ 内置 | ❌ 无 | ❌ 无 |
| 优先级队列 | ✅ 内置 | ❌ 无 | ❌ 无 |
| 线程安全 | ✅ 内置 | ⚠️ 需自行处理 | ✅ 单线程 |
| 学习曲线 | 🟢 平缓 | 🟡 中等 | 🟡 中等 |

## 🌟 为什么选择 Zoo Framework？

### 1. 🚀 提升开发效率

传统多线程开发：
```python
import threading
import time

def worker():
    while True:
        print("Working...")
        time.sleep(1)

t = threading.Thread(target=worker)
t.start()
t.join()
```

Zoo Framework：
```python
from zoo_framework.workers import BaseWorker

class MyWorker(BaseWorker):
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 1,
            "name": "MyWorker"
        })
    
    def _execute(self):
        print("Working...")
```

### 2. 🔧 丰富的功能生态

- 📦 **内置组件** - Worker、Event、StateMachine、FIFO 开箱即用
- 🔌 **可扩展** - 支持插件机制，易于定制
- 📊 **可观测** - 内置日志和监控支持
- 🧪 **易测试** - 模块化设计，便于单元测试

### 3. 🛡️ 生产就绪

- ✅ 线程安全设计
- ✅ 异常自动恢复
- ✅ 状态持久化
- ✅ 完善的文档

## 🤝 贡献指南

欢迎提交 Issue 和 PR！

## 📄 许可证

[Apache License 2.0](https://github.com/YearsAlso/zoo-framework/blob/main/LICENSE)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/YearsAlso">YearsAlso</a>
</p>
