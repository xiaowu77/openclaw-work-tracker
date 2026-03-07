<template>
  <div class="home">
    <section class="hero">
      <h1>🎯 OpenClaw 工作台</h1>
      <p>实时追踪团队工作状态与任务进度</p>
    </section>

    <section class="stats-grid">
      <div class="stat-card">
        <span class="stat-icon">👥</span>
        <div class="stat-info">
          <span class="stat-value">{{ store.onlineCount }} / {{ store.members.length }}</span>
          <span class="stat-label">在线成员</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon">📋</span>
        <div class="stat-info">
          <span class="stat-value">{{ store.taskStats.total }}</span>
          <span class="stat-label">总任务数</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon">✅</span>
        <div class="stat-info">
          <span class="stat-value">{{ store.taskStats.done }}</span>
          <span class="stat-label">已完成</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon">🔄</span>
        <div class="stat-info">
          <span class="stat-value">{{ store.taskStats.doing }}</span>
          <span class="stat-label">进行中</span>
        </div>
      </div>
    </section>

    <section class="members-section">
      <div class="section-header">
        <h2>👤 团队成员状态</h2>
        <div class="status-info">
          <span class="auto-badge">🔄 自动同步</span>
          <span v-if="store.lastStatusUpdate" class="last-update">
            更新于 {{ store.lastStatusUpdate }}
          </span>
        </div>
      </div>
      <div class="members-grid">
        <MemberCard 
          v-for="member in leaderFirst" 
          :key="member.id" 
          :member="member"
        />
      </div>
    </section>

    <section class="recent-tasks">
      <div class="section-header">
        <h2>📋 最近任务</h2>
        <router-link to="/tasks" class="view-all">查看全部 →</router-link>
      </div>
      <div class="tasks-grid">
        <TaskCard v-for="task in recentTasks" :key="task.id" :task="task" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useWorkStore } from '../stores/work'
import MemberCard from '../components/MemberCard.vue'
import TaskCard from '../components/TaskCard.vue'

const store = useWorkStore()

const leaderFirst = computed(() => {
  return [...store.members].sort((a, b) => {
    if (a.role === 'leader') return -1
    if (b.role === 'leader') return 1
    return b.points - a.points
  })
})

const recentTasks = computed(() => {
  return store.tasks.filter(t => t.status !== 'done').slice(0, 3)
})

// 定时刷新真实状态（每 30 秒）
let refreshTimer = null

onMounted(() => {
  store.fetchRealStatus()
  refreshTimer = setInterval(() => {
    store.fetchRealStatus()
  }, 30000)
})

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})
</script>

<style scoped>
.home {
  padding: 0 0 40px;
}

.hero {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
  margin-bottom: 32px;
}

.hero h1 {
  font-size: 28px;
  margin-bottom: 8px;
}

.hero p {
  opacity: 0.9;
  font-size: 15px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.stat-icon {
  font-size: 32px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  display: block;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
}

.members-section, .recent-tasks {
  margin-bottom: 32px;
}

h2 {
  font-size: 18px;
  color: #1f2937;
  margin: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}

.status-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auto-badge {
  font-size: 11px;
  padding: 3px 10px;
  background: #d1fae5;
  color: #059669;
  border-radius: 10px;
  font-weight: 500;
}

.last-update {
  font-size: 11px;
  color: #9ca3af;
}

.view-all {
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
</style>
