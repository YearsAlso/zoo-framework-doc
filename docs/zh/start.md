# Zoo Framework 中文文档

## 简介

Zoo Framework 是一款响应式多线程开发框架。

## 特性

- 🚀 Worker 线程管理
- 📬 事件驱动架构
- 🔄 状态机支持
- 📊 FIFO 队列

## 快速开始

```bash
pip install zoo-framework
```

```python
from zoo_framework.core import Master

master = Master()
master.run()
```

## 文档

- [快速开始](../start/)
- [核心概念](../core/worker.html)
- [API 参考](../api/core.html)
