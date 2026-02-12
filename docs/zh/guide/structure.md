# 项目结构

Zoo Framework 项目的标准目录结构。

## 标准结构

```
my_project/
├── config.json              # 主配置文件
├── src/                     # 源代码目录
│   ├── main.py             # 应用入口
│   ├── workers/            # Worker 目录
│   │   ├── __init__.py
│   │   └── *.py
│   ├── events/             # 事件定义目录
│   │   ├── __init__.py
│   │   └── *.py
│   ├── conf/               # 配置类目录
│   │   ├── __init__.py
│   │   └── *.py
│   └── params/             # 参数类目录
│       ├── __init__.py
│       └── *.py
└── logs/                   # 日志目录
```

## 目录说明

### config.json

主配置文件，包含日志、Worker 等配置。

### src/main.py

应用入口文件，创建 Master 实例并运行。

### src/workers/

存放所有 Worker 类。

### src/events/

存放事件定义和处理类。

### src/conf/

存放配置类。

### src/params/

存放参数类。
