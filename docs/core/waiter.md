# Waiter 调度器

Waiter 是 Zoo Framework 的核心调度组件，负责管理和执行 Worker。

## 概念

Waiter 采用策略模式，根据不同的运行策略来调度 Worker：

- **SimpleWaiter** - 简单调度，顺序执行
- **StableWaiter** - 稳定调度，异常恢复
- **SafeWaiter** - 安全调度，线程隔离

## 使用方式

### 配置运行策略

在 `config.json` 中配置：

```json
{
  "worker": {
    "runPolicy": "simple",
    "pool": {
      "size": 5,
      "enabled": false
    }
  }
}
```

策略选项：
- `simple` - 简单调度（默认）
- `stable` - 稳定调度
- `safe` - 安全调度

## Waiter 类型

### SimpleWaiter

最简单的调度器，顺序执行所有 Worker。

```python
from zoo_framework.core.waiter import SimpleWaiter

waiter = SimpleWaiter()
waiter.call_workers(workers)
waiter.execute_service()
```

特点：
- 单线程顺序执行
- 简单高效
- 适合简单场景

### StableWaiter

稳定调度器，支持异常恢复。

```python
from zoo_framework.core.waiter import StableWaiter

waiter = StableWaiter()
waiter.call_workers(workers)
```

特点：
- 自动捕获异常
- Worker 崩溃后自动重启
- 保证系统稳定性

### SafeWaiter

安全调度器，线程隔离。

```python
from zoo_framework.core.waiter import SafeWaiter

waiter = SafeWaiter()
waiter.call_workers(workers)
```

特点：
- 每个 Worker 独立线程
- 线程间隔离
- 适合 CPU 密集型任务

## 自定义 Waiter

```python
from zoo_framework.core.waiter import BaseWaiter

class CustomWaiter(BaseWaiter):
    """自定义调度器"""
    
    def execute_service(self):
        """执行服务"""
        for name, worker in self.workers.items():
            if worker.is_loop:
                self.execute_loop_worker(worker)
            else:
                self.execute_once_worker(worker)
    
    def execute_loop_worker(self, worker):
        """执行循环 Worker"""
        while worker.is_running and worker.is_loop:
            try:
                worker.execute()
                if worker.delay_time > 0:
                    time.sleep(worker.delay_time)
            except Exception as e:
                self.handle_error(worker, e)
    
    def execute_once_worker(self, worker):
        """执行单次 Worker"""
        try:
            worker.execute()
        except Exception as e:
            self.handle_error(worker, e)
    
    def handle_error(self, worker, error):
        """处理错误"""
        print(f"Worker {worker.name} error: {error}")
```
