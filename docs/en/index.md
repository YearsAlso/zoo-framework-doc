---
layout: home

hero:
  name: "Zoo Framework"
  text: "Python multithreading framework"
  tagline: Long-lived background tasks in your own process — scheduled, observable, stateful, with no broker and no cron daemon
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
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: Core Concepts
      link: /en/core/worker

features:
  - title: Worker — task execution unit
    details: Each task is an animal — loop-based, period-based, event-driven or state-machine driven, each on its own beat
  - title: ScopedContainer — scoped instances
    details: Process / session / prototype scopes hold shared instances — declarative, resettable, replaceable, and never replacing the class itself
  - title: Master — lifecycle management
    details: Loads config, registers workers, drives the dispatch loop, and shuts down gracefully and in order on Ctrl-C
  - title: Event — event pipeline
    details: Events flow through channel registration, FIFO queues and reactors, with priorities and response mechanisms to avoid starvation
  - title: StateMachine — state persistence
    details: StateScopes sit on pluggable StateIndexes and are periodically saved to a pickle archive with checksum and rolling backups
  - title: Plugin — plugin system
    details: Plugin ABC with dependency-ordered loading, plus fixed / exponential / adaptive delay strategies
---
