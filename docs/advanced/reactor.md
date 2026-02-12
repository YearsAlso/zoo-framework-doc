# Reactor 响应器

Reactor 是事件处理的核心组件，负责响应和处理事件。

## EventReactor

基础事件响应器。

```python
from zoo_framework.reactor import EventReactor

class MyReactor(EventReactor):
    def __init__(self):
        super().__init__()
        self.subscribe("user.login", self.on_user_login)
    
    def on_user_login(self, event):
        print(f"User logged in: {event.content}")
```

## EventReactorManager

管理多个 Reactor。

```python
from zoo_framework.reactor import EventReactorManager

manager = EventReactorManager()
manager.register_reactor("email", EmailReactor())
manager.register_reactor("sms", SMSReactor())
```

## 优先级响应

```python
from zoo_framework.reactor import EventPriorities

reactor = EventReactor(priority=EventPriorities.HIGH)
```

## 重试策略

```python
from zoo_framework.reactor import EventRetryStrategy

strategy = EventRetryStrategy(
    max_retries=3,
    retry_delay=1.0
)
```
