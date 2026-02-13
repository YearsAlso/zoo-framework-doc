<template>
  <div class="holy-grail-container">
    <!-- 动物园理念 - 圣杯布局 -->
    <div class="zoo-concept-section">
      <div class="zoo-concept-header">
        <h2>🎪 动物园理念</h2>
        <p>Zoo Framework 的设计理念来自真实的动物园管理系统</p>
      </div>

      <div class="holy-grail-body">
        <!-- 左侧：核心概念 -->
        <div class="left-sidebar">
          <h3>🎯 核心概念</h3>
          <ul class="concept-list">
            <li v-for="item in concepts" :key="item.key">
              <span class="concept-icon">{{ item.icon }}</span>
              <div class="concept-text">
                <strong>{{ item.title }}</strong>
                <small>{{ item.desc }}</small>
              </div>
            </li>
          </ul>
        </div>

        <!-- 中间：架构图 -->
        <div class="main-content">
          <h3>🏛️ 动物园架构</h3>
          <pre class="mermaid">
graph TB
    M[👨‍💼 Master 园长]

    subgraph "🏠 Cage Area"
        C1[🦁 狮子笼]
        C2[🐒 猴子笼]
        C3[🦥 树懒笼]
    end

    subgraph "🍖 Food Center"
        F[📊 FIFO 队列]
    end

    subgraph "🗺️ State Center"
        S[🔄 状态机]
    end

    M --> C1
    M --> C2
    M --> C3
    F --> C1
    F --> C2
    F --> C3
    C1 --> S
    C2 --> S
    C3 --> S
          </pre>
        </div>

        <!-- 右侧：工作流程 -->
        <div class="right-sidebar">
          <h3>📋 工作流程</h3>
          <div v-for="step in workflow" :key="step.num" class="workflow-step">
            <span class="step-num">{{ step.num }}</span>
            <div class="step-content">
              <strong>{{ step.title }}</strong>
              <small>{{ step.desc }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 动物类型 -->
    <div class="animal-types-section">
      <div class="animal-types-header">
        <h2>🦁 Worker 动物类型</h2>
      </div>
      <div class="animal-cards">
        <div v-for="animal in animals" :key="animal.key" class="animal-card" :class="animal.key">
          <div class="animal-emoji">{{ animal.emoji }}</div>
          <h4>{{ animal.name }}</h4>
          <p v-html="animal.desc"></p>
        </div>
      </div>
    </div>

    <!-- 快速开始 -->
    <div class="quick-start-section">
      <div class="quick-start-header">
        <h2>🚀 快速入园</h2>
        <p>只需 4 步，搭建属于你的动物园</p>
      </div>
      <div class="quick-steps">
        <div v-for="step in quickSteps" :key="step.key" class="quick-step">
          <div class="quick-step-header">
            <span class="step-icon">{{ step.icon }}</span>
            <strong>{{ step.title }}</strong>
          </div>
          <pre><code>{{ step.code }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 为什么选择 -->
    <div class="why-section">
      <div class="why-header">
        <h2>🌟 为什么选择 Zoo Framework？</h2>
      </div>
      <div class="comparison-container">
        <div class="comparison-box old">
          <h4>❌ 传统多线程</h4>
          <pre><code>{{ comparison.old.code }}</code></pre>
          <p>{{ comparison.old.caption }}</p>
        </div>
        <div class="comparison-box new">
          <h4>✅ Zoo Framework</h4>
          <pre><code>{{ comparison.new.code }}</code></pre>
          <p>{{ comparison.new.caption }}</p>
        </div>
      </div>
    </div>

    <!-- 概念映射 -->
    <div class="mapping-section">
      <div class="mapping-header">
        <h3>🧠 易理解的设计映射</h3>
      </div>
      <table class="mapping-table">
        <thead>
          <tr>
            <th>🎪 动物园概念</th>
            <th>💻 编程概念</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in mapping" :key="row.key">
            <td>
              <span class="zoo-concept-cell">{{ row.left }}</span>
            </td>
            <td>{{ row.right }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 游览指南 -->
    <div class="guide-section">
      <div class="guide-header">
        <h2>📚 游览指南</h2>
      </div>
      <div class="guide-grid">
        <div v-for="box in guide" :key="box.key" class="guide-box">
          <h4>{{ box.title }}</h4>
          <ul>
            <li v-for="item in box.items" :key="item.href">
              <a :href="item.href">{{ item.text }}</a> - {{ item.desc }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="footer-section">
      <div class="footer-links">
        <a href="https://github.com/YearsAlso/zoo-framework">GitHub</a> |
        <a href="https://github.com/YearsAlso/zoo-framework/issues">Issues</a> |
        <a href="https://github.com/YearsAlso/zoo-framework-doc">文档仓库</a>
      </div>
      <p>🎪 Made with ❤️ by Zoo Framework Team 🦁</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const concepts = [
  { key: 'worker', icon: '🦁', title: 'Worker', desc: '动物工作器' },
  { key: 'cage', icon: '🏠', title: 'Cage', desc: '笼子管理' },
  { key: 'master', icon: '👨‍💼', title: 'Master', desc: '园长大人' },
  { key: 'event', icon: '🍖', title: 'Event', desc: '食物事件' },
  { key: 'fifo', icon: '📊', title: 'FIFO', desc: '饲养员队列' },
  { key: 'state', icon: '🗺️', title: 'State', desc: '状态图' }
]

const workflow = [
  { num: 1, title: '🌅 晨检', desc: 'Master 检查所有 Worker 状态' },
  { num: 2, title: '🍖 喂食', desc: 'FIFO 按优先级分发 Event' },
  { num: 3, title: '🔄 工作', desc: 'Worker 在 Cage 中执行任务' },
  { num: 4, title: '📊 记录', desc: 'StateMachine 更新状态' },
  { num: 5, title: '🌙 休息', desc: '保存数据，等待下一轮' }
]

const animals = [
  { key: 'lion', emoji: '🦁', name: '狮子', desc: '高优先级 Worker<br>凶猛、抢占资源' },
  { key: 'monkey', emoji: '🐒', name: '猴子', desc: '普通 Worker<br>灵活、循环执行' },
  { key: 'sloth', emoji: '🦥', name: '树懒', desc: '延迟 Worker<br>慢吞吞、定时任务' },
  { key: 'eagle', emoji: '🦅', name: '老鹰', desc: '事件 Worker<br>敏锐、响应迅速' },
  { key: 'elephant', emoji: '🐘', name: '大象', desc: '状态机 Worker<br>稳重、管理状态' }
]

const quickSteps = [
  { key: 'install', icon: '🎫', title: '买票安装', code: 'pip install zoo-framework' },
  { key: 'create', icon: '🏗️', title: '搭建动物园', code: 'zfc --create my_zoo\ncd my_zoo' },
  { key: 'lion', icon: '🦁', title: '养一只狮子', code: 'class LionWorker(BaseWorker):\n    def _execute(self):\n        print("吼！")' },
  { key: 'run', icon: '🎪', title: '开园！', code: 'master = Master()\nmaster.run()' }
]

const comparison = {
  old: {
    code: 'import threading\nt = threading.Thread(target=func)\nt.start()\nt.join()',
    caption: '枯燥的 Thread 管理 😴'
  },
  new: {
    code: 'class LionWorker(BaseWorker):\n    def _execute(self):\n        print("🦁 吼！")',
    caption: '有趣的动物园管理 🦁🎪'
  }
}

const mapping = [
  { key: 'm1', left: '🦁 动物', right: 'Worker 工作器' },
  { key: 'm2', left: '🏠 笼子', right: 'Cage 线程管理' },
  { key: 'm3', left: '👨‍💼 园长', right: 'Master 调度器' },
  { key: 'm4', left: '🍖 食物', right: 'Event 事件' },
  { key: 'm5', left: '📊 饲养员', right: 'FIFO 队列' },
  { key: 'm6', left: '🗺️ 状态图', right: 'StateMachine' }
]

const guide = [
  {
    key: 'g1',
    title: '🔰 新手入园',
    items: [
      { href: '/start/', text: '🎫 入园指南', desc: '5分钟上手' },
      { href: '/start/new.html', text: '🏗️ 搭建动物园', desc: '创建项目' },
      { href: '/guide/structure.html', text: '🗺️ 动物园布局', desc: '了解结构' }
    ]
  },
  {
    key: 'g2',
    title: '🦁 认识动物',
    items: [
      { href: '/core/worker.html', text: '🦁 Worker 动物', desc: '动物特点' },
      { href: '/core/cage.html', text: '🏠 Cage 笼子', desc: '动物的家' },
      { href: '/core/event.html', text: '🍖 Event 食物', desc: '喂养系统' },
      { href: '/core/statemachine.html', text: '🗺️ 状态图', desc: '心情变化' },
      { href: '/core/fifo.html', text: '📊 FIFO 饲养员', desc: '分发机制' }
    ]
  },
  {
    key: 'g3',
    title: '🎪 高级驯兽',
    items: [
      { href: '/advanced/aop.html', text: '✂️ AOP 驯兽', desc: '' },
      { href: '/advanced/reactor.html', text: '⚡ Reactor 训练', desc: '' },
      { href: '/advanced/lock.html', text: '🔒 Cage 安全', desc: '' },
      { href: '/advanced/plugin.html', text: '🔌 引入新物种', desc: '' }
    ]
  }
]
</script>

<style scoped>
/* 圣杯布局容器 */
.holy-grail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 动物园理念区域 - 左侧概念 + 中间架构 + 右侧说明 */
.zoo-concept-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  padding: 3rem 2rem;
  margin: 3rem 0;
}

.zoo-concept-header {
  text-align: center;
  margin-bottom: 2rem;
}

.zoo-concept-header h2 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.zoo-concept-header p {
  color: #6c757d;
  font-size: 1.1rem;
}

/* 圣杯布局主体 */
.holy-grail-body {
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 1200px) {
  .holy-grail-body {
    grid-template-columns: 1fr;
  }
  .left-sidebar,
  .right-sidebar {
    order: 2;
  }
  .main-content {
    order: 1;
  }
}

/* 左侧边栏 - 核心概念 */
.left-sidebar {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #42b883;
}

.left-sidebar h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.concept-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.concept-list li {
  padding: 0.8rem 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.concept-list li:last-child {
  border-bottom: none;
}

.concept-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.concept-text {
  flex: 1;
}

.concept-text strong {
  display: block;
  color: #2c3e50;
  font-size: 0.95rem;
}

.concept-text small {
  color: #6c757d;
  font-size: 0.8rem;
}

/* 中间主要内容 - 架构图 */
.main-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.main-content h3 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

/* 右侧边栏 - 工作流程 */
.right-sidebar {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-right: 4px solid #667eea;
}

.right-sidebar h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.workflow-step {
  display: flex;
  gap: 0.8rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.workflow-step:last-child {
  border-bottom: none;
}

.step-num {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-content strong {
  display: block;
  color: #2c3e50;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.step-content small {
  color: #6c757d;
  font-size: 0.8rem;
}

/* 动物类型卡片 */
.animal-types-section {
  margin: 3rem 0;
}

.animal-types-header {
  text-align: center;
  margin-bottom: 2rem;
}

.animal-types-header h2 {
  color: #2c3e50;
  font-size: 1.8rem;
}

.animal-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.animal-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  border-top: 4px solid;
}

.animal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.animal-card.lion {
  border-top-color: #e74c3c;
}
.animal-card.monkey {
  border-top-color: #f39c12;
}
.animal-card.sloth {
  border-top-color: #27ae60;
}
.animal-card.eagle {
  border-top-color: #3498db;
}
.animal-card.elephant {
  border-top-color: #9b59b6;
}

.animal-emoji {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.animal-card h4 {
  color: #2c3e50;
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.animal-card p {
  color: #6c757d;
  font-size: 0.85rem;
  margin: 0;
}

/* 快速开始区域 */
.quick-start-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 3rem 2rem;
  margin: 3rem 0;
  color: white;
}

.quick-start-header {
  text-align: center;
  margin-bottom: 2rem;
}

.quick-start-header h2 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.quick-start-header p {
  opacity: 0.9;
}

.quick-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.quick-step {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.quick-step-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.step-icon {
  font-size: 1.5rem;
}

.quick-step-header strong {
  color: white;
  font-size: 1rem;
}

.quick-step pre {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 0.8rem;
  margin: 0;
  overflow-x: auto;
}

.quick-step code {
  color: #fff;
  font-size: 0.85rem;
}

/* 为什么选择 */
.why-section {
  margin: 3rem 0;
}

.why-header {
  text-align: center;
  margin-bottom: 2rem;
}

.why-header h2 {
  color: #2c3e50;
  font-size: 1.8rem;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }
}

.comparison-box {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.comparison-box h4 {
  margin-top: 0;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #e9ecef;
  color: #2c3e50;
}

.comparison-box.old h4 {
  border-bottom-color: #e74c3c;
}

.comparison-box.new h4 {
  border-bottom-color: #27ae60;
}

.comparison-box pre {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0;
}

.comparison-box p {
  color: #6c757d;
  margin-top: 1rem;
  text-align: center;
}

/* 概念映射表 */
.mapping-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
}

.mapping-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.mapping-header h3 {
  color: #2c3e50;
}

.mapping-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.mapping-table th {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.mapping-table td {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.mapping-table tr:last-child td {
  border-bottom: none;
}

.mapping-table tr:hover {
  background: #f8f9fa;
}

.zoo-concept-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

/* 导航区域 */
.guide-section {
  margin: 3rem 0;
}

.guide-header {
  text-align: center;
  margin-bottom: 2rem;
}

.guide-header h2 {
  color: #2c3e50;
  font-size: 1.8rem;
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.guide-box {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-top: 4px solid #42b883;
}

.guide-box h4 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.guide-box ul {
  margin: 0;
  padding-left: 1.2rem;
}

.guide-box li {
  margin: 0.6rem 0;
}

.guide-box a {
  color: #42b883;
  text-decoration: none;
}

.guide-box a:hover {
  text-decoration: underline;
}

/* 页脚 */
.footer-section {
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
  border-top: 1px solid #e9ecef;
}

.footer-links {
  margin-bottom: 1rem;
}

.footer-links a {
  color: #42b883;
  text-decoration: none;
  margin: 0 0.5rem;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
