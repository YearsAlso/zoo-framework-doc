---
layout: home

hero:
  name: "Zoo Framework"
  text: "Python multithreading framework"
  tagline: Concurrency primitives organized around a zoo metaphor — Workers are the animals, ScopedContainer is their cage, Master runs the park
  image:
    src: /logo.png
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

## Positioning

Zoo Framework is a Python 3.13+ multithreading framework: you define Worker classes, the framework handles registration, scheduling, parameter resolution, event dispatch and shutdown. The scheduling model (thread pool vs thread-per-task) is a config switch; Worker code does not change.

## Concept mapping

The zoo metaphor is the framework's naming system:

| Zoo | Framework | Role |
|---|---|---|
| Animal | `BaseWorker` | Task execution unit |
| Cage | `ScopedContainer` | Scoped shared instances |
| Zookeeper | `Master` | Lifecycle & scheduling |
| Food | `EventNode` | Inter-worker message |
| Feeder queue | FIFO / EventChannel | Ordered event queue |

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
