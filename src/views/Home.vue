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
      <h2>👤 团队成员状态</h2>
      <div class="members-grid">
        <div v-for="member in store.members" :key="member.id" class="member-card">
          <div class="member-avatar">{{ member.avatar }}</div>
          <div class="member-info">
            <span class="member-name">{{ member.name }}</span>
            <StatusIndicator :status="member.status" showLabel />
          </div>
          <div class="member-points">🏆 {{ member.points }}分</div>
        </div>
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
import { computed } from 'vue'
import { useWorkStore } from '../stores/work'
import StatusIndicator from '../components/StatusIndicator.vue'
import TaskCard from '../components/TaskCard.vue'

const store = useWorkStore()

const recentTasks = computed(() => {
  return store.tasks.filter(t => t.status !== 'done').slice(0, 3)
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
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.member-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.member-avatar {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 12px;
}

.member-info {
  flex: 1;
}

.member-name {
  display: block;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.member-points {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
</style>
