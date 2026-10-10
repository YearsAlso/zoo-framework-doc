# Waiter 调度器

Waiter 是 Zoo Framework 的核心调度组件，负责管理和执行 Worker。

## 概念

Waiter 是调度组件：按配置决定**执行模型**与**背压策略**，并把 Worker 派发出去。

> **三个 Waiter 子类 `SimpleWaiter` / `StableWaiter` / `SafeWaiter` 已被删除。**
> 它们此前的唯一差异是"池尺寸不足时怎么办"，现已由 `worker:runPolicy` 参数承载
> ——**不要再 `from zoo_framework.core.waiter import SimpleWaiter`**，那个导入会失败。
> 迁移方式：删除该导入，改为在 `config.json` 里设置 `worker:runPolicy`。

## 配置

```json
{
  "worker": {
    "mode": "thread_pool",
    "runPolicy": "stable",
    "pool": { "size": 16, "enable": true }
  }
}
```

### `worker:mode` —— 执行模型

`thread`（每次派发一个线程）或 `thread_pool`（有界线程池）。

### `worker:runPolicy` —— 背压策略

**只影响 `thread_pool` 模式下池已满时的行为**：

| 值 | 池满时 | 适合 |
|---|---|---|
| `"simple"` | 扩容 | 突发流量、任务短 |
| `"stable"` | 排队 | 想限制并发但不丢任务 |
| `"safe"` | 拒绝 | 宁可跳过也不要积压 |

无法识别的取值会抛 `ValueError`（不静默降级）。

## 继承 `BaseWaiter`

`BaseWaiter` 的公开方法是：`add_worker` / `call_workers` / `execute_service` /
`get_worker_mode` / `register_handler` / `shutdown` / `validate_worker_mode`，
外加 `workers` 与 `worker_props` 两个属性。

**本页不给出完整的自定义 Waiter 示例**：调度器的内部结构不是稳定的公开契约，
写一份"看起来能跑"的示例会与上面三个子类一样很快失真。
需要定制调度时，请提 issue 说明场景。

