# 新建项目

## 使用 zfc 命令行工具

Zoo Framework 提供了 `zfc` 命令行工具来快速创建项目结构。

## 创建项目

```bash
zfc --create <project_name>
```

示例：

```bash
zfc --create ecommerce_system
```

## 项目结构

创建后的项目结构如下：

```
ecommerce_system/
├── config.json              # 主配置文件
├── src/                     # 源代码目录
│   ├── main.py             # 应用入口
│   ├── workers/            # Worker 目录
│   │   └── __init__.py
│   ├── events/             # 事件定义目录
│   │   └── __init__.py
│   ├── conf/               # 配置类目录
│   │   └── __init__.py
│   └── params/             # 参数类目录
│       └── __init__.py
└── logs/                   # 日志目录
```

### config.json

```json
{
  "_exports": [],
  "log": {
    "path": "./logs",
    "level": "debug"
  },
  "worker": {
    "runPolicy": "simple",
    "pool": {
      "size": 5,
      "enabled": false
    }
  }
}
```

配置项说明：

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `log.path` | string | 日志文件存储路径 |
| `log.level` | string | 日志级别 (debug/info/warning/error) |
| `worker.runPolicy` | string | Worker 运行策略 (simple/stable/safe) |
| `worker.pool.enabled` | boolean | 是否启用线程池 |
| `worker.pool.size` | integer | 线程池大小 |

## 创建 Worker

```bash
zfc --worker <worker_name>
```

示例：

```bash
zfc --worker order_processor
```

这会在 `src/workers/` 目录下创建 `order_processor_worker.py`：

```python
from zoo_framework.workers.base_worker import BaseWorker


class OrderProcessorWorker(BaseWorker):
    def __init__(self):
        BaseWorker.__init__(self, {
            "is_loop": True,
            "delay_time": 5,
            "name": "OrderProcessorWorker"
        })

    def _destroy(self, result):
        pass

    def _execute(self):
        # 编写业务逻辑
        pass
```

同时在 `src/workers/__init__.py` 中自动注册：

```python
from .order_processor_worker import OrderProcessorWorker
```

## 完整示例

### 1. 创建项目

```bash
zfc --create order_system
cd order_system
```

### 2. 创建多个 Worker

```bash
zfc --worker order_receiver
zfc --worker order_processor
zfc --worker order_notifier
```

### 3. 编写业务代码

`src/workers/order_receiver_worker.py`:

```python
from zoo_framework.workers import BaseWorker
from zoo_framework.utils import LogUtils
from zoo_framework.event import EventChannelManager
from zoo_framework.fifo.node import EventNode


class OrderReceiverWorker(BaseWorker):
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 3,
            "name": "OrderReceiverWorker"
        })
    
    def _execute(self):
        # 模拟接收订单
        order = {"order_id": "12345", "amount": 199.99}
        LogUtils.info(f"Received order: {order}")
        
        # 发送事件
        node = EventNode(
            topic="order.received",
            content=order
        )
        EventChannelManager.get_channel("order").push(node)
```

`src/workers/order_processor_worker.py`:

```python
from zoo_framework.workers import BaseWorker
from zoo_framework.utils import LogUtils
from zoo_framework.event import EventChannelManager


class OrderProcessorWorker(BaseWorker):
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 1,
            "name": "OrderProcessorWorker"
        })
    
    def _execute(self):
        # 处理订单
        channel = EventChannelManager.get_channel("order")
        node = channel.pop()
        
        if node and node.topic == "order.received":
            LogUtils.info(f"Processing order: {node.content}")
            # 处理逻辑...
```

### 4. 配置 config.json

```json
{
  "_exports": [],
  "log": {
    "path": "./logs",
    "level": "info"
  },
  "worker": {
    "runPolicy": "simple",
    "pool": {
      "size": 10,
      "enabled": true
    }
  }
}
```

### 5. 启动应用

`src/main.py`:

```python
from zoo_framework.core import Master

if __name__ == "__main__":
    master = Master()
    master.run()
```

运行：

```bash
cd src
python main.py
```

## 常见问题

### Q: Worker 没有被执行？

A: 确保 Worker 已在 `workers/__init__.py` 中导入：

```python
from .order_receiver_worker import OrderReceiverWorker
from .order_processor_worker import OrderProcessorWorker
```

### Q: 如何调试？

A: 设置日志级别为 debug：

```json
{
  "log": {
    "level": "debug"
  }
}
```

### Q: 如何停止 Worker？

A: 设置 `is_loop = False`：

```python
def __init__(self):
    super().__init__({
        "is_loop": False,  # 只执行一次
        "name": "OneTimeWorker"
    })
```
