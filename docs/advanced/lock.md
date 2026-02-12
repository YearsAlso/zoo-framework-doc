# Lock 锁机制

Zoo Framework 提供了多种线程锁实现。

## CountLock 计数锁

基于计数的锁。

```python
from zoo_framework.lock import CountLock

lock = CountLock(max_count=5)

with lock:
    # 最多 5 个线程同时执行
    pass
```

## TimeLock 时间锁

带超时的锁。

```python
from zoo_framework.lock import TimeLock

lock = TimeLock(timeout=10)

if lock.acquire():
    try:
        pass
    finally:
        lock.release()
```

## BaseLock

基础锁接口。

```python
from zoo_framework.lock import BaseLock

class MyLock(BaseLock):
    def acquire(self):
        pass
    
    def release(self):
        pass
```
