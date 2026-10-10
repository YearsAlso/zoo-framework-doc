# AOP 切面

Zoo Framework 的 AOP 层由几个**装饰器**组成，直接用在类或函数上。

```python
from zoo_framework.core.aop import logger, stopwatch, params, event, configure, config_funcs
```

> **本节此前的内容是编造的。** 原文写的是 `@logger.log_execution_time`、
> `@stopwatch.measure`、`@validation.validate_params`、`@cage.catch_exceptions` 这类形式——
> 而 `validation` 与 `cage` 两个模块**已被删除**，`logger` / `stopwatch` 也不是带
> `.method` 属性的对象，而是**装饰器本身**。本页已按实际的导出面重写。

## `@logger` —— 记录方法调用

用在**类**上：

```python
from zoo_framework.core.aop import logger
from zoo_framework.workers import BaseWorker


@logger
class OrderSyncWorker(BaseWorker):
    def __init__(self):
        super().__init__({"is_loop": True, "delay_time": 5, "name": "OrderSync"})

    def _execute(self):
        sync_orders()
```

## `@stopwatch` —— 计算方法执行时间

用在**函数**上：

```python
from zoo_framework.core.aop import stopwatch


@stopwatch
def heavy_task():
    ...
```

## `@params` —— 声明配置参数类

用在**类**上。类属性通过 `param(...)` 声明，导入时被替换为配置项描述符：

```python
from zoo_framework.core.aop import params
from zoo_framework.core import param


@params
class MyParams:
    WORKER_POOL_SIZE = param(value="worker:pool:size", default=5)
```

框架内建的 `WorkerParams` / `EventParams` / `StateMachineParams` / `LogParams` 都是这样定义的。

## `@event` —— 注册事件反应器

```python
from zoo_framework.core.aop import event


@event(topic="order.created", channel="business")
def on_order_created(req):
    print(req.topic, req.content)
```

参数：`topic`（必填）、`channel`（默认 `"default"`）、`timeout`、`retry_time`（默认 1）、
`retry_strategy`、以及 `done_callback` / `error_callback` / `success_callback`。

## `configure` 与 `config_funcs`

`configure(topic)` 用于注册启动期配置钩子；`config_funcs` 是承载这些钩子的注册表
（一个线程安全字典，可 `get` / `get_keys` / `has_key` / `items`）。

脚手架生成的 `src/conf/demo_conf.py` 用的就是这一对——它在 `Master()` 构造**之前**
被导入，因此钩子会在配置载入时执行。

## 已删除、不要再用

| 旧用法 | 现状 |
|---|---|
| `from zoo_framework.core.aop import cage` | **已删除**（它用工厂函数替换类，破坏 `issubclass`/`isinstance`，曾造成一次 P0）。替代：`ScopedContainer` |
| `from zoo_framework.core.aop import validation` | **已删除**（零使用、零规格） |
| `BaseAspect` | 不存在。AOP 层的公共面就是上面那几个装饰器 |
