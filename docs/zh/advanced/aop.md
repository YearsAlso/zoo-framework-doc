# AOP 切面编程

Zoo Framework 支持面向切面编程（AOP），可以在不修改业务代码的情况下添加横切关注点。

## 内置切面

### 1. 日志切面 (Logger)

自动记录方法调用日志。

```python
from zoo_framework.core.aop import logger

@logger.log_execution_time
def my_function():
    pass
```

### 2. 计时切面 (Stopwatch)

计算方法执行时间。

```python
from zoo_framework.core.aop import stopwatch

@stopwatch.measure
def heavy_task():
    pass
```

### 3. 验证切面 (Validation)

参数验证。

```python
from zoo_framework.core.aop import validation

@validation.validate_params
def process(data):
    pass
```

### 4. 异常捕获 (Cage)

自动捕获异常。

```python
from zoo_framework.core.aop import cage

@cage.catch_exceptions
def risky_operation():
    pass
```

## 自定义切面

```python
from zoo_framework.core.aop import BaseAspect

class MyAspect(BaseAspect):
    def before(self, *args, **kwargs):
        print("Before execution")
    
    def after(self, result):
        print("After execution")
    
    def around(self, func, *args, **kwargs):
        self.before(*args, **kwargs)
        result = func(*args, **kwargs)
        self.after(result)
        return result

# 使用
@MyAspect()
def my_function():
    pass
```
