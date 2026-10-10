---
outline: deep
---

# 笼子：ScopedContainer 作用域容器

在 Zoo Framework 中，**笼子（Cage）** 指作用域容器 `ScopedContainer`：实例不再散落各处，而是按作用域关进笼子，由容器统一创建、取用与释放。

> 历史说明：早期版本提供 `@cage` 装饰器，它用工厂函数**替换类本身**且按裸类名做键，导致 `isinstance`/`issubclass` 失效、同名类互相覆盖（详见 scoped-container 变更记录）。该装饰器已删除，替代品是 `@process_scoped` 与显式的 `ScopedContainer`。

## 作用域模型

容器支持三种作用域，实例的归属由声明决定：

| 作用域 | `ScopeKind` | 实例粒度 | 典型用途 |
|---|---|---|---|
| 进程级 | `process` | 整个进程一个 | 框架内部管理器（事件通道、状态机等） |
| 会话级 | `session` | 每个会话标识一个 | 按会话隔离的资源 |
| 原型级 | `prototype` | 每次解析新建 | 无状态、可随意创建的对象 |

作用域句柄 `Scope` 是不可变标识，可安全跨线程传递；实例缓存归容器所有，句柄本身不携带。

## 线程安全归属：注册时必填

每个注册项 MUST 显式声明线程安全归属（`ThreadSafety`），容器没有隐式默认——隐式默认一个安全假设正是 `@cage` 类缺陷的温床：

| 取值 | 含义 | 取用方式 |
|---|---|---|
| `CONTAINER_SERIALIZED` | 由容器保证串行访问 | 须经 `exclusive(name)` 独占取用 |
| `INSTANCE_GUARANTEED` | 由实例自身保证线程安全 | 直接 `resolve` |
| `SINGLE_THREAD` | 仅限绑定的单线程使用 | 其他线程取用会被拒绝 |

## 框架内部的进程级共享：`@process_scoped`

框架内部需要进程级共享的管理器（`EventReactorManager`、`EventChannelRegister`、`StateMachineManager` 等 8 处）统一使用 `@process_scoped` 装饰器注册。它的语义：**类保持真类**，`cls()` 返回进程级唯一实例：

```python
from zoo_framework.core.container import ThreadSafety, process_scoped

@process_scoped(thread_safety=ThreadSafety.INSTANCE_GUARANTEED)
class MyManager:
    def __init__(self):
        self.state = {}

# 两次调用返回同一实例
assert MyManager() is MyManager()

# 类本身不被替换：isinstance / issubclass 照常可用
m = MyManager()
assert isinstance(m, MyManager)
```

实现要点（了解即可，不影响使用）：

- `__init__` 被包成幂等：只有首次构造才真正执行，重复调用 `cls()` 不会重置状态。
- 子类不继承进程级身份——装饰基类不会把子类变成同一个共享实例。
- 注册键是模块 + 限定名，两个同名类不会互相覆盖。

## 外部使用：显式注册与解析

框架的进程级容器可通过 `framework_container()` 取到（供诊断与测试隔离）；业务代码也可以建自己的容器：

```python
from zoo_framework.core.container import (
    ScopedContainer,
    Scope,
    ScopeKind,
    ThreadSafety,
)

container = ScopedContainer()

container.register(
    SessionContext,
    scope_kind=ScopeKind.SESSION,
    thread_safety=ThreadSafety.INSTANCE_GUARANTEED,
    on_release=lambda ctx: ctx.close(),   # 作用域释放时触发，每实例一次
)

# 会话级：必须携带会话标识，否则拒绝构造句柄
scope = Scope(ScopeKind.SESSION, session_id="user-42")
ctx = container.resolve(SessionContext, scope)
```

要点：

- `resolve` 的作用域句柄为**必填**，不设"不传即进程级"的默认值——默认值会让会话隔离静默失守。
- `register` 接受 `factory`（自定义构造）与 `instance`（预构造实例，仅进程级）。
- `on_release` 钩子在作用域释放时触发；容器不做引用计数，释放的匹配对象是作用域归属。

## 生命周期管理

| 操作 | 方法 | 行为 |
|---|---|---|
| 释放作用域 | `container.release(scope)` | 释放该作用域内全部实例并触发 `on_release` |
| 替换实现 | `container.replace(...)` | 按注册项替换工厂或实例（测试注桩常用） |
| 整体重置 | `container.reset()` | 清空所有注册与实例，返回被清理的标识 |

`release` 返回被释放实例的标识列表；`reset` 用于测试隔离（`tests/conftest.py` 的 isolation fixture 即以它复位框架容器）。

## 与旧 `@cage` 的差异小结

| 维度 | `@cage`（已删除） | `@process_scoped` / `ScopedContainer` |
|---|---|---|
| 类本身 | 被替换为工厂函数 | 保持真类 |
| 注册键 | 裸类名 | 模块 + 限定名 |
| `isinstance`/`issubclass` | 失效 | 照常可用 |
| 作用域 | 隐式全局 | 显式声明（process / session / prototype） |
| 线程安全 | 隐式假设 | 注册时必填声明 |
| 诊断与重置 | 不可见 | 可 `registered()` / `reset()` / `replace()` |
