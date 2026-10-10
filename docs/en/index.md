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
    src: /favicon.svg
    alt: Zoo Framework
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

## Core components

| Component | Role |
|---|---|
| `BaseWorker` | Task execution unit; you implement `_execute()` |
| `Master` | Lifecycle entry point: load config, register Workers, run, shut down |
| `core/waiter/` | The scheduler; `worker:mode` picks the execution model |
| `ScopedContainer` | Scoped container (process / session / prototype) that **never replaces the class** |
| `EventNode` / `EventChannel` | In-process event pipeline |
| `EventFIFO` | One independent queue per channel |
| `StateMachineManager` | Read/write state by scope + key path, with persistence |

> **On naming:** the project name and some legacy identifiers use a zoo metaphor
> (`Worker` / `Master` / `Cage` / `Event`). **The metaphor affects naming only, not semantics** —
> the table above uses functional names.

## Quick start

```bash
pip install zoo-framework
```

```python
from zoo_framework.core import Master
from zoo_framework.workers import BaseWorker

class Inspector(BaseWorker):
    def __init__(self):
        super().__init__({"name": "inspector", "is_loop": True, "delay_time": 2})

    def _execute(self):
        print("patrol")

master = Master()
master.register_worker("Inspector", Inspector)
master.run()
```

`is_loop` is a read-only property backed by `_props` as the single source of truth; `delay_time` is the idle seconds after each run. Registration goes through `Master.register_worker` — the deprecated `@worker` decorator writes a legacy registry that Master never reads.

## Events and reactors

```python
from zoo_framework.core import event

@event("change_test_number")
def on_change_test_number(data):
    print(f"number changed: {data}")
```

`@event(topic, channel="default")` wraps the function into an event reactor bound to the channel at import time. Producers build an `EventNode` and push it through `EventProvider().push(...)`, the `EventWorker` drains all channels.

## Performance baseline

From `bench/` (Rust feasibility PoC plus pure-Python optimization measurements; data and decision rationale in bench/DECISION.md):

- Framework overhead as a share of end-to-end latency drops quickly as the task body grows (cpu-1x 70.8% → cpu-100x 4.3%, Windows measurement).
- Four pure-Python optimization paths measured 12×–800× speedups (dropping gevent from the event pipeline, the `ThreadSafeDict` lock, FIFO→deque, enabling the worker pool by default).
- A Rust scheduler is a no-go: GIL-bound, measured at most 1.67× — far less than the pure-Python items.

![bench report](/bench/report-overview.png)

Full report: [full-page bench screenshot](/bench/report-full.png).

## Links

- [GitHub repository](https://github.com/YearsAlso/zoo-framework)
- [Issues](https://github.com/YearsAlso/zoo-framework/issues)
- [Docs repository](https://github.com/YearsAlso/zoo-framework-doc)
