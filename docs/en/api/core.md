# 🔧 Core API

## Master

```python
from zoo_framework.core import Master

master = Master(loop_interval=1)
master.run()
```

## BaseWorker

```python
from zoo_framework.workers import BaseWorker

class MyWorker(BaseWorker):
    def __init__(self):
        super().__init__(props)
    
    def _execute(self):
        pass
    
    def _destroy(self, result):
        pass
```

## EventNode

```python
from zoo_framework.fifo.node import EventNode

node = EventNode(
    topic="event.name",
    content=data,
    priority=10
)
```

## EventFIFO

```python
from zoo_framework.fifo import EventFIFO

fifo = EventFIFO()
fifo.push(node)
node = fifo.pop()
```

## StateMachineManager

```python
from zoo_framework.statemachine import StateMachineManager

sm = StateMachineManager()
sm.create_state_machine("name")
sm.add_state("name", "state")
sm.transfer("name", "from", "to")
```

---

*For detailed Chinese documentation, see [核心 API](/api/core.html)*
