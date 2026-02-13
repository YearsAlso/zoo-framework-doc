# 错误处理（Best Practices）

本章节介绍在 Zoo Framework 中进行错误处理的建议。

## 建议

- 在 Worker 边界捕获异常并记录上下文（事件名、payload、worker 名称）。
- 对可重试错误做退避重试（指数退避）。
- 对不可恢复错误要快速失败并上报。

## 进一步阅读

- 相关组件：`Event`、`Worker`

