#!/usr/bin/env node
/**
 * 品牌资产守卫。
 *
 * 存在的理由：标识的"条"必须是**横向**的（左端对齐、右端参差，形态近 z）。
 * 这个方向在讨论中定稿过一次，但随后又被写错两次——一次是主仓库的标识方向，
 * 一次是本仓库的 hero.svg（手写时用了竖条）。两次都是"新画一份而没有从已有资产派生"。
 *
 * 因此这里把方向变成机械可判定的：任何品牌 SVG 里作为"条"的 rect，
 * 宽度必须大于高度。这条检查跑在 lint 里，写错方向会直接失败。
 */
import fs from 'node:fs'
import path from 'node:path'

const PUB = path.join(process.cwd(), 'docs', 'public')
// 只检查"标识类"资产；bench 截图等不在此列
const TARGETS = ['favicon.svg', 'hero.svg', 'logo.svg', 'mark.svg']
// 排除外框（方块/圆角方形）：条是细长的，外框接近正方形
const isBar = (w, h) => Math.max(w, h) / Math.min(w, h) >= 1.5

let failed = 0
for (const name of TARGETS) {
  const file = path.join(PUB, name)
  if (!fs.existsSync(file)) { console.log(`  ⚠ 缺失: ${name}`); continue }
  const src = fs.readFileSync(file, 'utf8')
  const rects = [...src.matchAll(/<rect x="([\d.]+)"\s+y="([\d.]+)"\s+width="([\d.]+)"\s+height="([\d.]+)"/g)]
    .map(m => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4] }))
  const bars = rects.filter(r => isBar(r.w, r.h))
  if (bars.length === 0) { console.log(`  ⚠ ${name}: 未找到任何"条"（检查正则是否失效）`); continue }
  const bad = bars.filter(r => r.h > r.w)
  if (bad.length) {
    failed++
    console.error(`  ✗ ${name}: ${bad.length} 条是**竖向**的（w< h）—— 标识的条 MUST 横向`)
    for (const r of bad) console.error(`      rect(w=${r.w}, h=${r.h})`)
  } else {
    console.log(`  ✓ ${name}: ${bars.length} 条，全部横向`)
  }
}
if (failed) {
  console.error('\n品牌资产方向检查未通过。修法：从唯一真源派生，不要手写新几何。')
  process.exit(1)
}
