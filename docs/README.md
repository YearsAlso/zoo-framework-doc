# Zoo Framework 文档

> 进程内任务编排：调度、可观测、有状态 —— 不需要 broker，不需要 cron 守护进程

## 简介

Zoo Framework 让你在**自己的进程里**运行长期存活的后台任务。你用一个类声明任务单元
（Worker），框架负责调度、并发去重、超时熔断、优雅停机与状态持久化。

它**不是**一个任务队列，也**不是**一个 Web 框架。没有 HTTP 层、没有 broker、没有分布式调度。

它解决的问题是：把后台任务用裸 `threading` 拼出来，看起来二十行，实际会变成几百行——
谁拥有线程、怎么防止同一个任务重叠执行、卡住的任务怎么被发现、停机时在飞的任务怎么办、
状态放哪里。**每一处都容易错，而错的典型方式是静默。**

## 核心能力

| 能力 | 说明 |
|---|---|
| **调度** | 两种执行模型（`thread` / `thread_pool`）、三档背压策略、在飞去重、超时熔断 |
| **状态** | 键路径状态机 + 变更观察者 + 原子替换落盘 + 滚动备份 |
| **事件** | 通道隔离、优先级排序、重试策略、死信记录 |
| **容器** | 三级作用域（process / session / prototype），且**不替换类** |
| **原生执行** | Rust 扩展承载粗粒度 CPU 任务（**尚未发布到 PyPI**） |

## 明确不做什么

| | 状态 |
|---|---|
| 跨机器 | ❌ 需要跨机器请用 Celery |
| 多进程 | ❌ **未实现**，模式常量是占位 |
| cron 表达式 | ❌ 不支持，只有固定 `delay_time` 轮询 |
| 健康监控指标链路 | ⚠️ 尚未接通，`get_health_report()` 恒返回 `execute_count: 0` |
| 超时处理 | ⚠️ **观察并停止派发，不强制终止**正在执行的 Worker |

## 快速安装

```bash
pip install zoo-framework
```

## 快速开始

### 1. 创建项目

```bash
zfc --create my_project
cd my_project
```

### 2. 创建 Worker

```bash
zfc --worker demo
```

### 3. 编写业务逻辑

```python
# src/workers/demo_worker.py
from zoo_framework.workers import BaseWorker

class DemoWorker(BaseWorker):
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 1,
            "name": "DemoWorker"
        })
    
    def _execute(self):
        print("执行业务逻辑")
```

### 4. 启动应用

```python
# src/main.py
from zoo_framework.core import Master

if __name__ == "__main__":
    master = Master()
    master.run()
```

## 文档导航

### 入门指南
- [快速开始](./start/)
- [项目结构](./guide/structure.md)
- [配置说明](./guide/configuration.md)

### 核心概念
- [Worker 工作器](./core/worker.md)
- [事件系统](./core/event.md)
- [状态机](./core/statemachine.md)
- [FIFO 队列](./core/fifo.md)
- [Waiter 调度器](./core/waiter.md)

### 高级特性
- [AOP 切面编程](./advanced/aop.md)
- [Reactor 响应器](./advanced/reactor.md)
- [Lock 锁机制](./advanced/lock.md)
- [插件开发](./advanced/plugin.md)

### API 参考
- [核心 API](./api/core.md)
- [工具类](./api/utils.md)
- [常量定义](./api/constant.md)

## 贡献指南

欢迎提交 Issue 和 PR！

## 许可证

Apache License 2.0
