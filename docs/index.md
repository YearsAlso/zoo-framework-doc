---
layout: home

hero:
  name: "Zoo Framework"
  text: "进程内任务编排框架"
  tagline: 在你自己的进程里跑长期存活的后台任务——调度、可观测、有状态，不需要 broker，不需要 cron 守护进程
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
    details: 循环执行、单次执行、事件驱动或状态机驱动，各按各的节拍；在飞的任务不会被并发派发两次
  - title: ScopedContainer — 作用域容器
    details: 进程 / 会话 / 原型三级作用域持有共享实例，声明式、可重置、可替换，且不再替换类本身
  - title: Master — 生命周期管理
    details: 读取配置、注册 Worker、驱动调度主循环，并在 Ctrl-C 时按序优雅停机；停机时会触发最后一次状态落盘
  - title: Event — 事件管道
    details: 通道隔离、优先级排序、重试策略与死信记录；重试耗尽的事件不会被静默丢弃
  - title: StateMachine — 状态持久化
    details: 按「作用域 + 键路径」读写，支持变更观察者；周期落盘、原子替换、保留最近 5 份备份
  - title: 明确不做什么
    details: 跨机器 → Celery；多进程未实现；cron 表达式不支持；健康监控指标链路尚未接通
---

## 定位

Zoo Framework 让你在**自己的进程里**运行长期存活的后台任务：你定义一个 Worker 类，
框架负责注册、调度、在飞去重、超时熔断、事件分发与优雅停机。调度模型
（`thread` / `thread_pool`）通过配置切换，Worker 代码不用改。

**不需要 broker，不需要 Redis，不需要 cron 守护进程。**

## 核心组件

| 组件 | 职责 |
|---|---|
| `BaseWorker` | 任务执行单元；你只实现 `_execute()` |
| `Master` | 生命周期入口：加载配置、注册 Worker、启动调度、优雅停机 |
| `core/waiter/` | 调度器；`worker:mode` 选择执行模型 |
| `ScopedContainer` | 作用域容器（process / session / prototype），且**不替换类** |
| `EventNode` / `EventChannel` | 进程内事件管道 |
| `EventFIFO` | 每个通道一条独立队列 |
| `StateMachineManager` | 按「作用域 + 键路径」读写状态并持久化 |

> **关于命名**：框架名与部分历史标识使用动物园隐喻（`Worker` / `Master` / `Cage` / `Event`）。
> **隐喻只影响命名，不影响语义** —— 上表以功能名为准。

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
