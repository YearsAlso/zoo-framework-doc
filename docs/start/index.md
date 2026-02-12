# 快速开始

## 安装

### 使用 pip 安装

```bash
pip install zoo-framework
```

### 从源码安装

```bash
git clone https://github.com/YearsAlso/zoo-framework.git
cd zoo-framework
pip install -e .
```

## 创建第一个项目

### 1. 使用 CLI 创建项目

```bash
zfc --create my_first_project
cd my_first_project
```

这将创建以下结构：

```
my_first_project/
├── config.json          # 配置文件
├── src/
│   ├── main.py         # 应用入口
│   ├── workers/        # Worker 目录
│   ├── events/         # 事件目录
│   ├── conf/           # 配置目录
│   └── params/         # 参数目录
└── logs/               # 日志目录
```

### 2. 创建 Worker

```bash
zfc --worker hello
```

这会创建 `src/workers/hello_worker.py`：

```python
from zoo_framework.workers.base_worker import BaseWorker


class HelloWorker(BaseWorker):
    def __init__(self):
        BaseWorker.__init__(self, {
            "is_loop": True,
            "delay_time": 5,
            "name": "HelloWorker"
        })

    def _destroy(self, result):
        pass

    def _execute(self):
        # 在这里编写你的业务逻辑
        pass
```

### 3. 编写业务代码

修改 `src/workers/hello_worker.py`：

```python
from zoo_framework.workers.base_worker import BaseWorker
from zoo_framework.utils import LogUtils


class HelloWorker(BaseWorker):
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 2,  # 每 2 秒执行一次
            "name": "HelloWorker"
        })
        self.counter = 0

    def _destroy(self, result):
        LogUtils.info(f"Worker destroyed with result: {result}")

    def _execute(self):
        self.counter += 1
        LogUtils.info(f"Hello Zoo Framework! Count: {self.counter}")
```

### 4. 启动应用

修改 `src/main.py`：

```python
from zoo_framework.core import Master

if __name__ == "__main__":
    # 创建 Master 实例
    master = Master(loop_interval=1)
    
    # 运行应用
    master.run()
```

运行：

```bash
cd src
python main.py
```

输出：

```
[INFO] Hello Zoo Framework! Count: 1
[INFO] Hello Zoo Framework! Count: 2
[INFO] Hello Zoo Framework! Count: 3
...
```

## 核心概念

### Worker

Worker 是 Zoo Framework 的基本执行单元，类似于线程，但提供了更高级的生命周期管理。

```python
from zoo_framework.workers import BaseWorker

class MyWorker(BaseWorker):
    def __init__(self):
        super().__init__({
            "is_loop": True,      # 是否循环执行
            "delay_time": 1,      # 执行间隔（秒）
            "name": "MyWorker"    # Worker 名称
        })
    
    def _execute(self):
        # 执行业务逻辑
        pass
```

### 事件

Zoo Framework 提供了事件驱动机制：

```python
from zoo_framework.event import EventChannelManager
from zoo_framework.fifo import EventFIFO
from zoo_framework.fifo.node import EventNode

# 创建事件
node = EventNode(
    topic="user.login",
    content={"user_id": 123, "name": "张三"},
    priority=10
)

# 发送事件
EventChannelManager.get_channel("default").push(node)
```

### 状态机

状态机用于管理复杂的状态转换：

```python
from zoo_framework.statemachine import StateMachineManager

# 获取状态机管理器
sm_manager = StateMachineManager()

# 创建状态机
sm_manager.create_state_machine("order")

# 添加状态
sm_manager.add_state("order", "created")
sm_manager.add_state("order", "paid")
sm_manager.add_state("order", "shipped")

# 状态转换
sm_manager.transfer("order", "created", "paid")
```

## 下一步

- [了解项目结构](./guide/structure.md)
- [深入 Worker 机制](./core/worker.md)
- [学习事件系统](./core/event.md)
- [探索状态机](./core/statemachine.md)
