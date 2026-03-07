<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">
        <span class="brand-icon">🎯</span>
        <span class="brand-name">OpenClaw 工作台</span>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">🏠 首页</router-link>
        <router-link to="/tasks" class="nav-link">📋 任务</router-link>
        <router-link to="/ranking" class="nav-link">🏆 排名</router-link>
        <router-link to="/code-review" class="nav-link">👀 审核</router-link>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <span>Powered by OpenClaw 🦀 | © 2026</span>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-icon {
  font-size: 24px;
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.nav-link.router-link-exact-active {
  background: #eff6ff;
  color: #3b82f6;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
}

.footer {
  text-align: center;
  padding: 16px;
  color: #9ca3af;
  font-size: 13px;
  border-top: 1px solid #f3f4f6;
}
</style>
