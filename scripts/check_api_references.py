#!/usr/bin/env python3
"""校验文档里提到的 API 是否真实存在。

存在的理由：本仓库的 API 页是**手写**的（VitePress 用不了 mkdocstrings），
手写 + 无校验的结果就是漂移与编造。实测在引入本脚本之前：

  docs/api/core.md  「Master(loop_interval=1)」        → 无此参数
  docs/api/core.md  「sm.create_state_machine(...)」  → 方法不存在
  docs/api/core.md  「fifo.push(node)」               → 应为 push_value
  docs/api/utils.md 「DateTimeUtils.now()」           → 方法不存在
  docs/api/utils.md 「CmdUtils.execute(...)」         → 方法不存在

这些错误在文字上完全看不出来，只能靠"跑一遍"发现。

本脚本检查三类：
  1. ``from zoo_framework.... import A, B`` 里的每个名字都可导入
  2. ``Class.method(...)`` 里的方法在对应类上存在（仅检查本文档中导入过的类）
  3. 形如 ``zoo_framework.x.y`` 的点路径可解析

依赖：CI 中需先 ``pip install zoo-framework``。
"""

from __future__ import annotations

import importlib
import re
import sys
from pathlib import Path

DOCS = Path(__file__).resolve().parents[1] / "docs"

# 只匹配**同一行内**的名字列表；用 [ \t] 而非 \s，否则会跨行吞掉下一条 import
IMPORT_RE = re.compile(
    r"^[ \t]*from[ \t]+(zoo_framework[\w.]*)[ \t]+import[ \t]+([\w][\w, \t]*)", re.MULTILINE
)
# Class.method( —— 只检查已从 zoo_framework 导入过的类名
CALL_RE = re.compile(r"\b([A-Z]\w+)\.(\w+)\s*\(")
DOTTED_RE = re.compile(r"\bzoo_framework\.([\w.]+)")

errors: list[str] = []


def resolve(path: str):
    parts = path.split(".")
    for split in range(len(parts), 0, -1):
        try:
            mod = importlib.import_module(".".join(parts[:split]))
        except Exception:
            continue
        obj = mod
        for attr in parts[split:]:
            if not hasattr(obj, attr):
                raise AttributeError(f"{'.'.join(parts[:split])} 没有属性 {attr!r}")
            obj = getattr(obj, attr)
        return obj
    raise ImportError(f"无法导入 {path!r} 的任何前缀")


def check_file(f: Path) -> None:
    text = f.read_text(encoding="utf-8")
    rel = f.relative_to(DOCS.parent)
    imported: dict[str, type] = {}

    for mod, names in IMPORT_RE.findall(text):
        for raw in names.split(","):
            name = raw.strip()
            if not name or name in {"*"}:
                continue
            try:
                obj = resolve(f"{mod}.{name}")
                if isinstance(obj, type):
                    imported[name] = obj
            except Exception as exc:  # noqa: BLE001
                errors.append(f"{rel}: `from {mod} import {name}` 失败 —— {exc}")

    for cls_name, method in CALL_RE.findall(text):
        cls = imported.get(cls_name)
        if cls is None:
            continue  # 不是从 zoo_framework 导入的类，跳过
        if not hasattr(cls, method):
            real = [m for m in dir(cls) if not m.startswith("_")][:6]
            errors.append(
                f"{rel}: `{cls_name}.{method}()` 不存在"
                f"（{cls_name} 的真实方法例如: {', '.join(real)}）"
            )

    for dotted in DOTTED_RE.findall(text):
        try:
            resolve(f"zoo_framework.{dotted}")
        except Exception as exc:  # noqa: BLE001
            errors.append(f"{rel}: 点路径 `zoo_framework.{dotted}` 无法解析 —— {exc}")


def main() -> int:
    files = sorted(DOCS.rglob("*.md"))
    for f in files:
        check_file(f)
    print(f"检查了 {len(files)} 个 markdown 文件")
    if errors:
        print(f"\n发现 {len(errors)} 处问题：\n")
        for e in errors:
            print(f"  ✗ {e}")
        return 1
    print("所有 API 引用均可解析 ✓")
    return 0


if __name__ == "__main__":
    sys.exit(main())
