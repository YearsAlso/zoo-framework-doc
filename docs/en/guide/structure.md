# 🗺️ Project Structure

Standard directory structure for Zoo Framework projects.

## Standard Structure

```
my_project/
├── config.json              # Main configuration
├── src/                     # Source code
│   ├── main.py             # Entry point
│   ├── workers/            # Workers
│   ├── events/             # Events
│   ├── conf/               # Config
│   └── params/             # Parameters
└── logs/                   # Logs
```

## Directory Description

### config.json

Main configuration file in project root.

### src/main.py

Application entry point, creates Master instance and runs.

### src/workers/

Directory for all Worker classes.

### src/events/

Directory for event definitions and handlers.

### src/conf/

Directory for configuration classes.

### src/params/

Directory for parameter classes.

---

*For detailed Chinese documentation, see [动物园布局](/guide/structure.html)*
