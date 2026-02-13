# 配置说明

## config.json

主配置文件，位于项目根目录。

## 配置项

### 日志配置

```json
{
  "log": {
    "path": "./logs",
    "level": "debug"
  }
}
```

- `path` - 日志文件路径
- `level` - 日志级别（debug/info/warning/error）

### Worker 配置

```json
{
  "worker": {
    "runPolicy": "simple",
    "pool": {
      "size": 5,
      "enabled": false
    }
  }
}
```

- `runPolicy` - 运行策略（simple/stable/safe）
- `pool.enabled` - 是否启用线程池
- `pool.size` - 线程池大小

### 完整示例

```json
{
  "_exports": [],
  "log": {
    "path": "./logs",
    "level": "info"
  },
  "worker": {
    "runPolicy": "stable",
    "pool": {
      "size": 10,
      "enabled": true
    }
  }
}
```
