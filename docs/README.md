# Zoo Framework 文档

> 一款响应式多线程开发框架，简化 Python 多线程编程

## 简介

Zoo Framework 是一款专为 Python 设计的响应式多线程开发框架，旨在解决 Python 项目开发中多线程带来的痛点：

- ❌ 反复创建 Thread 对象
- ❌ 同步方法阻塞与异步问题
- ❌ 线程间通信复杂
- ❌ 状态管理困难

## 核心特性

- 🚀 **Worker 线程管理** - 声明式线程生命周期管理
- 📬 **事件驱动架构** - 基于事件的生产者-消费者模式
- 🔄 **状态机支持** - 内置状态机引擎，支持复杂业务逻辑
- 📊 **FIFO 队列** - 优先级事件队列，支持延迟执行
- 🔒 **线程安全** - 内置锁机制和线程安全数据结构
- 🔌 **插件系统** - 可扩展的插件架构（开发中）
- ⚡ **AOP 支持** - 面向切面编程，支持日志、计时、验证等

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

### 最佳实践
- [性能优化](./best-practices/performance.md)
- [错误处理](./best-practices/error-handling.md)
- [测试指南](./best-practices/testing.md)

## 示例项目

- [简单定时任务](./examples/simple-timer.md)
- [事件驱动应用](./examples/event-driven.md)
- [状态机工作流](./examples/state-machine.md)
- [多 Worker 协作](./examples/multi-worker.md)

## 贡献指南

欢迎提交 Issue 和 PR！

## 许可证

Apache License 2.0
