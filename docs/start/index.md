---
outline: deep
---

# 快速开始

本页的每一段代码都在 **Python 3.13** 上实际执行验证过，输出为真实输出。

## 安装

```bash
pip install zoo-framework
```

需要 **Python 3.13 及以上**。验证：

```bash
python -c "import zoo_framework; print(zoo_framework.__version__)"
```

## 第一个任务：手写一个最小示例

先用**单文件**跑通，理解最小闭环。把下面存成 `main.py`：

```python
from zoo_framework.core import Master
from zoo_framework.workers import BaseWorker


class HelloWorker(BaseWorker):
    def __init__(self):
        super().__init__({
            "is_loop": True,      # 跨调度轮次持续运行
            "delay_time": 1.0,    # 每轮执行后等待的秒数
            "name": "HelloWorker",
        })
        self.counter = 0

    def _execute(self):
        self.counter += 1
        print(f"[HelloWorker] tick #{self.counter}", flush=True)


if __name__ == "__main__":
    master = Master()
    master.register_worker("HelloWorker", HelloWorker)   # 注册的是**类**
    master.run()
```

运行：

```bash
python -u main.py
```

**真实输出**（注意：默认会打印框架自身的调度日志，见下节如何关掉）：

```
[HelloWorker] tick #1
[HelloWorker] tick #2
[HelloWorker] tick #3
...
```

按 `Ctrl-C` 停止。

::: tip 两个容易踩的地方
1. **`register_worker` 传的是类，不是实例。** `WorkerRegistry` 用 `issubclass` 校验，
   传函数或实例会得到 `TypeError: issubclass() arg 1 must be a class`。
2. **管道/文件输出时加 `-u`。** 否则 Python 会块缓冲 `print`，看不到实时输出。
:::

## 把日志调安静

不配置的话，框架会在控制台打印**每个 Worker 每一轮的启停日志**，你的输出会被淹掉。

在工作目录放一个 `config.json`：

```json
{
  "log": { "path": "./logs", "level": "warning" }
}
```

实测对比（同样运行 5 秒）：

| 配置 | 总输出行数 | 其中属于你的输出 |
|---|---|---|
| 默认 | 23 | 3 |
| `log.level: warning` | **3** | **3** |

> 默认级别偏高是一个已知问题，在
> [issue #111](https://github.com/YearsAlso/zoo-framework/issues/111) 中跟踪。

## 用脚手架生成项目结构

单文件够验证，但真实项目需要目录结构：

```bash
zfc --create my_app
cd my_app
```

产出：

```
my_app/
├── config.json
└── src/
    ├── main.py            # 入口：注册 Worker 并启动
    ├── conf/              # 启动期配置钩子（在 Master() 构造时执行）
    ├── params/            # 配置项声明（对应 config.json 的 demo 段）
    ├── events/            # 事件反应器
    └── workers/           # 任务单元
```

再生成一个任务：

```bash
zfc --worker order_sync
```

::: warning 脚手架的两个已知限制
- **`--worker` 会把 import 与注册写进 `src/main.py` 的 `WORKERS` 列表**（不是写进
  `workers/__init__.py`）。
- `--worker order_sync` 目前生成的类名是 `Order_SyncWorker`（下划线被保留），
  而不是 `OrderSyncWorker`。功能正常，命名修复在
  [issue #112](https://github.com/YearsAlso/zoo-framework/issues/112) 中跟踪。
- **`--create` 生成的 `WORKERS` 列表初始为空**，不跑一次 `--worker` 就看不到任何业务输出
  （[issue #110](https://github.com/YearsAlso/zoo-framework/issues/110)）。
:::

运行：

```bash
python -u src/main.py
```

## 接下来

| 我想… | 去哪里 |
|---|---|
| 让状态在重启后恢复 | [状态机](/core/statemachine) |
| 让两个任务互相通信 | [事件系统](/core/event) |
| 跨任务共享实例 | [作用域容器](/core/cage) |
| 查签名与参数 | [API 参考](/api/core) |

## 常见问题

### `TypeError: issubclass() arg 1 must be a class`

```python
master.register_worker("MyWorker", MyWorker())          # ✗ 传了实例
master.register_worker("MyWorker", lambda: MyWorker())  # ✗ 传了工厂函数
master.register_worker("MyWorker", MyWorker)            # ✓ 传类
```

### 看不到任何输出

依次排查：加 `python -u`；确认 `log.level` 没被设成 `error` 以上；
确认**注册了 Worker 再调用 `master.run()`**——`Master()` 单独构造只会跑两个内建系统 Worker。

### `AttributeError: property 'is_loop' of ... has no setter`

`is_loop` 是只读属性，唯一真源是构造时传入的 `props`。不要写 `self.is_loop = True`，
要在 `super().__init__({...})` 的字典里声明。

### `ModuleNotFoundError: No module named 'zoo_framework'`

装到了别的解释器。用 `python -m pip install zoo-framework` 确保与运行时同一个解释器。

## 本页内容的可靠性

本页不再包含手工编写的"预期输出"。所有代码块与输出均在 Python 3.13 上实际运行得到；
文中出现的每一处 API 都以 `zoo_framework` 的实际导出面为准。

> **背景**：在本页改写之前，它包含数个**并不存在**的 API
> （`EventChannelManager`、`StateMachineManager.create_state_machine` / `add_state` / `transfer`），
> 以及一段**没有 `register_worker`** 的入口代码——照做的话程序什么都不会运行。
> 这类错误在文字上是看不出来的，只能靠"跑一遍"发现。
