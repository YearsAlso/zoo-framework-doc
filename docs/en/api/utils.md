# 🛠️ Utils API

## LogUtils

```python
from zoo_framework.utils import LogUtils

LogUtils.debug(message)
LogUtils.info(message)
LogUtils.warning(message)
LogUtils.error(message)
```

## FileUtils

```python
from zoo_framework.utils import FileUtils

FileUtils.file_exists(path)
FileUtils.read_file(path)
FileUtils.write_file(path, content)
```

## DateTimeUtils

```python
from zoo_framework.utils import DateTimeUtils

DateTimeUtils.now()
DateTimeUtils.format_timestamp(ts)
```

## CmdUtils

```python
from zoo_framework.utils import CmdUtils

CmdUtils.execute(command)
```

---

*For detailed Chinese documentation, see [工具类](/api/utils.html)*
