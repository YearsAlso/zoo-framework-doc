---
layout: home

hero:
  name: "Zoo Framework"
  text: "Python 多线程框架"
  tagline: 用动物园的比喻组织并发原语——Worker 是动物，Cage 是它们共享的作用域，Master 负责开园与闭园
  image:
    src: /logo.png
    alt: Zoo Framework
  actions:
    - theme: brand
      text: 快速开始
      link: /start/
    - theme: alt
      text: 核心概念
      link: /core/worker

features:
  - title: Worker — 任务执行单元
    details: 每个任务是一只「动物」：循环执行、周期执行、事件驱动或状态机驱动，各按各的节拍工作
  - title: ScopedContainer — 作用域容器
    details: 进程 / 会话 / 原型三级作用域持有共享实例，声明式、可重置、可替换，且不再替换类本身
  - title: Master — 生命周期管理
    details: 读取配置、注册 Worker、驱动调度主循环，并在 Ctrl-C 时按序优雅停机
  - title: Event — 事件管道
    details: 事件经通道注册、FIFO 队列与反应器分发，携带优先级与响应机制，避免低优先级事件饿死
  - title: StateMachine — 状态持久化
    details: StateScope 挂在可插拔的 StateIndex 上，周期落盘为带校验和与滚动备份的 pickle 存档
  - title: Plugin — 插件系统
    details: Plugin ABC 与依赖排序加载，配套固定 / 指数 / 自适应延迟策略
---

## 定位

Zoo Framework 是一个 Python 3.13+ 的多线程框架：你定义 Worker 类，框架负责注册、调度、参数解析、事件分发与停机。调度模型（线程池 / 每任务一线程）通过配置切换，Worker 代码不用改。

## 概念对照

| 动物园 | 框架 | 职责 |
|---|---|---|
| 动物 | `BaseWorker` | 任务执行单元 |
| 笼子 | `ScopedContainer` | 作用域内的共享实例 |
| 园长 | `Master` | 生命周期与调度 |
| 食物 | `EventNode` | Worker 间消息 |
| 饲养员队列 | FIFO / EventChannel | 有序事件队列 |

## 快速上手

```bash
pip install zoo-framework
```

```python
from zoo_framework.core import Master
from zoo_framework.workers import BaseWorker

class Inspector(BaseWorker):
    def __init__(self):
        super().__init__({"name": "inspector", "is_loop": True, "delay_time": 2})

    def _execute(self):
        print("patrol")

master = Master()
master.register_worker("Inspector", Inspector)
master.run()
```

## 性能基线

来自 `bench/`（Rust 可行性 PoC 与纯 Python 优化测量，数据与决策口径见 bench/DECISION.md）：

- 框架调度开销占端到端延迟的比例，随执行体变长快速下降（cpu-1x 70.8% → cpu-100x 4.3%，Windows 实测）。
- 四条纯 Python 优化路径实测提速 12×–800×（事件管道去 gevent、`ThreadSafeDict` 锁、FIFO→deque、默认启资源池）。
- Rust 调度器列为不采用（no-go）：受 GIL 限制，实测最高仅 1.67×，优化收益远低于纯 Python 项。

![bench 报告](/bench/report-overview.png)

完整报告截图见 [bench 全页报告](/bench/report-full.png)。

## 资源

- [GitHub 仓库](https://github.com/YearsAlso/zoo-framework)
- [问题反馈](https://github.com/YearsAlso/zoo-framework/issues)
- [文档仓库](https://github.com/YearsAlso/zoo-framework-doc)
