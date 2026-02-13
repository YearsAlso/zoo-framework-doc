# 多 Worker 协作示例

该示例展示多 Worker 之间协作处理任务的常见模式。

## 思路

- 一个 Master/调度器初始化多个 Worker
- 通过事件/队列进行解耦通信
- 共享状态使用线程安全数据结构或显式锁
# 性能优化（Best Practices）

本章节收集 Zoo Framework 的性能优化建议。

## 常见建议

- 减少不必要的跨线程消息：批量发送事件、合并小事件。
- 避免在 Worker 的 `_execute` 中做长时间阻塞 IO；把 IO 拆到专门的 Worker 或使用异步方案。
- 对高频事件使用轻量 payload（避免大对象拷贝）。

## 进一步阅读

- 相关组件：`FIFO`、`Worker`、`Waiter`

