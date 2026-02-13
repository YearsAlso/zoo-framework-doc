---
layout: home

hero:
  name: "🦁 Zoo Framework"
  text: "动物园多线程框架"
  tagline: 🎪 把复杂的线程管理变成有趣的动物园！每个 Worker 都是一只动物，Cage（笼子）是它们的家
  image:
    src: https://mxstorage.oss-cn-beijing.aliyuncs.com/oss-accesslog/zf-main-logo.png
    alt: Zoo Framework
  actions:
    - theme: brand
      text: 🎫 入园指南
      link: /start/
    - theme: alt
      text: 🗺️ 动物园地图
      link: /core/worker

features:
  - icon: 🦁
    title: Worker 动物们
    details: 每只 Worker 都是动物园里独特的动物，有狮子般凶猛的高优先级任务，也有树懒般悠闲的定时任务
  - icon: 🏠
    title: Cage 笼子
    details: Cage（笼子）是 Worker 的家，统一管理动物们的作息、安全和互相通信，让它们和谐共处
  - icon: 🎪
    title: Master 园长
    details: Master 是动物园园长，负责调度所有动物的工作，确保动物园有序运转
  - icon: 🍖
    title: Event 食物
    details: Event（事件）是动物们的食物，通过 FIFO（饲养员队列）按优先级分发，高优先级的动物先吃
  - icon: 🗺️
    title: State 状态图
    details: 动物们有自己的心情状态图，从饥饿到饱食、从休息到工作，状态机记录它们的生命旅程
  - icon: 🔌
    title: Plugin 新物种
    details: 支持引入新物种（插件），让动物园不断丰富，企鹅、长颈鹿...想养什么就养什么
---

<style>
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
  .left-sidebar, .right-sidebar {
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
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
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
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
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
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  border-top: 4px solid;
}

.animal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.animal-card.lion { border-top-color: #e74c3c; }
.animal-card.monkey { border-top-color: #f39c12; }
.animal-card.sloth { border-top-color: #27ae60; }
.animal-card.eagle { border-top-color: #3498db; }
.animal-card.elephant { border-top-color: #9b59b6; }

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
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
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
  background: rgba(0,0,0,0.3);
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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
        <li>
          <span class="concept-icon">🦁</span>
          <div class="concept-text">
            <strong>Worker</strong>
            <small>动物工作器</small>
          </div>
        </li>
        <li>
          <span class="concept-icon">🏠</span>
          <div class="concept-text">
            <strong>Cage</strong>
            <small>笼子管理</small>
          </div>
        </li>
        <li>
          <span class="concept-icon">👨‍💼</span>
          <div class="concept-text">
            <strong>Master</strong>
            <small>园长大人</small>
          </div>
        </li>
        <li>
          <span class="concept-icon">🍖</span>
          <div class="concept-text">
            <strong>Event</strong>
            <small>食物事件</small>
          </div>
        </li>
        <li>
          <span class="concept-icon">📊</span>
          <div class="concept-text">
            <strong>FIFO</strong>
            <small>饲养员队列</small>
          </div>
        </li>
        <li>
          <span class="concept-icon">🗺️</span>
          <div class="concept-text">
            <strong>State</strong>
            <small>状态图</small>
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
    
    subgraph 🏠 Cage Area
        C1[🦁 狮子笼]
        C2[🐒 猴子笼]
        C3[🦥 树懒笼]
    end
    
    subgraph 🍖 Food Center
        F[📊 FIFO 队列]
    end
    
    subgraph 🗺️ State Center
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
      <div class="workflow-step">
        <span class="step-num">1</span>
        <div class="step-content">
          <strong>🌅 晨检</strong>
          <small>Master 检查所有 Worker 状态</small>
        </div>
      </div>
      <div class="workflow-step">
        <span class="step-num">2</span>
        <div class="step-content">
          <strong>🍖 喂食</strong>
          <small>FIFO 按优先级分发 Event</small>
        </div>
      </div>
      <div class="workflow-step">
        <span class="step-num">3</span>
        <div class="step-content">
          <strong>🔄 工作</strong>
          <small>Worker 在 Cage 中执行任务</small>
        </div>
      </div>
      <div class="workflow-step">
        <span class="step-num">4</span>
        <div class="step-content">
          <strong>📊 记录</strong>
          <small>StateMachine 更新状态</small>
        </div>
      </div>
      <div class="workflow-step">
        <span class="step-num">5</span>
        <div class="step-content">
          <strong>🌙 休息</strong>
          <small>保存数据，等待下一轮</small>
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
    <div class="animal-card lion">
      <div class="animal-emoji">🦁</div>
      <h4>狮子</h4>
      <p>高优先级 Worker<br>凶猛、抢占资源</p>
    </div>
    <div class="animal-card monkey">
      <div class="animal-emoji">🐒</div>
      <h4>猴子</h4>
      <p>普通 Worker<br>灵活、循环执行</p>
    </div>
    <div class="animal-card sloth">
      <div class="animal-emoji">🦥</div>
      <h4>树懒</h4>
      <p>延迟 Worker<br>慢吞吞、定时任务</p>
    </div>
    <div class="animal-card eagle">
      <div class="animal-emoji">🦅</div>
      <h4>老鹰</h4>
      <p>事件 Worker<br>敏锐、响应迅速</p>
    </div>
    <div class="animal-card elephant">
      <div class="animal-emoji">🐘</div>
      <h4>大象</h4>
      <p>状态机 Worker<br>稳重、管理状态</p>
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
    <div class="quick-step">
      <div class="quick-step-header">
        <span class="step-icon">🎫</span>
        <strong>买票安装</strong>
      </div>
      <pre><code>pip install zoo-framework</code></pre>
    </div>
    <div class="quick-step">
      <div class="quick-step-header">
        <span class="step-icon">🏗️</span>
        <strong>搭建动物园</strong>
      </div>
      <pre><code>zfc --create my_zoo
cd my_zoo</code></pre>
    </div>
    <div class="quick-step">
      <div class="quick-step-header">
        <span class="step-icon">🦁</span>
        <strong>养一只狮子</strong>
      </div>
      <pre><code>class LionWorker(BaseWorker):
    def _execute(self):
        print("吼！")</code></pre>
    </div>
    <div class="quick-step">
      <div class="quick-step-header">
        <span class="step-icon">🎪</span>
        <strong>开园！</strong>
      </div>
      <pre><code>master = Master()
master.run()</code></pre>
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
      <pre><code>import threading
t = threading.Thread(target=func)
t.start()
t.join()</code></pre>
      <p>枯燥的 Thread 管理 😴</p>
    </div>
    <div class="comparison-box new">
      <h4>✅ Zoo Framework</h4>
      <pre><code>class LionWorker(BaseWorker):
    def _execute(self):
        print("🦁 吼！")</code></pre>
      <p>有趣的动物园管理 🦁🎪</p>
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
      <tr>
        <td><span class="zoo-concept-cell">🦁 动物</span></td>
        <td>Worker 工作器</td>
      </tr>
      <tr>
        <td><span class="zoo-concept-cell">🏠 笼子</span></td>
        <td>Cage 线程管理</td>
      </tr>
      <tr>
        <td><span class="zoo-concept-cell">👨‍💼 园长</span></td>
        <td>Master 调度器</td>
      </tr>
      <tr>
        <td><span class="zoo-concept-cell">🍖 食物</span></td>
        <td>Event 事件</td>
      </tr>
      <tr>
        <td><span class="zoo-concept-cell">📊 饲养员</span></td>
        <td>FIFO 队列</td>
      </tr>
      <tr>
        <td><span class="zoo-concept-cell">🗺️ 状态图</span></td>
        <td>StateMachine</td>
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
    <div class="guide-box">
      <h4>🔰 新手入园</h4>
      <ul>
        <li><a href="/start/">🎫 入园指南</a> - 5分钟上手</li>
        <li><a href="/start/new.html">🏗️ 搭建动物园</a> - 创建项目</li>
        <li><a href="/guide/structure.html">🗺️ 动物园布局</a> - 了解结构</li>
      </ul>
    </div>
    <div class="guide-box">
      <h4>🦁 认识动物</h4>
      <ul>
        <li><a href="/core/worker.html">🦁 Worker 动物</a> - 动物特点</li>
        <li><a href="/core/cage.html">🏠 Cage 笼子</a> - 动物的家</li>
        <li><a href="/core/event.html">🍖 Event 食物</a> - 喂养系统</li>
        <li><a href="/core/statemachine.html">🗺️ 状态图</a> - 心情变化</li>
        <li><a href="/core/fifo.html">📊 FIFO 饲养员</a> - 分发机制</li>
      </ul>
    </div>
    <div class="guide-box">
      <h4>🎪 高级驯兽</h4>
      <ul>
        <li><a href="/advanced/aop.html">✂️ AOP 驯兽</a></li>
        <li><a href="/advanced/reactor.html">⚡ Reactor 训练</a></li>
        <li><a href="/advanced/lock.html">🔒 Cage 安全</a></li>
        <li><a href="/advanced/plugin.html">🔌 引入新物种</a></li>
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
