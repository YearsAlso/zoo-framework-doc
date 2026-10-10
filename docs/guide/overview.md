# 概览

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
