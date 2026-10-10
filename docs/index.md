---
layout: home

hero:
  name: "Zoo Framework"
  text: "进程内任务编排框架"
  tagline: 在你自己的进程里跑长期存活的后台任务——调度、可观测、有状态，不需要 broker，不需要 cron 守护进程
  # hero 的图位应当放**图形**，不能放已含字标的锁定图——
  # 否则 H1 的 name 文字与图上的 "zoo framework" 会在同一屏出现两次。
  # 这里用小尺寸变体：实底方块 + 三条，是唯一在深浅两种主题下都保持对比度的版本
  # （环版 mark.svg 是深靛蓝，在深色主题下几乎不可见）。
  image:
    src: /hero.svg
    alt: Zoo Framework
    width: 280
    height: 280
  actions:
    - theme: brand
      text: 快速开始
      link: /start/
    - theme: alt
      text: 核心概念
      link: /core/worker

features:
  - title: Worker — 任务执行单元
    details: 循环执行、单次执行、事件驱动或状态机驱动，各按各的节拍；在飞的任务不会被并发派发两次
  - title: ScopedContainer — 作用域容器
    details: 进程 / 会话 / 原型三级作用域持有共享实例，声明式、可重置、可替换，且不再替换类本身
  - title: Master — 生命周期管理
    details: 读取配置、注册 Worker、驱动调度主循环，并在 Ctrl-C 时按序优雅停机；停机时会触发最后一次状态落盘
  - title: Event — 事件管道
    details: 通道隔离、优先级排序、重试策略与死信记录；重试耗尽的事件不会被静默丢弃
  - title: StateMachine — 状态持久化
    details: 按「作用域 + 键路径」读写，支持变更观察者；周期落盘、原子替换、保留最近 5 份备份
  - title: 明确不做什么
    details: 跨机器 → Celery；多进程未实现；cron 表达式不支持；健康监控指标链路尚未接通
---
