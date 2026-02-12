# ⚙️ Configuration

## config.json

Main configuration file in project root.

## Configuration Options

### Log Configuration

```json
{
  "log": {
    "path": "./logs",
    "level": "debug"
  }
}
```

- `path` - Log file path
- `level` - Log level (debug/info/warning/error)

### Worker Configuration

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

- `runPolicy` - Run policy (simple/stable/safe)
- `pool.enabled` - Enable thread pool
- `pool.size` - Thread pool size

### Complete Example

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

---

*For detailed Chinese documentation, see [配置说明](/guide/configuration.html)*
