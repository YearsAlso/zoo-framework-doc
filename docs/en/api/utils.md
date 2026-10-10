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
FileUtils.read_text(path)
FileUtils.write_text(path, content)
```

## DateTimeUtils

```python
from zoo_framework.utils import DateTimeUtils

DateTimeUtils.get_format_now()
DateTimeUtils.get_format_datetime(ts)
```

## CmdUtils

```python
from zoo_framework.utils import CmdUtils

CmdUtils.cmd_read(command)
```

---

*For detailed Chinese documentation, see [工具类](/en/api/utils)*
