# 事件系统

Zoo Framework 提供了完整的事件驱动机制，支持基于事件的生产者-消费者模式。

## 核心概念

- **EventNode** - 事件节点，代表一个具体的事件
- **EventChannel** - 事件通道，事件的传输管道
- **EventFIFO** - 事件队列，支持优先级的事件存储
- **EventReactor** - 事件响应器，处理事件的具体逻辑

## EventNode 事件节点

事件是系统中的基本通信单元。

### 创建事件

```python
from zoo_framework.fifo.node import EventNode

# 创建简单事件
node = EventNode(
    topic="user.login",
    content={"user_id": 123, "username": "张三"}
)

# 创建带优先级的事件
node = EventNode(
    topic="order.urgent",
    content={"order_id": "12345"},
    priority=100  # 高优先级
)

# 创建带超时的事件
node = EventNode(
    topic="payment.process",
    content={"amount": 99.99},
    timeout=30,  # 30秒超时
    timeout_response=on_payment_timeout
)
```

### EventNode 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `topic` | str | 事件主题（标识符）|
| `content` | any | 事件内容（数据）|
| `priority` | int | 优先级（数值越大优先级越高）|
| `channel_name` | str | 所属通道名称 |
| `timeout` | int | 超时时间（秒）|
| `retry_times` | int | 重试次数 |
| `create_time` | int | 创建时间戳 |
| `is_response` | bool | 是否已响应 |

### 事件响应机制

```python
# 设置失败回调
node.set_fail_response(lambda node: print(f"处理失败: {node.topic}"))

# 设置超时回调
node.set_timeout(30, lambda node: print(f"处理超时: {node.topic}"))

# 设置响应机制
# 1: 先抢到先响应
# 2: 优先级高的先响应
# 3: 全部响应（默认）
# 4: 指定响应者
node.set_response_mechanism(4, reactor_name="PaymentReactor")
```

## EventChannel 事件通道

事件通道是事件的分发管道。

### 获取通道

```python
from zoo_framework.event import EventChannelManager

# 获取默认通道
channel = EventChannelManager.get_channel("default")

# 获取指定通道
order_channel = EventChannelManager.get_channel("order")
payment_channel = EventChannelManager.get_channel("payment")
```

### 通道操作

```python
# 发送事件
node = EventNode("user.login", {"user_id": 123})
channel.push(node)

# 接收事件
node = channel.pop()
if node:
    print(f"收到事件: {node.topic}")

# 查看队列大小
size = channel.size()

# 清空通道
channel.clear()
```

## EventFIFO 事件队列

先进先出的事件队列，支持优先级排序。

### 创建队列

```python
from zoo_framework.fifo import EventFIFO

# 创建队列
fifo = EventFIFO()

# 创建带延迟功能的队列
from zoo_framework.fifo import DelayFIFO
delay_fifo = DelayFIFO()
```

### 队列操作

```python
# 添加事件
node1 = EventNode("task.low", "data", priority=1)
node2 = EventNode("task.high", "data", priority=10)

fifo.push(node1)
fifo.push(node2)

# 获取事件（按优先级）
node = fifo.pop()  # 返回 node2（优先级高）

# 查看队列长度
count = len(fifo)

# 判断队列是否为空
is_empty = fifo.is_empty()

# 获取所有事件
all_nodes = fifo.get_all()
```

## 完整示例

### 生产者-消费者模式

```python
from zoo_framework.workers import BaseWorker
from zoo_framework.event import EventChannelManager
from zoo_framework.fifo.node import EventNode
from zoo_framework.utils import LogUtils


class ProducerWorker(BaseWorker):
    """生产者 - 生成事件"""
    
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 2,
            "name": "ProducerWorker"
        })
        self.counter = 0
    
    def _execute(self):
        self.counter += 1
        
        # 创建订单事件
        node = EventNode(
            topic="order.created",
            content={
                "order_id": f"ORDER_{self.counter}",
                "amount": 100.0 + self.counter,
                "timestamp": time.time()
            },
            priority=5
        )
        
        # 发送到通道
        channel = EventChannelManager.get_channel("order")
        channel.push(node)
        
        LogUtils.info(f"Produced order: {node.content['order_id']}")


class ConsumerWorker(BaseWorker):
    """消费者 - 处理事件"""
    
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 1,
            "name": "ConsumerWorker"
        })
    
    def _execute(self):
        channel = EventChannelManager.get_channel("order")
        node = channel.pop()
        
        if node:
            if node.topic == "order.created":
                self.process_order(node.content)
        else:
            # 队列为空，短暂休眠
            time.sleep(0.1)
    
    def process_order(self, order_data):
        LogUtils.info(f"Processing order: {order_data['order_id']}")
        # 处理订单...


class PriorityConsumerWorker(BaseWorker):
    """优先级消费者 - 处理高优先级事件"""
    
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 0.5,
            "name": "PriorityConsumerWorker"
        })
    
    def _execute(self):
        # 优先处理高优先级事件
        channel = EventChannelManager.get_channel("order")
        
        # 获取所有事件，按优先级处理
        nodes = channel.get_all_sorted_by_priority()
        
        for node in nodes:
            if node.priority >= 10:  # 高优先级
                self.handle_urgent(node)
                channel.remove(node)
                break
    
    def handle_urgent(self, node):
        LogUtils.warning(f"Handling URGENT event: {node.topic}")
```

### 事件驱动状态机

```python
from zoo_framework.statemachine import StateMachineManager


class StateMachineEventWorker(BaseWorker):
    """使用事件驱动状态机"""
    
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 1,
            "name": "StateMachineEventWorker"
        })
        self.setup_state_machine()
    
    def setup_state_machine(self):
        sm = StateMachineManager()
        sm.create_state_machine("order")
        
        # 添加状态
        sm.add_state("order", "created")
        sm.add_state("order", "paid")
        sm.add_state("order", "shipped")
        sm.add_state("order", "completed")
        
        # 添加状态转换效果
        sm.add_effect("order", "created", "paid", self.on_paid)
        sm.add_effect("order", "paid", "shipped", self.on_shipped)
    
    def _execute(self):
        channel = EventChannelManager.get_channel("order")
        node = channel.pop()
        
        if node:
            self.handle_event(node)
    
    def handle_event(self, node):
        sm = StateMachineManager()
        
        if node.topic == "order.paid":
            sm.transfer("order", "created", "paid")
        elif node.topic == "order.shipped":
            sm.transfer("order", "paid", "shipped")
    
    def on_paid(self, data):
        LogUtils.info(f"Order paid: {data}")
    
    def on_shipped(self, data):
        LogUtils.info(f"Order shipped: {data}")
```

### 延迟事件处理

```python
from zoo_framework.fifo import DelayFIFO
from zoo_framework.fifo.node import DelayFIFONode
import time


class DelayedEventWorker(BaseWorker):
    """延迟事件处理"""
    
    def __init__(self):
        super().__init__({
            "is_loop": True,
            "delay_time": 1,
            "name": "DelayedEventWorker"
        })
        self.delay_fifo = DelayFIFO()
    
    def schedule_task(self, task, delay_seconds):
        """安排延迟任务"""
        node = DelayFIFONode(
            topic="delayed.task",
            content=task,
            delay=delay_seconds  # 延迟秒数
        )
        self.delay_fifo.push(node)
    
    def _execute(self):
        # 获取已到期的任务
        ready_nodes = self.delay_fifo.get_ready_nodes()
        
        for node in ready_nodes:
            self.execute_task(node.content)
            self.delay_fifo.remove(node)
    
    def execute_task(self, task):
        LogUtils.info(f"Executing delayed task: {task}")
```

## 最佳实践

### 1. 合理设置事件优先级

```python
# 系统级事件 - 最高优先级
SYSTEM_PRIORITY = 100

# 业务关键事件
BUSINESS_PRIORITY = 50

# 普通业务事件
NORMAL_PRIORITY = 10

# 日志/监控事件 - 最低优先级
LOG_PRIORITY = 1
```

### 2. 事件主题命名规范

```python
# 使用点分命名空间
"user.login"           # 用户登录
"user.logout"          # 用户登出
"order.created"        # 订单创建
"order.paid"           # 订单支付
"order.cancelled"      # 订单取消
"inventory.updated"    # 库存更新
```

### 3. 异常处理

```python
def _execute(self):
    try:
        node = self.channel.pop()
        if node:
            self.handle(node)
    except Exception as e:
        LogUtils.error(f"Event handling error: {e}")
        # 可选：将失败事件发送到重试队列
        self.send_to_retry_queue(node)
```

### 4. 避免事件丢失

```python
def _execute(self):
    node = self.channel.pop()
    
    if node:
        try:
            result = self.process(node)
            node.is_response = True
        except Exception as e:
            node.retry_times += 1
            if node.retry_times < self.max_retries:
                # 重新放入队列
                self.channel.push(node)
            else:
                # 进入死信队列
                self.send_to_dlq(node)
```
